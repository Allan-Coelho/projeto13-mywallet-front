import styled from "styled-components";

export default function TransactionsContainer({ children }) {

    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-color: white;
border-radius: 5px;
width: 100%;
min-height: 446px;
margin: 13px 0px;
`