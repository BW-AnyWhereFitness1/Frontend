import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NavHeader = styled.header`
    background: white;
    height:10vh;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 3rem;
    .link {
        margin-left:3rem;
        text-decoration:none;
        font-size:2rem;
        color:black;
    }
    h1 {
        color:black;
    }
    .signup-btn {
        padding:1rem 2rem;
        margin-left:5rem;
        background: black;
        color:white; 
        border-radius:1rem;
        font-weight:bold;
    }
    @media (max-width:800px) {
        height:100%;
        flex-direction:column;
        nav {
            margin:3rem 0;
        }
        h1 {
            margin-top: 2rem;
        }
    }
    @media (max-width:450px) {
        height:100%;
        flex-direction:column;
        nav {
            margin:3rem 0;
            display:flex;
            flex-direction:column;
            justify-content:center;
            .link {
                margin:1rem 0;
            }
            .signup-btn {
                margin:1rem 0;
            }
        }
        h1 {
            font-size:3rem;
            margin-top: 2rem;
        }
    }
    @media (max-height:600px) {
        height:100%;
        padding:3rem 2rem;
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
