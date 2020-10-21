import React from "react"
import styled from 'styled-components';

const CardContainer = styled.div`

    display:flex;
    width: 20%;
    min-width:400px;
    background-color:#3c3e44;
    border-radius: 0.5rem;
    margin: 0.75rem;
    .right {
        width:100%;
        color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        padding-left: 10px;
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
        <CardContainer className = 'shadow-4'>
            <div className = 'nohand right'>
            <h1 className = 'hand'>{classProp.name}</h1>
            <h2>Instructor</h2>
            <p>{classProp.instructor_name}</p>
            <h2>Category</h2>
            <p>{classProp.type}</p>    
            </div>
        </CardContainer>
    )
}

export default ClassCard