'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession()
            setIsLoggedIn(!!data.session)
        }

        getSession()
    }, [])
    return isLoggedIn
}
