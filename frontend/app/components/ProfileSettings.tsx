import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfileSettings() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }
    return (
        <div className="p-8 w-full max-w-3xl mx-auto">
            <div className="bg-white shadow-sm rounded-xl dark:bg-neutral-800">
                <div className="p-4 md:p-5">
                    <div className="space-y-6">
                        {/* Email Section */}
                        <div className="border-b border-gray-200 pb-6 dark:border-neutral-700">
                            <div className="flex justify-between items-center gap-5">
                                <div>
                                    <h2 className="text-base font-semibold text-gray-800 dark:text-neutral-200">
                                        Email
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                        {user.email}
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
                                        Free Plan
                                    </p>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                        Limited to 3 podcasts per month
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
                                        $0/mo
                                    </span>
                                    <a
                                        href="/pricing"
                                        className="inline-flex items-center gap-x-2 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:text-blue-400"
                                    >
                                        Upgrade Plan
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
