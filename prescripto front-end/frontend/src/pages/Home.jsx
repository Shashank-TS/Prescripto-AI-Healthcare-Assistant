import React from 'react'
import Home_Comp_4 from '../components/Home_Comp_4'
import HeroSection from '../components/Home/HeroSection'
import HowItWorks from '../components/Home/HowItWorks'
import SymptomList from '../components/Home/SymptomList'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <HowItWorks/>
      <SymptomList/>
      <Home_Comp_4/>
    </div>
  )
}

export default Home
