'use client'

import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'

export default function Testimonials() {
    return (
        <div className="my-12">
            <div>
                <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                        Loved by Users
                    </h2>
                    <p className="mt-1 text-gray-600 dark:text-neutral-400">
                        Hear what our users are saying about PodAIr.
                    </p>
                </div>

                {/* Testimonials */}
                {/* Grid */}
                <Marquee
                    pauseOnHover
                    className="max-w-7xl mx-auto relative overflow-hidden before:absolute before:inset-y-0 before:start-0 before:z-10 before:w-20 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:inset-y-0 after:end-0 after:z-10 after:w-20 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent dark:before:from-neutral-900 dark:after:from-neutral-900"

                    // className="max-w-7xl mx-auto relative overflow-hidden before:absolute before:inset-y-0 before:start-0 before:z-1 before:w-20 before:h-full before:bg-linear-to-r before:from-white before:to-transparent after:absolute after:inset-y-0 after:end-0 after:z-1 after:w-20 after:h-full after:bg-linear-to-l after:from-white after:to-transparent dark:before:from-neutral-900 dark:after:from-neutral-900"
                >
                    {/* Testimonials */}
                    <div className="">
                        {/* Grid */}
                        <div className="flex">
                            {/* Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            src="https://images.unsplash.com/photo-1746184070632-0a13afd3e155?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            Sarah Chen
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            "PodAIr's AI-powered summaries and
                                            transcripts save me hours every
                                            week. The search feature helps me
                                            find exactly what I need from past
                                            episodes. It's an absolute
                                            game-changer for podcast listeners!"
                                        </em>
                                    </p>
                                </div>
                            </div>
                            {/* End Card */}

                            {/* Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            src="https://images.unsplash.com/photo-1738928140897-421c3ee2d18e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            Alex Thompson
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            "As a busy professional, PodAIr has
                                            been a game-changer. I can now get
                                            the key insights from hour-long
                                            podcasts in minutes. The AI
                                            summaries are incredibly accurate,
                                            and the search feature helps me find
                                            exactly what I need."
                                        </em>
                                    </p>
                                </div>
                            </div>
                            {/* End Card */}

                            {/* Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            // src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            src="https://images.unsplash.com/photo-1744383886357-5d126e9918f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            Emily Rivera
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            "PodAIr makes it so easy to catch up
                                            on my favorite podcasts. The smart
                                            chapter summaries and instant
                                            transcripts are amazing for staying
                                            informed on the go."
                                        </em>
                                    </p>
                                </div>
                            </div>
                            {/* End Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            src="https://images.unsplash.com/photo-1727835523545-70ee992b5763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            Michael Patel
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            "Since discovering PodAIr, my
                                            podcast listening experience has
                                            been incredible. The AI-powered
                                            transcripts and smart chapter
                                            summaries help me absorb more
                                            content in less time."
                                        </em>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* End Grid */}
                    </div>
                    {/* End Testimonials */}
                </Marquee>
                <Marquee
                    pauseOnHover
                    direction="right"
                    className="max-w-7xl mt-16 mx-auto relative overflow-hidden before:absolute before:inset-y-0 before:start-0 before:z-10 before:w-20 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:inset-y-0 after:end-0 after:z-10 after:w-20 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent dark:before:from-neutral-900 dark:after:from-neutral-900"

                    // className="max-w-7xl mx-auto relative overflow-hidden before:absolute before:inset-y-0 before:start-0 before:z-1 before:w-20 before:h-full before:bg-linear-to-r before:from-white before:to-transparent after:absolute after:inset-y-0 after:end-0 after:z-1 after:w-20 after:h-full after:bg-linear-to-l after:from-white after:to-transparent dark:before:from-neutral-900 dark:after:from-neutral-900"
                >
                    {/* Testimonials */}
                    <div className="">
                        {/* Grid */}
                        <div className="flex">
                            {/* Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            src="https://images.unsplash.com/photo-1728257679663-24eec7b8c203?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            Sam
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            " As a busy professional, PodAIr has
                                            been a game-changer. I can now get
                                            the key insights from hour-long
                                            podcasts in minutes. The AI
                                            summaries are incredibly accurate,
                                            and the search feature helps me find
                                            exactly what I need. It's like
                                            having a smart assistant for podcast
                                            listening! "
                                        </em>
                                    </p>
                                </div>
                            </div>
                            {/* End Card */}

                            {/* Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            src="https://images.unsplash.com/photo-1741335087341-5d7e443c3e11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            Priya Singh
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            "PodAIr's search and summarization
                                            features have transformed how I
                                            learn from podcasts. I can quickly
                                            find and review the most important
                                            parts of any episode."
                                        </em>
                                    </p>
                                </div>
                            </div>
                            {/* End Card */}

                            {/* Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            src="https://images.unsplash.com/photo-1732904467242-d52d6d929aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            David Kim
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            "The AI features in PodAIr are
                                            intuitive and save me so much time.
                                            It's become an essential tool in my
                                            daily routine for both work and
                                            leisure podcasts."
                                        </em>
                                    </p>
                                </div>
                            </div>
                            {/* End Card */}
                            <div className="flex mr-6 flex-col max-w-sm bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
                                <div className="flex-auto p-4 md:p-6">
                                    <div className="flex items-center">
                                        <Image
                                            className="inline-block size-11 rounded-lg"
                                            src="https://images.unsplash.com/photo-1738525052373-9df8344872d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                            alt="Avatar"
                                        />
                                        <h3 className="text-sm ml-4 font-semibold text-gray-800 sm:text-base dark:text-neutral-200">
                                            Jessica Lee
                                        </h3>
                                    </div>

                                    <p className="mt-3 sm:mt-6 text-base text-gray-800 md:text-xl dark:text-white">
                                        <em>
                                            "PodAIr is a must-have for anyone
                                            who loves podcasts but has a busy
                                            schedule. The summaries are spot-on
                                            and the transcripts are super
                                            helpful for reference."
                                        </em>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* End Grid */}
                    </div>
                    {/* End Testimonials */}
                </Marquee>
            </div>
        </div>
    )
}
