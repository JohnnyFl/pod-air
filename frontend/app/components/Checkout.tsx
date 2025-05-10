'use client'

import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { fetchClientSecret } from '../payment/actions'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

const getFetchClientSecret = async () => {
    const secret = await fetchClientSecret()
    if (!secret) {
        throw new Error('Failed to fetch client secret')
    }
    return secret
}

export default function Checkout() {
    return (
        <div id="checkout" className="mt-12">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret: getFetchClientSecret }}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}
