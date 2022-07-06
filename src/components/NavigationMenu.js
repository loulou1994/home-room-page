import React from 'react'
import styled from 'styled-components'

const NavigationMenu = () => {
  return (
    <NavBar>
        <ul>
            <li><a href="#">home</a></li>
            <li><a href="#">shop</a></li>
            <li><a href="#">about</a></li>
            <li><a href="#">contact</a></li>
        </ul>
    </NavBar>
  )
}

const NavBar = styled.nav`
a {
  font-size: var(--fs-500);
}
`
export default NavigationMenu