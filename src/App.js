import React from 'react'
import styled from 'styled-components'

//functions for media query breakpoints & converting px unit
import getBreakPoint from './utils/breakpoints'
import convertPxToRem from './utils/PxToRem'

// App components
import Header from './components/Header'
import FirstSection from './components/FirstSection'
import SecondSection from './components/SecondSection'


const App = () => {
  return (
    <AppContainer>
      <Header/>
      <FirstSection/>
      <SecondSection/>
    </AppContainer>
  )
}

const AppContainer = styled.div`
@media (min-width: ${getBreakPoint("large")}){
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 4rem;

  header {
    height: ${convertPxToRem(500)};
    flex-basis: 55%;
  }
  .landing-section {
    flex-basis: 38%;
  }

  .second-section {
    flex-basis: 100%;
  }
}
`
export default App
