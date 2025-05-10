import { createClient } from '@/utils/supabase/server'
import PodcastTable from '../components/PodcastTable'
import UploadSection from '../components/UploadSection'
import UppyDashboard from '../components/UppyDashboard/UppyDashaboard'
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
                {/* <UppyDashboard /> */}
            </div>
            <div className="mt-12">Uploading section ...</div>
            <PodcastTable />
        </section>
    )
}
