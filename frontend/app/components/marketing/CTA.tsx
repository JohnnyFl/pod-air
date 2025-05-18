import Link from 'next/link'

export default function CTA() {
    return (
        <div className="bg-gradient-to-br from-blue-600 to-violet-600">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="max-w-xl mx-auto text-center">
                    <div className="mb-5">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                            Ready to Unlock Your Podcast's Potential?
                        </h2>
                    </div>

                    <p className="mt-1 text-lg text-gray-300">
                        Stop searching, start finding. Get accurate transcripts,
                        AI summaries, and key highlights effortlessly.
                    </p>

                    <div className="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center">
                        <Link
                            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                            href="/signup"
                        >
                            Sign Up Now - It's Free
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
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Link>
                        <Link
                            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-transparent text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10"
                            href="/podcasts"
                        >
                            Upload Your First Podcast
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
