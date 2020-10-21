import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NavHeader = styled.header`
    background: #f4f6ff;
    height:10vh;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 3rem;
    .link {
        margin-left:3rem;
        text-decoration:none;
        font-size:2rem;
        color:#07031a;
    }
    h1 {
        color:#07031a;
    }
    .signup-btn {
        padding:1rem 2rem;
        margin-left:5rem;
        background: #07031a;
        color:#f4f6ff; 
        border-radius:1rem;
    }
`

export default function Navbar() {
    return (
        <NavHeader>
              <Link to='/' style={{ textDecoration: 'none' }}>
              <h1 className="company-name">Anywhere Fitness</h1>
              </Link>
              <nav>
                <Link to='/' className='link'> Home </Link>
                <Link to='/login' className='link'> Login </Link>
                <Link to='/signup' className='link signup-btn'> Sign up </Link>
              </nav>
              
        </NavHeader>
    )
}
