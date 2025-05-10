import { createClient } from '@/utils/supabase/server'
import Checkout from '../components/Checkout'
import { redirect } from 'next/navigation'

export default async function Page() {
    const supabase = await createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login?redirect=/payment')
    }
    return (
        <div id="checkout">
            <Checkout />
        </div>
    )
}
