import Link from 'next/link' // Import Link for Next.js navigation

export default function HeroCards() {
    // Placeholder data for public podcasts - replace with actual data fetching
    const publicPodcasts = [
        {
            id: '1',
            title: 'Tech Trends Weekly',
            description: 'Discussing the latest in technology...',
            img: 'https://images.unsplash.com/photo-1745690665873-b5239161c17b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: '2',
            title: 'Startup Stories',
            description: 'Interviews with successful founders...',
            img: 'https://plus.unsplash.com/premium_photo-1678495222603-b66f6393c166?q=80&w=3178&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            id: '3',
            title: 'The Daily Commute',
            description: 'News and analysis for your drive...',
            img: 'https://images.unsplash.com/photo-1726137065565-2c088892ee76?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ]

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12">
            {/* ========== HERO SECTION ========== */}

            {/* ========== END HERO SECTION ========== */}

            {/* ========== PUBLIC PODCAST SNIPPETS ========== */}
            <div className="w-full max-w-5xl py-12 md:py-16">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Recent Podcasts
                </h2>
                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicPodcasts.map((podcast) => (
                        // Card
                        <a
                            key={podcast.id}
                            className="flex flex-col bg-white border border-gray-200 shadow-xl rounded-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                            href="#"
                        >
                            <img
                                className="w-full h-auto max-h-56 rounded-t-xl object-cover object-top transition-transform duration-300 ease-in-out transform hover:scale-105"
                                src={podcast.img}
                                alt="Card Image"
                            />
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {podcast.title}
                                </h3>
                                <p className="mt-1 text-gray-500 dark:text-neutral-400">
                                    {podcast.description}
                                </p>
                                <div className="mt-4 inline-block px-3 py-1 text-sm text-green-800 bg-green-100 rounded-lg font-semibold">
                                    💡 Read time <br />{' '}
                                    <span>~ 37 minutes</span>
                                    <span className="line-through">
                                        {' '}
                                        142 minutes
                                    </span>
                                </div>

                                {/* Time comparison block */}
                            </div>
                        </a>

                        // End Card
                    ))}
                </div>
                {/* End Grid */}
                <div className="text-center mt-8">
                    <Link
                        href="/discover"
                        className="inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
                    >
                        See all public podcasts
                        <svg
                            className="flex-shrink-0 size-4"
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
                </div>
            </div>
            {/* ========== END PUBLIC PODCAST SNIPPETS ========== */}

            {/* ========== HOW IT WORKS / FEATURES ========== */}
            <div className="w-full max-w-4xl text-center py-12 md:py-16">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
                    How PodPilot Works
                </h2>
                {/* Placeholder for Features/Steps components */}
                <div className="p-8 bg-gray-100 dark:bg-neutral-800 rounded-lg">
                    <p className="text-gray-600 dark:text-neutral-400">
                        {/* [Placeholder: Add Preline 'Features' or 'Steps' components here to explain the process: Upload -> Transcribe -> Analyze -> Access Insights] */}
                    </p>
                </div>
            </div>
            {/* ========== END HOW IT WORKS / FEATURES ========== */}
        </div>
    )
}
