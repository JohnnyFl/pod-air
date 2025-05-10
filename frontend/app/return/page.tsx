import { redirect } from 'next/navigation'

import { stripe } from '../../lib/stripe'

export default async function Return({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const { status, customer_details } =
        await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items', 'payment_intent'],
        })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="max-w-[500px] text-center mx-auto px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <svg
                            className="w-20 h-20 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <h1 className="mt-6 text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                        Payment successful!
                    </h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Thank you for your subscription! A confirmation email
                        will be sent to {customer_details?.email}.
                    </p>
                </div>
            </div>
        )
    }
}
