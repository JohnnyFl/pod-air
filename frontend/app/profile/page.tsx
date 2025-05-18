import { createClient } from '@/utils/supabase/server'
import ProfileSettings from '../components/auth/ProfileSettings'
import { redirect } from 'next/navigation'
import { Plans, SubscriptionInfo } from '../components/auth/types'

const plans: Plans = {
    Free: {
        price: 0,
        description: 'Free',
    },
    Pro: {
        price: 15,
        description: 'Pro',
    },
}

export default async function Page() {
    const supabase = await createClient()

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }
    if (error) {
        console.log(error)
    }

    let { data: users_subscriptions, error: subError } = (await supabase
        .from('users_subscriptions')
        .select('subscription,uploads_amount, subscription_id')
        .eq('user_id', user.id)
        .single()) as {
        data: SubscriptionInfo | null
        error: any
    }
    if (subError) {
        console.log(error)
    }
    console.log('users_subscriptions', users_subscriptions)

    let plan = plans[users_subscriptions?.subscription || 'Free']

    const { email, id } = user
    const subscriptionId = users_subscriptions?.subscription_id as
        | string
        | undefined

    return (
        <ProfileSettings
            email={email}
            plan={plan}
            userId={id}
            subscriptionId={subscriptionId}
        />
    )
}
