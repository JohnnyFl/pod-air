'use client'
import { createClient } from '@/utils/supabase/client'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// import { redirect } from 'next/navigation'

export default function PodcastTable() {
    const [podcasts, setPodcasts] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const supabase = createClient()
                const {
                    data: { session },
                } = await supabase.auth.getSession()
                if (!session) {
                    throw new Error('Not authenticated')
                }
                const data = await fetch('http://localhost:8082/api/podcasts', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session.access_token}`,
                        'Content-Type': 'application/json',
                    },
                })
                const json = await data.json()
                setPodcasts(Array.isArray(json) ? json : [])
            } catch (error) {
                console.error(error)
            }
        }
        fetchPodcasts()
    }, [])
    // let podcasts: any[] = []
    // try {
    //     const supabase = createClient()
    //     const {
    //         data: { session },
    //     } = await supabase.auth.getSession()
    //     if (!session) {
    //         throw new Error('Not authenticated')
    //     }
    //     const data = await fetch('http://localhost:8082/api/podcasts', {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Bearer ${session.access_token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     const json = await data.json()
    //     podcasts = Array.isArray(json) ? json : []

    //     console.log('JOSN', json)
    // } catch (error) {
    //     console.error(error)

    const handlePodcastClick = (podcastId: string) => {
        router.push(`/podcasts/${podcastId}`)
    }

    // const res = await fetch('http://localhost:8080/api/uploads/url', {
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${session.access_token}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         url: url,
    //     }),
    // })
    // if (podcasts.length === 0) {
    //     return <div>No podcasts</div>
    // }
    return (
        <div className="mt-12">
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                        >
                                            Poster
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                        >
                                            Channel
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                        >
                                            Date Added
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {/* {podcasts.length === 0 && <div>No podcasts</div>} */}
                                    {podcasts.length > 0 &&
                                        podcasts.map((podcast, index) => (
                                            <tr
                                                key={podcast.podcast_id}
                                                onClick={() =>
                                                    handlePodcastClick(
                                                        podcast.podcast_id
                                                    )
                                                }
                                                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                    <img
                                                        src={podcast.thumbnail}
                                                        alt="thumbnail"
                                                        className="w-12 h-12 object-cover rounded-2xl"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {podcast.channel_title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {podcast.podcast_title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    <div>
                                                        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
                                                            <svg
                                                                className="shrink-0 size-3"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            >
                                                                <line
                                                                    x1="12"
                                                                    x2="12"
                                                                    y1="2"
                                                                    y2="6"
                                                                ></line>
                                                                <line
                                                                    x1="12"
                                                                    x2="12"
                                                                    y1="18"
                                                                    y2="22"
                                                                ></line>
                                                                <line
                                                                    x1="4.93"
                                                                    x2="7.76"
                                                                    y1="4.93"
                                                                    y2="7.76"
                                                                ></line>
                                                                <line
                                                                    x1="16.24"
                                                                    x2="19.07"
                                                                    y1="16.24"
                                                                    y2="19.07"
                                                                ></line>
                                                                <line
                                                                    x1="2"
                                                                    x2="6"
                                                                    y1="12"
                                                                    y2="12"
                                                                ></line>
                                                                <line
                                                                    x1="18"
                                                                    x2="22"
                                                                    y1="12"
                                                                    y2="12"
                                                                ></line>
                                                                <line
                                                                    x1="4.93"
                                                                    x2="7.76"
                                                                    y1="19.07"
                                                                    y2="16.24"
                                                                ></line>
                                                                <line
                                                                    x1="16.24"
                                                                    x2="19.07"
                                                                    y1="7.76"
                                                                    y2="4.93"
                                                                ></line>
                                                            </svg>
                                                            Processing
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    {new Date(
                                                        podcast.created_at
                                                    ).toDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                    <SquareArrowOutUpRight
                                                        size={16}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
