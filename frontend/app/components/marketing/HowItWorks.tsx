import { UploadCloud, ArrowRight, Zap, Share2 } from 'lucide-react'

export default function HowItWorks() {
    return (
        <div className="p-4 sm:p-5 md:p-6 bg-white dark:bg-neutral-900 h-full w-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 md:mb-6 text-center">
                From Upload to Insights in 3 Steps
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4">
                {/* Step 1 */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex justify-center items-center size-12 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full shrink-0">
                        <UploadCloud className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                            1. Upload
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400">
                            Your audio or video file.
                        </p>
                    </div>
                </div>

                {/* Arrow - Desktop only */}
                <div className="hidden md:flex justify-center items-center">
                    <ArrowRight className="size-5 text-gray-400 dark:text-neutral-500" />
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex justify-center items-center size-12 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full shrink-0">
                        <Zap className="size-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                            2. Analyze
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400">
                            PodAIr processes the content.
                        </p>
                    </div>
                </div>

                {/* Arrow - Desktop only */}
                <div className="hidden md:flex justify-center items-center">
                    <ArrowRight className="size-5 text-gray-400 dark:text-neutral-500" />
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex justify-center items-center size-12 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-full shrink-0">
                        <Share2 className="size-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                            3. Get Insights
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-400">
                            Access summaries, transcripts & more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
