import { createClient } from '@/utils/supabase/server'
import PodcastTable from '../components/features/PodcastTable'
import UploadSection from '../components/features/UploadSection'
import { redirect } from 'next/navigation'

export default async function Podcasts() {
    const supabase = await createClient()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/login?redirect=/podcasts')
    }
    return (
        <section className="max-w-[85rem] mx-auto mt-12">
            <div className="grid grid-cols-1 gap-12">
                <UploadSection />
            </div>
            <div className="mt-12">Uploading section ...</div>
            <PodcastTable />
        </section>
    )
}
