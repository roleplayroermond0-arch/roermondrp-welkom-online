import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import DiscordLoginButton from "@/components/DiscordLoginButton"

interface AppUser {
  id: string
  username: string
  avatar?: string
  created_at: string
}

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  signInWithDiscord: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const mapUser = async (supabaseUser: any): Promise<AppUser> => {
    const username =
      supabaseUser.user_metadata?.custom_claims?.global_name ||
      supabaseUser.user_metadata?.name ||
      supabaseUser.user_metadata?.preferred_username ||
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.user_metadata?.user_name ||
      supabaseUser.email?.split('@')[0] ||
      "Onbekend"

    const appUser: AppUser = {
      id: supabaseUser.id,
      username,
      avatar: supabaseUser.user_metadata?.avatar_url,
      created_at: supabaseUser.created_at,
    }

    // Sync username met Supabase profiel
    await supabase.auth.updateUser({ data: { username } })

    return appUser
  }

  useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        username: session.user.user_metadata?.name || session.user.user_metadata?.full_name || "Onbekend",
        avatar: session.user.user_metadata?.avatar_url,
        created_at: session.user.created_at,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      setUser({
      id: session.user.id,
      username: session.user.user_metadata?.name || session.user.user_metadata?.full_name || "Onbekend",
      avatar: session.user.user_metadata?.avatar_url,
      email: session.user.email || "Geen e-mail beschikbaar",
      created_at: session.user.created_at,
    });

    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);


  const signInWithDiscord = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
      })
      if (error) throw error
    } catch (error: any) {
      toast({
        title: "Inloggen mislukt",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast({ title: "Uitgelogd", description: "Je bent succesvol uitgelogd." })
    } catch (error: any) {
      toast({
        title: "Fout bij uitloggen",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = { user, loading, signInWithDiscord, signOut }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
