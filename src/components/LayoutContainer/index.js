import React from 'react'
import { Container, Tab, } from './style'

const Layout = ({children, title}) => {
    return (
        <Container>
            <Tab>{title}</Tab>
            {children}
           
        </Container>
    )
}

export default Layout
