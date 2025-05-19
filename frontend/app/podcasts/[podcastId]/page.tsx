import {
    getPodcast,
    getPodcastHighlights,
    getPodcastSummary,
    getPodcastQuotes,
} from '@/app/api/podcasts'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page({
    params,
}: {
    params: Promise<{ podcastId: string }>
}) {
    const supabase = await createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { podcastId } = await params
    if (!session) {
        redirect(`/login?podcasts/${podcastId}`)
    }

    const podcast = await getPodcast(podcastId)
    const summary: string = await getPodcastSummary(podcastId)
    const highlights: string = await getPodcastHighlights(podcastId)
    const quotes: string = await getPodcastQuotes(podcastId)

    return (
        <div className="max-w-[85rem] mx-auto my-10">
            <ol className="flex items-center whitespace-nowrap mb-4 p-2 border-y border-gray-200 dark:border-neutral-700">
                <li className="inline-flex items-center">
                    <Link
                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                        href="/"
                    >
                        <svg
                            className="shrink-0 me-3 size-4"
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
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Home
                    </Link>
                    <svg
                        className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
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
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </li>
                <li className="inline-flex items-center">
                    <Link
                        className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                        href="/podcasts"
                    >
                        <svg
                            className="shrink-0 me-3 size-4"
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
                            <rect
                                width="7"
                                height="7"
                                x="14"
                                y="3"
                                rx="1"
                            ></rect>
                            <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
                        </svg>
                        My Podcasts
                        <svg
                            className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
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
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </Link>
                </li>
                <li
                    className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
                    aria-current="page"
                >
                    {podcast.title}
                </li>
            </ol>
            <div className="bg-white border h-64 border-gray-200 rounded-xl shadow-2xs sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="shrink-0 h-full relative w-full rounded-t-xl overflow-hidden sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
                    <Image
                        className="w-full h-64 absolute top-0 start-0 object-cover"
                        src={podcast.thumbnail}
                        alt="Card Image"
                    />
                </div>
                <div className="flex flex-wrap">
                    <div className="p-4 flex flex-col h-full sm:p-7">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {podcast.title}
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-neutral-400">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </p>
                        <div className="mt-5 sm:mt-auto">
                            <p className="text-xs text-gray-500 dark:text-neutral-500">
                                {podcast.channel_id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-10">
                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="bg-gray-100 border-b border-gray-200 rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
                        <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                            Featured
                        </p>
                    </div>
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            🎉 Summary
                        </h3>
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                            {summary}
                        </p>
                    </div>
                    <hr className="border-gray-200 dark:border-neutral-200 my-2 w-11/12 mx-auto" />

                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            💬 Transcription
                        </h3>
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                            {podcast.transcription}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="bg-gray-100 border-b border-gray-200 rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
                        <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                            Featured
                        </p>
                    </div>
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            🔥 Highlights
                        </h3>
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                            <div className="space-y-4">
                                {highlights
                                    .split('\n')
                                    .filter((line) => line.trim()) // Remove empty lines
                                    .reduce((acc, line) => {
                                        const timeMatch =
                                            line.match(/\[([\d.-]+)\]/)
                                        if (!timeMatch) return acc

                                        // Check if we already have this timestamp
                                        const existingEntry = acc.find(
                                            (entry) =>
                                                entry.time === timeMatch[0]
                                        )
                                        if (existingEntry) return acc

                                        // Get the text content after the timestamp
                                        const text = line
                                            .replace(/\[[\d.-]+\]\s*>>\s*/, '')
                                            .replace(/\[[\d.-]+\]\s*/, '')
                                            .trim()

                                        if (text) {
                                            acc.push({
                                                time: timeMatch[0],
                                                text,
                                            })
                                        }
                                        return acc
                                    }, [])
                                    .map((entry, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col"
                                        >
                                            <span className="text-sm text-gray-400">
                                                {entry.time}
                                            </span>
                                            <p>{entry.text}</p>
                                        </div>
                                    ))}
                            </div>
                        </p>
                    </div>
                    <hr className="border-gray-200 dark:border-neutral-200 my-2 w-11/12 mx-auto" />

                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            ✨ Quotes
                        </h3>
                        <div className="mt-2 text-gray-500 dark:text-neutral-400 space-y-2">
                            {quotes
                                .split('\n')
                                .map((quote) => {
                                    const cleanQuote = quote.replace(
                                        /\[[\d.-]+\]\s*/,
                                        ''
                                    )
                                    return (
                                        cleanQuote.charAt(0).toUpperCase() +
                                        cleanQuote.slice(1)
                                    )
                                })
                                .map((quote, index) => (
                                    <p key={index}>
                                        <span className="mr-2">✔️</span>
                                        {quote}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
