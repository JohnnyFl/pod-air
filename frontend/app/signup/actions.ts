'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { error: 'Please enter a valid email address' }
    }

    // Validate password length
    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters long' }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

   

    if (error) {
        return { error: error.message }
    }

    const { error : subErr } = await supabase
    .from('users_subscriptions')
    .insert([
      { user_id: data.user?.id },
    ]).select()
    if (subErr) {
        console.log("subErr", subErr)
        return { error: subErr.message }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
  
  