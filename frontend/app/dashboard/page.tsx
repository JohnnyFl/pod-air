import UppyDashboard from '../components/UppyDashboard/UppyDashaboard'

export default function Dashboard() {
    return (
        <section className="max-w-[85rem] mx-auto mt-12">
            <div className="grid grid-cols-2 gap-12">
                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    <div className="max-w-sm">
                        <label
                            htmlFor="input-label-with-helper-text"
                            className="block text-sm font-medium mb-2 dark:text-white"
                        >
                            YouTube Podcast URL
                        </label>
                        <input
                            type="email"
                            id="input-label-with-helper-text"
                            className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                            placeholder="https://www.youtube.com..."
                            aria-describedby="hs-input-helper-text"
                        />
                        <p
                            className="mt-2 text-sm text-gray-500 dark:text-neutral-500"
                            id="hs-input-helper-text"
                        >
                            Enter a YouTube URL to get more insights.
                        </p>
                    </div>
                </div>
                <UppyDashboard />
            </div>
        </section>
    )
}
