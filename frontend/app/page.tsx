import ClientLogos from './components/ClientLogos'
import Features from '@/app/components/Features'
import BenefitsNew from '@/app/components/Benefits'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import Hero from './components/Hero'

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
