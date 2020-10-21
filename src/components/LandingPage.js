import React from 'react'
import styled from 'styled-components'

const BodyContainer = styled.div`
    height:90vh;
    display:flex;
    .text-containter {
        width:40%;
        background:black;
        color:white;
        div {
            height:100%;
            display:flex;
            padding:0 6rem;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            h1 {
                font-size: 7rem;
                margin-bottom:5%;
            }
        }
    }
    .img-container {
        background-image: url('https://images.pexels.com/photos/116077/pexels-photo-116077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
        background-size:cover;
        width:60%;
    }
`

export default function LandingPage() {
    return (
        <BodyContainer>
            <div className="text-containter">
                <div>
                <h1>The world is your gym.</h1>
                <p>"Success usually comes to those who are too busy to be looking for it."</p>
                </div>
            </div>
            <div className="img-container">
                hi
            </div>
        </BodyContainer>
    )
}
