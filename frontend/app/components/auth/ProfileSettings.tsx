'use client'
import { Plans } from './types'
import { useEffect, useState } from 'react'

import { getLemonSqueezyUser } from '@/lib/lemonsqueezy'
import {
    listProducts,
    listSubscriptions,
    cancelSubscription,
} from '@lemonsqueezy/lemonsqueezy.js'
import Link from 'next/link'

type ProfileSettingsProps = {
    email: string | undefined
    plan: Plans['Free'] | Plans['Pro'] | null
    userId: string
    subscriptionId: string | undefined
}
export default function ProfileSettings({
    email,
    plan,
    userId,
    subscriptionId,
}: ProfileSettingsProps) {
    // const [plan, setPlan] = useState<Plans['free'] | Plans['pro'] | null>(null)

    useEffect(() => {
        ;(async () => {
            const test = await getLemonSqueezyUser()
            const products = await listProducts()
            const subs = await listSubscriptions()
            console.log('subs', subs)
            // console.log('test', test)
            console.log('test', products)
        })()
    }, [])

    const onChangeClick = async () => {
        console.log('onChangeClick', subscriptionId)
        try {
            const res = await cancelSubscription(subscriptionId as string)
            console.log('res', res)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div className="p-8 w-full max-w-3xl mx-auto">
            <div className="bg-white shadow-sm rounded-xl dark:bg-neutral-800">
                <div className="p-4 md:p-5">
                    <div className="space-y-6">
                        {/* Email Section */}
                        <div className="border-b border-gray-200 pb-6 dark:border-neutral-700">
                            <div className="flex justify-between items-center gap-5">
                                <div className="w-full">
                                    <h2 className="text-base font-semibold text-gray-800 dark:text-neutral-200">
                                        Email
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400 w-full">
                                        {/* {isLoading ? (
                                            <p
                                                className="h-5 bg-gray-200 rounded-full mt-1 dark:bg-neutral-700"
                                                style={{ width: '40%' }}
                                            ></p>
                                        ) : (
                                            email
                                        )} */}
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Password Section */}
                        {/* <div className="border-b border-gray-200 pb-6 dark:border-neutral-700">
                            <div className="flex justify-between items-center gap-5">
                                <div>
                                    <h2 className="text-base font-semibold text-gray-800 dark:text-neutral-200">
                                        Password
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                        ********
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="hs-collapse-toggle inline-flex items-center gap-x-2 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-400"
                                    id="hs-pro-shapiclps"
                                    aria-expanded="false"
                                    aria-controls="hs-pro-shapiclps-heading"
                                    data-hs-collapse="#hs-pro-shapiclps-heading"
                                >
                                    <span className="hs-collapse-open:hidden cursor-pointer">
                                        Edit
                                    </span>
                                    <span className="hs-collapse-open:block hidden cursor-pointer">
                                        Cancel
                                    </span>
                                </button>
                            </div>

                            <div
                                id="hs-pro-shapiclps-heading"
                                className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                                aria-labelledby="hs-pro-shapiclps"
                            >
                                <div className="mt-4">
                                    <div className="w-full max-w-sm space-y-4">
                                        <input
                                            type="password"
                                            className="py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:focus:ring-neutral-600"
                                            placeholder="Old password"
                                        />
                                        <input
                                            type="password"
                                            className="py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:focus:ring-neutral-600"
                                            placeholder="New password"
                                        />
                                        <input
                                            type="password"
                                            className="py-3 px-4 border block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:focus:ring-neutral-600"
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            className="w-1/2 cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Subscription Section */}
                        <div className=" pb-6">
                            <div className="flex justify-between items-center gap-5">
                                <div>
                                    <h2 className="text-base font-semibold text-gray-800 dark:text-neutral-200">
                                        Current Plan
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                        {/* {users_subscriptions?[0].subscription} */}
                                        {/* {subscription?.subscription} Plan */}
                                        {/* {isLoading ? (
                                            <p
                                                className="h-5 bg-gray-200 rounded-full mt-1 dark:bg-neutral-700"
                                                style={{ width: '40%' }}
                                            ></p>
                                        ) : (
                                            plan?.description
                                        )} */}
                                        {plan?.description}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-lg font-semibold text-gray-900 dark:text-neutral-100 w-full flex justify-end">
                                        {/* {isLoading ? (
                                            <div
                                                className="h-6 bg-gray-200 rounded-full mt-1 dark:bg-neutral-700 w-full"
                                                style={{ width: '40%' }}
                                            ></div>
                                        ) : (
                                            `$${plan?.price}/mo`
                                        )} */}
                                        {`$${plan?.price}/mo`}
                                        {/* ${plan?.price}/mo */}
                                    </span>
                                    {/* <Link
                                        href="/"
                                        className="inline-flex items-center gap-x-2 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-400"
                                    >
                                        Change Plan
                                    </Link> */}
                                    {/* <button
                                        type="button"
                                        className="py-1 ps-4 cursor-pointer hover:underline decoration-2 inline-flex items-center text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                        aria-haspopup="dialog"
                                        aria-expanded="false"
                                        aria-controls="hs-vertically-centered-modal"
                                        data-hs-overlay="#hs-vertically-centered-modal"
                                    >
                                        Change Plan
                                    </button> */}
                                    {/* <button
                                        type="button"
                                        className="py-2 cursor-pointer px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                        data-hs-overlay="#hs-vertically-centered-modal"
                                    >
                                        Close
                                    </button> */}

                                    {plan?.description === 'Free' ? (
                                        <Link
                                            // href="https://pod-air.lemonsqueezy.com/buy/3973a072-8535-4055-ae38-108cc186be00?discount=0"
                                            // href={`https://pod-air.lemonsqueezy.com/buy/3973a072-8535-4055-ae38-108cc186be00`}
                                            href={`https://pod-air.lemonsqueezy.com/checkout/buy/3973a072-8535-4055-ae38-108cc186be00?checkout[custom][user_id]=${userId}`}
                                            prefetch={true}
                                            target="_blank"
                                            className="inline-flex items-center gap-x-2 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-400"
                                        >
                                            Change Plan
                                        </Link>
                                    ) : (
                                        <div>
                                            <button
                                                type="button"
                                                className="py-1 ps-4 cursor-pointer hover:underline decoration-2 inline-flex items-center text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                                aria-haspopup="dialog"
                                                aria-expanded="false"
                                                aria-controls="hs-vertically-centered-modal"
                                                data-hs-overlay="#hs-vertically-centered-modal"
                                            >
                                                Change
                                            </button>
                                            {/* <button className="inline-flex items-center gap-x-2 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-400">
                                                Update
                                            </button>{' '} */}
                                        </div>
                                    )}

                                    {/* <a
                                        href="https://pod-air.lemonsqueezy.com/buy/3973a072-8535-4055-ae38-108cc186be00?embed=1"
                                        className="lemonsqueezy-button py-1 ps-4 cursor-pointer hover:underline decoration-2 inline-flex items-center text-sm font-medium rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                    >
                                        Change Plan
                                    </a>
                                    <script
                                        src="https://assets.lemonsqueezy.com/lemon.js"
                                        defer
                                    ></script> */}

                                    <div
                                        id="hs-vertically-centered-modal"
                                        className="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none"
                                        role="dialog"
                                        tabIndex={-1}
                                        aria-labelledby="hs-vertically-centered-modal-label"
                                    >
                                        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-56px)] flex items-center">
                                            <div className="w-full flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                                <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
                                                    <h3
                                                        id="hs-vertically-centered-modal-label"
                                                        className="font-bold text-gray-800 dark:text-white"
                                                    >
                                                        Change Plan
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        className="size-8 cursor-pointer inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                                        aria-label="Close"
                                                        data-hs-overlay="#hs-vertically-centered-modal"
                                                    >
                                                        <span className="sr-only">
                                                            Close
                                                        </span>
                                                        <svg
                                                            className="shrink-0 size-4"
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
                                                            <path d="M18 6 6 18"></path>
                                                            <path d="m6 6 12 12"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="p-4 overflow-y-auto">
                                                    <p className="text-gray-800 dark:text-neutral-400">
                                                        Do you want to change
                                                        your plan to{' '}
                                                        <span className="font-semibold">
                                                            {plan?.description ===
                                                            'Free'
                                                                ? 'Pro'
                                                                : 'Free'}
                                                        </span>
                                                        ?
                                                    </p>
                                                </div>
                                                <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-neutral-700">
                                                    <button
                                                        type="button"
                                                        area-label="Close"
                                                        className="py-2 cursor-pointer px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                        data-hs-overlay="#hs-vertically-centered-modal"
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={onChangeClick}
                                                        className="py-2 cursor-pointer px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
