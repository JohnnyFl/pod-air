'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export default function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const supabase = createClient()

    useEffect(() => {
        // Check current session
        const getSession = async () => {
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession()

                if (error) throw error
                setIsLoggedIn(!!session)
                setUser(session?.user ?? null)
            } catch (error) {
                console.error('Session check error:', error)
                setIsLoggedIn(false)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        // Subscribe to auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session)
            setUser(session?.user ?? null)
            setIsLoading(false)
        })

        getSession()

        // Cleanup subscription
        return () => {
            subscription.unsubscribe()
        }
    })

    return { isLoggedIn, isLoading, user }
}
