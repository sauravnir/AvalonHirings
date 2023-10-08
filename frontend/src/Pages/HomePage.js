// rfce
import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from './Hero'
import Footer from '../Components/Footer'
import About from './About'
import Contact from './Contact'
import HeadinInfo from '../Components/HeadinInfo'
import AboutImg1 from '../images/AboutImg1.jpg'
const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <HeadinInfo bgcolor="bg-sky-900" tcolor="text-white" headingText="Who we are" bodyPara="Your trusted partner for reliable home maid services. Simplifying your life, one clean home at a time."/>
        <About />
        <HeadinInfo headingText="Contact us" bodyPara="Need assistance or have any questions? Our dedicated team is here to help! Reach out to us via our contact page, and we'll get back to you promptly. Your satisfaction is our priority."/>
        <Contact />
        <Footer />
    </div>
  )
}

export default HomePage
