export const metadata = {
  title: 'Hire WithJessi: Simplest ATS for Tech Hiring',
  description: 'Simplest ATS for startups',
}

import Hero from '../components/hero'
import Features from '../components/features'
import FeaturesBlocks from '../components/features-blocks'
import Testimonials from '../components/testimonials'
import Newsletter from '../components/newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </>
  )
}
