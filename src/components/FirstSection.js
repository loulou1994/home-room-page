import React from 'react'
import styled from 'styled-components'

import convertPxToREm from '../utils/PxToRem'
import getBreakPoint from '../utils/breakpoints'

import Arrow from "../assets/icon-arrow.svg"

const FirstSection = () => {
  return (
    <Section className='flow landing-section'>
        <h1>
            Discover innovative ways to decorate
        </h1>
        <p>
            We provide unmatched quality, comfort, and style for property owners across the country. 
            Our experts combine form and function in bringing your vision to life. Create a room in your 
            own style with our collection and make your property a reflection of you and what you love.
        </p>
        <a href="#" title='more details'>SHOP NOW <img src={Arrow} alt="go to store" /></a>
    </Section>
  )
}

const Section = styled.section`
padding: ${convertPxToREm(60)} ${convertPxToREm(32)};

h1 {
    font-size: var(--fs-600);
}

a {
    color: hsl(var(--black));
    letter-spacing: 10px;

    img {
        display: inline-block;
        vertical-align: middle;
    }
}

@media (min-width: ${getBreakPoint("medium")}){
    padding-block: 2.5rem;

    h1 {
        width: 19ch;
        font-size: var(--fs-600);
    }

    a {
        display: block;
        text-align: right;
    }
}

@media (min-width: ${getBreakPoint("large")}){
    padding: 0;
    h1 {
        width: 15ch;
        font-size: min(${convertPxToREm(48)}, 3.8vw);
    }

    a  {
        text-align: left;

        :hover {
            color: hsl(var(--dark-gray));
        }
    }
}
`
export default FirstSection