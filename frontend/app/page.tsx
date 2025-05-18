import ClientLogos from './components/marketing/ClientLogos'
import Features from '@/app/components/marketing/Features'
import BenefitsNew from '@/app/components/marketing/Benefits'
import CTA from './components/marketing/CTA'
import Footer from './components/core/Footer'
import Testimonials from './components/marketing/Testimonials'
import Hero from './components/features/Hero'

export default function Home() {
    return (
        <div>
            <main className="mt-6">
                <Hero />
                <ClientLogos />
                <Features />
                <BenefitsNew />
                <CTA />
                <Testimonials />
            </main>
            <Footer />
        </div>
    )
}
