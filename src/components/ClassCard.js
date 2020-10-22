import React from "react"
import styled from 'styled-components';

const CardContainer = styled.div`
    display:flex;
    width: 20%;
    padding: 10px 5px;
    min-width:400px;
    background-color:#3c3e44;
    border-radius: 0.5rem;
    margin: 0.75rem;
    .flexrow {
        display:flex;
        flex-direction:row;
    }
    .right {
        width:100%;
        color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        padding-left: 10px;
    }
    .topright {
        margin-left:auto;
    }
    p {
        padding-bottom: 5px;
        margin: 0;
    }
    h1 {
        margin: 3px  0px;
        font-size:1.5rem;
    }
    h2 {
        margin: 0;
        font-size:1.2rem;
        color: lightgrey;
        font-weight: 500;
    }
    
    @media (max-width:480px) {
        width: 100%;
        min-width:0;
    }
`
const ClassCard = (props) => {
    const classProp = props.class
    return(
        <CardContainer>
        <div className = 'nohand right'>
            <div className = 'flexrow'>
            <h1 className = 'hand'>{classProp.name} </h1>|<p> {classProp.type}</p>
            <h2 className = 'topright'>{classProp.intensity}</h2>
            </div>
            <h2>When</h2>
            <div className = 'flexrow'>
            <p>{classProp.date} for {classProp.duration} (minutes.)</p>
            </div>
            <h2>Where</h2>
            <div className = 'flexrow'>
            <p>{classProp.location}</p>
            </div>
            </div>
        </CardContainer>
    )
}

export default ClassCard