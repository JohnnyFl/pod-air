'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const redirectTo = (formData.get('redirect') as string) || '/'

    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    
    const { error } = await supabase.auth.signInWithPassword(data)
    
    if (error) {
        redirect('/error')
    }

    // Increase the delay slightly to ensure auth state is properly updated
    // await new Promise(resolve => setTimeout(resolve, 1000))
    
    revalidatePath('/', 'layout')
    redirect(redirectTo)
}
