import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CheckoutHeader from '../components/payment/CheckoutHeader'
import CheckoutContent from '../components/payment/CheckoutContent'

export default async function Page() {
    const supabase = await createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login?redirect=/payment')
    }
    return (
        <div className="max-w-[50rem] border rounded-md shadow-sm mx-auto mt-10">
            <CheckoutHeader />
            <hr className="border-gray-200 dark:border-white" />
            <CheckoutContent />
        </div>
    )
}
