'use client'
import { supabase } from '@/lib/supabaseClient'
import { createClient } from '@/utils/supabase/client'
import { Upload } from 'lucide-react'
import { useState } from 'react'

export default function UploadSection() {
    const [url, setUrl] = useState<string>('')

    const handleUpload = async () => {
        try {
            const supabase = createClient()
            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (!session) {
                throw new Error('Not authenticated')
            }

            const res = await fetch('http://localhost:8080/api/uploads/url', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                }),
            })

            if (!res.ok) {
                throw new Error('Failed to create upload URL')
            }
            const test = await res.json()
            console.log(test)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex gap-4 items-center bg-white border border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
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
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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
            <div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="py-2 cursor-pointer px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                    <Upload size={16} /> Upload
                </button>
            </div>
        </div>
    )
}
