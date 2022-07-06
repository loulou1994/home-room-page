import React from 'react'
import styled from 'styled-components'

import furndark from "../assets/image-about-dark.jpg"
import furnlight from "../assets/image-about-light.jpg"

// utils
import convertPxToREm from "../utils/PxToRem"
import getBreakpoint from "../utils/breakpoints"

const SecondSection = () => {
  return (
    <Section className='flow second-section'>
        <img src={furndark} alt="dark furniture" />
        <div className="wrapper">
            <div className='box'>
                <div>
                    <img src={furnlight} alt="light furniture" />
                </div>
                <div className="article-container">
                    <h2>ABOUT OUR FURNITURE</h2>
                    <p>Our multifunctional collection blends design and function to suit your individual taste.
                        Make each room unique, or pick a cohesive theme that best express your interests and what
                        inspires you. Find the furniture pieces you need, from traditional to contemporary styles
                        or anything in between. Product specialists are available to help you create your dream space.
                    </p>
                </div>
            </div>
        </div>
    </Section>
  )
}

const Section = styled.section`
--flow-space: ${convertPxToREm(52)};

.box {
    position: relative;

    > div:first-child {
        position: absolute;
        top: 100%;
        left: 0;
    }
}
.article-container {
    padding: 0 2rem 3.25rem;

    h2 {
        margin-bottom: 1rem;
        font-size: var(--fs-400);
        letter-spacing: ${convertPxToREm(5)};
    }
}

@media (min-width: ${getBreakpoint("medium")}){
    --flow-space: 0;
    /* display: grid;
    grid-template-columns: 1fr 193px 1fr;
    column-gap: 1rem; */
    >img:first-child {
        float: left;
        width: 38%;
    }
    
    .wrapper {
        display: flex;

        > .box {
            margin-left: 1.2rem;
        }

        .box > div:first-child {
            position: static;
            display: flex;
            height: 90%;
            align-items: flex-end;
            float: right;
            shape-outside: inset(calc(100% - 22vw) 0 0);
            margin-left: 0.5rem;
            width: 64%;
            aspect-ratio: 1;            
        }

        .article-container {
            padding: 0;            
        }
    }
}

@media (min-width: ${getBreakpoint("large")}) {
    display: flex;
    align-items: flex-start;

    > img:first-child {
        float: none;
        width: 29%;
    }
    
    .wrapper > .box {
        margin-left: 0;
        display: flex;
        align-items: flex-start;

        > div:first-child {
            order: 2;
            display: block;
            height: auto;
            width: auto;
            margin-left: 0;
            aspect-ratio: auto;
        }

        .article-container {
            /* order: 1; */
            flex-basis: 60.1%;;
            padding: ${convertPxToREm(36)} ${convertPxToREm(42)};
        }
    }

}
`
export default SecondSection