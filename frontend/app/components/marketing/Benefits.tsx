'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react' // Corrected import
import HowItWorks from '../marketing/HowItWorks'

const benefitsData = [
    {
        id: 0,
        title: 'How PodAIr Works: Simple Steps',
        description:
            'See how easily you can turn lengthy podcasts into actionable insights. Just upload, let our AI analyze, and access your summaries, transcripts, and highlights.',
        visualType: 'flow', // Keep the flow visual for the 'How it Works'
        overlayColor: 'after:from-blue-600',
    },
    {
        id: 1,
        title: 'Save Time & Boost Productivity',
        description:
            'Stop spending hours listening. Get key takeaways in minutes with AI summaries and highlights. Focus on what matters most.',
        // image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder relevant image
        image: 'https://images.unsplash.com/photo-1713947505684-25b9bf8d544f?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder path - Replace with actual screenshot
        // TODO: Replace placeholder above with an actual screenshot of the AI Summary feature UI
        visualType: 'image',
        overlayColor: 'after:from-purple-600',
    },
    {
        id: 2,
        title: 'Unlock Deeper Insights',
        description:
            'Go beyond surface-level listening. Accurate transcripts and powerful search help you find specific information and uncover hidden gems within podcast content.',
        // image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder relevant image
        image: 'https://plus.unsplash.com/premium_photo-1683133315137-cc03b57dc387?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder path - Replace with actual screenshot
        // TODO: Replace placeholder above with an actual screenshot of the Search/Transcription interface
        visualType: 'image',
        overlayColor: 'after:from-orange-600',
    },
]

export default function BenefitsNew() {
    const [activeBenefit, setActiveBenefit] = useState(0)
    const currentBenefit = benefitsData[activeBenefit]

    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* Section Title */}
            <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                    Unlock the Power of Your Podcasts
                </h2>
                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                    PodAIr transforms how you interact with audio and video
                    content.
                </p>
            </div>
            {/* End Section Title */}

            <div className="flex flex-col md:flex-row justify-center gap-6">
                {/* Visual Pane */}
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[505px]">
                    <AnimatePresence mode="wait">
                        {currentBenefit.visualType === 'image' ? (
                            <motion.img
                                key={activeBenefit} // Key change triggers animation
                                src={currentBenefit.image}
                                alt={currentBenefit.title}
                                className="absolute inset-0 size-full object-cover rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        ) : (
                            <motion.div
                                key={activeBenefit} // Key change triggers animation
                                className="absolute inset-0 size-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <HowItWorks />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Overlay for Image type only */}
                    {currentBenefit.visualType === 'image' && (
                        <motion.div
                            key={`${activeBenefit}-overlay`} // Ensure overlay animates with image
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute bottom-0 inset-x-0 after:absolute after:inset-0 after:size-full after:z-1 after:rounded-xl after:bg-gradient-to-t ${currentBenefit.overlayColor} after:to-transparent`}
                        >
                            <div className="p-4 md:p-6 relative z-10 flex flex-col justify-end gap-3 min-h-[150px]">
                                <blockquote className="text-lg md:text-xl text-white font-medium">
                                    {currentBenefit.description}
                                </blockquote>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Accordion Pane */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                    {benefitsData.map((benefit, index) => (
                        <div
                            key={benefit.id}
                            className={`hs-accordion ${activeBenefit === index ? 'active' : ''} bg-white border -mt-px first:rounded-t-xl last:rounded-b-xl dark:bg-neutral-800 dark:border-neutral-700`}
                            id={`hs-benefit-heading-${benefit.id}`}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveBenefit(index)}
                                className={`hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400 ${activeBenefit === index ? 'text-blue-600 dark:text-blue-500' : ''}`}
                                aria-controls={`hs-benefit-collapse-${benefit.id}`}
                            >
                                {benefit.title}
                                <svg
                                    className={`hs-accordion-active:hidden ${activeBenefit === index ? 'hidden' : 'block'} size-4`}
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
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                                <svg
                                    className={`hs-accordion-active:block ${activeBenefit === index ? 'block' : 'hidden'} size-4`}
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
                                    <path d="M5 12h14" />
                                </svg>
                            </button>
                            <AnimatePresence mode="wait">
                                {activeBenefit === index && (
                                    <motion.div
                                        key={`accordion-content-${benefit.id}`}
                                        id={`hs-benefit-collapse-${benefit.id}`}
                                        className="hs-accordion-content w-full overflow-hidden block"
                                        aria-labelledby={`hs-benefit-heading-${benefit.id}`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="pb-4 px-5">
                                            <p className="text-gray-800 dark:text-neutral-200">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
