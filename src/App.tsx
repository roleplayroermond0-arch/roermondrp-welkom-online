import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthCallback from "@/pages/AuthCallback";
import Complaints from "./pages/Complaints";
import Rules from "./components/Rules";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import BackgroundVideo from "@/components/BackgroundVideo";


const queryClient = new QueryClient();

function Page() {
  const [todos, setTodos] = useState([])

  
useEffect(() => {
  function getTodos() {
    supabase.from('todos').select()
      .then(({ data: todos }) => {
        if (todos.length > 1) {
          setTodos(todos)
        }
      })
  }

  getTodos()
}, [])


  return (
    <div>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </div>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BackgroundVideo />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
