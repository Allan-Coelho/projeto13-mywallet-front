import styled from "styled-components";

export default function NewTransactionButton({ iconSrc, text, clickFunction }) {

    return (
        <Wrapper onClick={() => clickFunction(text.replace("Nova ", ""))}><Icon src={iconSrc} />
            <Text>{text}</Text></Wrapper >
    )
}

const Wrapper = styled.div`
background-color: #A328D6;
height: 114px;
width: 155px;
cursor: pointer;
display: flex;
border-radius: 5px;
flex-direction: column;
padding: 7px;
justify-content: space-between;
`;

const Text = styled.p`
color: white;
font-size:17px;
background-color: #A328D6;
font-weight: 700;
width: 40px;
`;

const Icon = styled.img`
height: 25px;
width: 25px;
background-color: #A328D6;
`;