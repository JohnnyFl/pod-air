import {
    CloudUpload,
    Captions,
    BrainCircuit,
    Highlighter,
    MessageSquareQuote,
    Search,
    Compass,
} from 'lucide-react'

export default function Features() {
    return (
        <div
            id="core-features"
            className="max-w-[85rem] scroll-smooth px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-10"
        >
            {/* Section Title */}
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                    Core Features
                </h2>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                    Everything you need to analyze and understand your podcasts.
                </p>
            </div>
            {/* End Section Title */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-start gap-12">
                {/* Icon Block 1 */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-16 bg-gray-50 border border-gray-200 rounded-xl mx-auto dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                        <CloudUpload className="shrink-0 size-8 text-blue-600 dark:text-blue-500" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Easy Upload
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Quickly upload audio or video files in various
                            formats.
                        </p>
                    </div>
                </div>
                {/* End Icon Block 1 */}

                {/* Icon Block 2 */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-16 bg-gray-50 border border-gray-200 rounded-xl mx-auto dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                        <Captions className="shrink-0 size-8 text-purple-600 dark:text-purple-500" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Accurate Transcription
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Get precise, speaker-labeled transcripts.
                        </p>
                    </div>
                </div>
                {/* End Icon Block 2 */}

                {/* Icon Block 3 */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-16 bg-gray-50 border border-gray-200 rounded-xl mx-auto dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                        <BrainCircuit className="shrink-0 size-8 text-teal-600 dark:text-teal-500" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            AI Summaries
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Instantly grasp key points with concise summaries.
                        </p>
                    </div>
                </div>
                {/* End Icon Block 3 */}

                {/* Icon Block 4 */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-16 bg-gray-50 border border-gray-200 rounded-xl mx-auto dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                        <Highlighter className="shrink-0 size-8 text-orange-600 dark:text-orange-500" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Highlight Extraction
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Automatically identify important segments.
                        </p>
                    </div>
                </div>
                {/* End Icon Block 4 */}

                {/* Icon Block 5 */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-16 bg-gray-50 border border-gray-200 rounded-xl mx-auto dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                        <MessageSquareQuote className="shrink-0 size-8 text-red-600 dark:text-red-500" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Quote Extraction
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Pull out impactful quotes for sharing or citation.
                        </p>
                    </div>
                </div>
                {/* End Icon Block 5 */}

                {/* Icon Block 6 */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-16 bg-gray-50 border border-gray-200 rounded-xl mx-auto dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                        <Search className="shrink-0 size-8 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Powerful Search
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Find topics or keywords across all content.
                        </p>
                    </div>
                </div>
                {/* End Icon Block 6 */}

                {/* Icon Block 7 */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-16 bg-gray-50 border border-gray-200 rounded-xl mx-auto dark:bg-neutral-800 dark:border-neutral-700 mb-4">
                        <Compass className="shrink-0 size-8 text-lime-600 dark:text-lime-500" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Content Discovery
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Uncover related themes and insights.
                        </p>
                    </div>
                </div>
                {/* End Icon Block 7 */}
            </div>
        </div>
    )
}
