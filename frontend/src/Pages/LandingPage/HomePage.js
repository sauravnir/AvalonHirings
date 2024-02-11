// rfce
import React from 'react'
import Navbar from '../../Components/LandingPage/Navbar'
import Hero from './Hero'
import Footer from '../../Components/LandingPage/Footer'
import About from './About'
import Contact from './Contact'
import Reviews from './Reviews'

import HeadinInfo from '../../Components/LandingPage/HeadinInfo'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div class='pl-20 pr-20 bg-slate-50'>
        {/* <Navbar /> */}
        <Hero />
        <HeadinInfo bgcolor="bg-sky-900" tcolor="text-white" headingText="Who we are" 
        bodyPara="Your trusted partner for reliable home maid services. Simplifying your life, one clean home at a time."/>
        <About />
        <HeadinInfo headingText="Contact us" 
        bodyPara="Need assistance or have any questions? Our dedicated team is here to help! Reach out to us via our contact page, and we'll get back to you promptly. Your satisfaction is our priority."/>
        <Contact />
        {/* <HeadinInfo headingText="Reviews and Ratings" 
        bodyPara="Look , what our clients say about us!"/> */}
        {/* <Reviews /> */}
        <Footer />
    </div>

    </div>
    
    // <h1>Test</h1>
  )
}

export default HomePage
