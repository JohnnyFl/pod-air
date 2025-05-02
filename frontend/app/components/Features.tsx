import {
    CloudUpload,
    Captions,
    BrainCircuit,
    Highlighter,
    MessageSquareQuote,
    Search,
    Compass,
} from 'lucide-react'

// export default function Features() {
//     return (
//         <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
//                 {/* Icon Block */}
//                 <div>
//                     <CloudUpload className="shrink-0 size-9 text-gray-800 dark:text-white" />
//                     <div className="bg-linear-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
//                         <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600"></div>
//                     </div>
//                     <div className="mt-5">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                             Uploading
//                         </h3>
//                         <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                             Easily upload your podcast files for processing.
//                         </p>
//                     </div>
//                 </div>
//                 {/* End Icon Block */}
//
//                 {/* Icon Block */}
//                 <div>
//                     <Captions className="shrink-0 size-9 text-gray-800 dark:text-white" />
//                     <div className="bg-linear-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
//                         <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600"></div>
//                     </div>
//                     <div className="mt-5">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                             Transcription
//                         </h3>
//                         <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                             Get accurate transcriptions of your podcast
//                             episodes.
//                         </p>
//                     </div>
//                 </div>
//                 {/* End Icon Block */}
//
//                 {/* Icon Block */}
//                 <div>
//                     <BrainCircuit className="shrink-0 size-9 text-gray-800 dark:text-white" />
//                     <div className="bg-linear-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
//                         <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600"></div>
//                     </div>
//                     <div className="mt-5">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                             AI Summaries
//                         </h3>
//                         <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                             Generate concise summaries of your podcast content
//                             using AI.
//                         </p>
//                     </div>
//                 </div>
//                 {/* End Icon Block */}
//
//                 {/* Icon Block */}
//                 <div>
//                     <Highlighter className="shrink-0 size-9 text-gray-800 dark:text-white" />
//                     <div className="bg-linear-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
//                         <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600"></div>
//                     </div>
//                     <div className="mt-5">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                             Highlight Extraction
//                         </h3>
//                         <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                             Extract key highlights from your podcasts.
//                         </p>
//                     </div>
//                 </div>
//                 {/* End Icon Block */}
//
//                 {/* Icon Block */}
//                 <div className="grid grid-cols-3 col-span-4 gap-12 justify-self-center">
//                     <div>
//                         <MessageSquareQuote className="shrink-0 size-9 text-gray-800 dark:text-white" />
//                         <div className="bg-linear-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
//                             <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600"></div>
//                         </div>
//                         <div className="mt-5">
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                                 Quote Extraction
//                             </h3>
//                             <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                                 Extract key quotes from your podcasts.
//                             </p>
//                         </div>
//                     </div>
//                     <div>
//                         <Search className="shrink-0 size-9 text-gray-800 dark:text-white" />
//                         <div className="bg-linear-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
//                             <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600"></div>
//                         </div>
//                         <div className="mt-5">
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                                 Search
//                             </h3>
//                             <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                                 Easily search content within your podcasts.
//                             </p>
//                         </div>
//                     </div>
//                     <div>
//                         <Compass className="shrink-0 size-9 text-gray-800 dark:text-white" />
//                         <div className="bg-linear-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
//                             <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600"></div>
//                         </div>
//                         <div className="mt-5">
//                             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                                 Discovery
//                             </h3>
//                             <p className="mt-1 text-gray-600 dark:text-neutral-400">
//                                 Discover new content within your podcasts.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default function Features() {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
                {/* Icon Block */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                        <CloudUpload className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Uploading
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Easily upload your podcast files for processing.
                        </p>
                    </div>
                </div>
                {/* End Icon Block */}

                {/* Icon Block */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                        <Captions className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Transcription
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Get accurate transcriptions of your podcast
                            episodes.
                        </p>
                    </div>
                </div>
                {/* End Icon Block */}

                {/* Icon Block */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                        <BrainCircuit className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            AI Summaries
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Generate concise summaries of your podcast content
                            using AI.
                        </p>
                    </div>
                </div>
                {/* End Icon Block */}

                {/* Icon Block */}
                <div className="text-center">
                    <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                        <Highlighter className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Highlight Extraction
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            Extract key highlights from your podcasts.
                        </p>
                    </div>
                </div>
                {/* End Icon Block */}

                {/* Icon Block */}
                <div className="grid grid-cols-3 col-span-4 justify-self-center gap-12">
                    <div className="text-center max-w-2xs">
                        <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                            <MessageSquareQuote className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Quote Extraction
                            </h3>
                            <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                Extract key quotes from your podcasts.
                            </p>
                        </div>
                    </div>
                    {/* End Icon Block */}

                    {/* Icon Block */}
                    <div className="text-center max-w-2xs">
                        <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                            <Search className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Search
                            </h3>
                            <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                Easily search content within your podcasts.
                            </p>
                        </div>
                    </div>
                    {/* End Icon Block */}

                    {/* Icon Block */}
                    <div className="text-center max-w-2xs">
                        <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
                            <Compass className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Discovery
                            </h3>
                            <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                Discover new content within your podcasts.
                            </p>
                        </div>
                    </div>
                </div>
                {/* End Icon Block */}
            </div>
        </div>
    )
}
