import React, {useRef, useState} from 'react'
import styled from 'styled-components'

// import all header's different device layout bg svgs at once
import importAll from 'import-all.macro'

// utility of functions
import convertPxToREm from "../utils/PxToRem"
import getBreakpoint from "../utils/breakpoints"

// assets used in the header section
import hamburgerIcon from "../assets/icon-hamburger.svg"
import closeIcon from "../assets/icon-close.svg"
import logo from "../assets/logo.svg"
import prevArrow from "../assets/icon-angle-left.svg"
import nextArrow from "../assets/icon-angle-right.svg"

// reusable components
import NavigationMenu from './NavigationMenu'

const HeaderComp = () => {
    const [slides, setSlides] = useState([])
    const [toggleHamburger, setToggleHamburger] = useState({
        isMobile: false,
        toggleNav: false
    })
    const [currentSlide, setCurrentSlide] = useState(0)
    const hamburgerEl = useRef(null)

    const updateIsMobile = (e) => {
        if(!e){
            return window.innerWidth < 1024 ? true : false
        }
        e.matches ? setToggleHamburger(prevState => ({...prevState, isMobile: false})) 
        :
        setToggleHamburger(prevState => ({...prevState, isMobile: true}))
    }

    const updateToggleNav = (e) => {
        hamburgerEl.current.ariaExpanded = e.currentTarget === hamburgerEl.current ? "true" : "false"
        setToggleHamburger(prevState => ({...prevState, toggleNav: !prevState.toggleNav}))
    }

    const nextSlide = () => {
        setCurrentSlide(prevState => {
            let nextIndex = prevState + 1
            nextIndex = nextIndex > (slides.length / 2) - 1 ? 0 : nextIndex
            return nextIndex
        })
    }

    const prevSlide = () => {
        setCurrentSlide(prevState => {
            let prevIndex = prevState - 1
            prevIndex = prevIndex < 0 ? (slides.length / 2) - 1 : prevIndex
            return prevIndex
        })
    }
    React.useEffect(() => {
        setToggleHamburger(prevState => ({...prevState, isMobile: updateIsMobile()}))

        importAll("../assets/Gallery/*.jpg")
            .then(all => {
                setSlides(() => {
                    let slides = []
                    for(const img in all){
                        slides.push(all[img].default)
                    }
                    return slides
                })
        })
    }, [])

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 64em)")
        mediaQuery.addEventListener("change", updateIsMobile)

        const intervalKey = setInterval(() => {
            nextSlide()
        }, 3000)

        return () => {
            mediaQuery.removeEventListener("change", updateIsMobile)
            clearInterval(intervalKey)
        }
        
    }, [currentSlide])

    return (
        <Header slides={slides}>
        <div className="slide-container">
            {
                slides.slice(3).map((slide, index, slides) => {
                    let position = "nextSlide"
                    if(index === currentSlide){
                        position = "active"
                    }

                    if(index === slides.length - 1 && currentSlide === 0 || currentSlide - 1 === index){
                        position = "lastSlide"
                    }

                    return <div className={`slide slide${index + 1} ${position}`} key={index + 1}></div>
                })
            }
        </div>
        <div className="header-hamburger-logo">
            {toggleHamburger.isMobile && <section className='mobile-navigation'>
                <button aria-controls='primary-navigation' ref={hamburgerEl} aria-expanded="false" onClick={updateToggleNav}>
                    <img src={hamburgerIcon} alt="room-logo"/>
                </button>
            { toggleHamburger.toggleNav && 
                <div id="primary-navigation" className="overlay">
                    <div className="nav-container">
                        <button onClick={updateToggleNav}>
                            <img src={closeIcon} alt="close-btn" />
                        </button>
                        <NavigationMenu/>
                    </div>
                </div> }
            </section>}
            <div className="logo-navigation">
                <h1>
                    <img src={logo} alt="logo" />
                </h1>
                { !toggleHamburger.isMobile && <NavigationMenu/>}
            </div>
        </div>
        <div className="sliding-controls">
            <button className='prev' onClick={prevSlide}>
                <img src={prevArrow} alt="slide-previous" />
            </button>
            <button className='next'onClick={nextSlide}>
                <img src={nextArrow} alt="slide-next" />
            </button>
        </div>     
        </Header>
  )
}

// Sylying headrComp component using styled-component library
const Header = styled.header`
position: relative;
height: ${convertPxToREm(360)};

.slide-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -1;

    & .slide {
        position: absolute;
        inset: 0;
        background: no-repeat center/cover;
        opacity: 0;
        transition: all 250ms linear;
    }

    & .slide1 {
        background-image: url(${(props) => props.slides[3]});
    }

    & .slide2 {
        background-image: url(${(props) => props.slides[4]});
    }

    & .slide3 {
        background-image: url(${(props) => props.slides[5]});
    }

    .active {
        transform: translate(0);
        opacity: 1;
    }

    .nextSlide {
        transform: translate(100%);
    }

    .lastSlide {
        transform: translate(-100%);
    }
}

.header-hamburger-logo {
    display: flex;
    align-items: center;
    padding-top: ${convertPxToREm(48)};
    padding-left: ${convertPxToREm(24)};

    .overlay {
        position: fixed;
        inset: 0;
        background: hsl(var(--black), .6);
        z-index: 1;
    }

    .mobile-navigation{
        flex-basis: 15%;

        > button {
            width: 100%;
            padding: ${convertPxToREm(8)} ${convertPxToREm(12)};

            img {
                width: max(${convertPxToREm(23)}, 100%);
                max-width: ${convertPxToREm(37)};
            }
        }
    }

    .logo-navigation {
        flex-basis: 83%;
        text-align: center;

        img {
            margin: auto;
        }
    }
}

.nav-container {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    inset: 0 0 auto;
    padding: ${convertPxToREm(40)} ${convertPxToREm(24)};
    background-color: hsl(var(--white));

    button {
        flex-basis: 10%;

        img {
            width: clamp(20px, 1vw + 17px, 25px);
        }
    }
    ul {
        display: flex;
        align-items: center;
        gap: ${convertPxToREm(18)};
        font-weight: 600;
        color: hsl(var(--black));

        li {
            cursor: pointer;
        }
    }
}

.sliding-controls {
    position: absolute;
    background-color: hsl(var(--black));
    display: flex;
    inset: auto 0 0 auto;

    button {
        padding: ${convertPxToREm(16)};
    }
}

@media (min-width: ${getBreakpoint("medium")}) {
height: ${convertPxToREm(450)};

.slide-container {
    .slide1 {
        background-image: url(${(props) => props.slides[0]})            
    }

    .slide2 {
        background-image: url(${(props) => props.slides[1]})
    }

    .slide3 {
        background-image: url(${(props) => props.slides[2]})
    }
}
}

@media (min-width: ${getBreakpoint("large")}){
    .header-hamburger-logo{
        padding-left: ${convertPxToREm(40)};
    }

    .sliding-controls {
        inset: auto ${convertPxToREm(-92)} 0 auto;

        > button:hover {
            background-color: hsl(var(--darker-gray));
        }
    }

    .logo-navigation {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 6.5rem;

        ul {
            display: flex;
            gap: ${convertPxToREm(24)};
            color: hsl(var(--white));

            a:hover {
                text-decoration: underline;
            }
        }
    }
}
`
export default HeaderComp