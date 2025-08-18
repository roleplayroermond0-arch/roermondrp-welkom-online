import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { supabase, type User } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  verifyOtp: (email: string, otp: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string, accessToken?: string) => Promise<void>
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        email_confirmed_at: session.user.email_confirmed_at,
        created_at: session.user.created_at
      } : null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        email_confirmed_at: session.user.email_confirmed_at,
        created_at: session.user.created_at
      } : null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      })
      
      if (error) throw error
      
      toast({
        title: "Verificatie e-mail verzonden",
        description: "Controleer je e-mail en klik op de verificatie link",
      })
    } catch (error: any) {
      toast({
        title: "Registratie mislukt",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      toast({
        title: "Succesvol ingelogd",
        description: `Welkom terug, ${email}!`,
      })
    } catch (error: any) {
      toast({
        title: "Inloggen mislukt",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast({
        title: "Uitgelogd",
        description: "Je bent succesvol uitgelogd.",
      })
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

  const verifyOtp = async (email: string, otp: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
      })
      
      if (error) throw error
      
      toast({
        title: "Account geverifieerd",
        description: "Je account is succesvol geverifieerd!",
      })
    } catch (error: any) {
      toast({
        title: "Verificatie mislukt",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: "http://localhost:8080/reset-password",
      });
      
      if (error) throw error; 
      
      toast({
        title: "Reset link verzonden",
        description: "Controleer je e-mail voor de reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Reset mislukt",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword: string, accessToken?: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser(
        { password: newPassword },
      
      );
      if (error) throw error;

      toast({
        title: "Wachtwoord aangepast",
        description: "Je wachtwoord is succesvol gewijzigd.",
      });
    } catch (error: any) {
      toast({
        title: "Reset mislukt",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const value = {
  user,
  loading,
  signUp,
  signIn,
  signOut,
  verifyOtp,
  resetPassword,
  updatePassword
}


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}