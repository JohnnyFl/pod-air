import { UploadCloud, ArrowRight, Zap, Share2 } from 'lucide-react'

export default function HowItWorks() {
    return (
        <div className="p-6 md:p-8 bg-white dark:bg-neutral-900 rounded-xl h-full flex flex-col justify-center items-center text-center border border-gray-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                From Upload to Insights in 3 Steps
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 w-full">
                {/* Step 1 */}
                <div className="flex flex-col items-center flex-1">
                    <div className="flex justify-center items-center size-16 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full mb-2">
                        <UploadCloud className="shrink-0 size-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                        1. Upload
                    </p>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 px-2">
                        Your audio or video file.
                    </p>
                </div>
                <ArrowRight className="hidden md:block size-6 text-gray-400 dark:text-neutral-500 mx-2" />
                {/* Step 2 */}
                <div className="flex flex-col items-center flex-1">
                    <div className="flex justify-center items-center size-16 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full mb-2">
                        <Zap className="shrink-0 size-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                        2. Analyze
                    </p>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 px-2">
                        PodAIr processes the content.
                    </p>
                </div>
                <ArrowRight className="hidden md:block size-6 text-gray-400 dark:text-neutral-500 mx-2" />
                {/* Step 3 */}
                <div className="flex flex-col items-center flex-1">
                    <div className="flex justify-center items-center size-16 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-full mb-2">
                        <Share2 className="shrink-0 size-8 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                        3. Get Insights
                    </p>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 px-2">
                        Access summaries, transcripts & more.
                    </p>
                </div>
            </div>
        </div>
    )
}
