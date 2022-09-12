import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MainContainer from "../components/shared/MainContainer.js";
import TransactionsContainer from "../components/TransactionsContainer/TransactionsContainer.js";
import UserContext from "../../contexts/UserContext.js";
import Text from "../components/shared/Text.js";
import addIcon from "../assets/addIcon.svg";
import removeIcon from "../assets/removeIcon.svg";
import NewTransactionButton from "../components/shared/NewTransactionButton.js";
import InputBox from "../components/shared/InputBox.js";
import Button from "../components/shared/Button.js";
import { postTransactions, getTransactions } from "../../services/services.js";
import dayjs from "dayjs";

export default function TransactionsPage() {
    const { transactions, setTransactions, username, authToken } = useContext(UserContext);
    const [showForms, setShowForms] = useState({ value: false, title: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    const [form, setForm] = useState({
        description: "",
        value: "",
        type: "",
        date: Date.now(),
    });

    useEffect(() => {
        if (authToken === "") {
            navigate("/signin");
        }

        getTransactions(config).then((response) => {
            setTransactions(response.data);
        })

    }, [isChanged])

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    function forms(event) {
        event.preventDefault();
        setIsLoading(true);

        form.type = (showForms.title === "entrada") ? "credit" : "debit";
        const promise = postTransactions(form, config);

        promise.then(() => {
            setShowForms({ value: false, title: "" });
            setForm({
                description: "",
                value: "",
                type: "",
                date: Date.now(),
            });

            setIsChanged(!isChanged);
        })
    }

    function showFormsToggle(title) {
        setShowForms({ value: !showForms.value, title: title });
    }


    return (
        <MainContainer>
            {showForms.value ?
                <>
                    <Text
                        size={"large"}
                        margin={"0px 0px 40px 0px"}
                        fontWeight={700}
                    >{`Nova ${showForms.title}`}</Text>
                    <form onSubmit={forms}>
                        <InputBox
                            type="number"
                            step={"any"}
                            min={0.01}
                            placeHolder={"Valor"}
                            handleChange={handleChange}
                            isDisabled={isLoading}
                            name="value"
                            required={true}
                            value={form.value}
                        />
                        <InputBox
                            type="text"
                            step={"any"}
                            placeHolder={"Descricao"}
                            min={0.01}
                            handleChange={handleChange}
                            isDisabled={isLoading}
                            name="description"
                            required={true}
                            value={form.description}
                        />
                        <Button
                            type="submit"
                            content="Salvar"
                            isDisabled={isLoading}
                            margin={"13px auto"}
                        />
                    </form>
                </>
                :
                <>
                    <Text
                        size={"large"}
                        margin={"0px 0px"}
                        fontWeight={700}
                    >{`Olá, ${username.split(" ", 1)}`}</Text>
                    <TransactionsContainer>
                        {transactions.length === 0 ? <Text
                            size={"medium"}
                            margin={"0px 0px"}
                            fontWeight={300}
                            color={"black"}
                        >{"Não há registros de entrada ou saída"}</Text> : transactions.map((transaction) => {

                            return (
                                <TransactionContainer>
                                    <TransactionDate>{dayjs(transaction.date).format('DD/MM')}</TransactionDate>
                                    <TransactionDescription>{transaction.description}</TransactionDescription>
                                    <TransactionValue type={transaction.type}>{Number(transaction.value).toFixed(2)}</TransactionValue>
                                </TransactionContainer>)
                        })}
                    </TransactionsContainer>
                    <ButtonWrapper>
                        <NewTransactionButton clickFunction={showFormsToggle} iconSrc={addIcon} text={"Nova entrada"}></NewTransactionButton>
                        <NewTransactionButton clickFunction={showFormsToggle} iconSrc={removeIcon} text={"Nova saída"}></NewTransactionButton>
                    </ButtonWrapper>
                </>
            }


        </MainContainer>
    )
}

const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
`;

const TransactionContainer = styled.span`
display: flex;
font-size: 16px;
width: 300px;
height: 25px;
align-items: center;
justify-content: space-between;
z-index: 6;
padding: 15px;
background-color: white;
`;

const TransactionDate = styled.span`
color: #c6c6c6;
font-size: 16px;
text-align: left;
background-color: white;
`;

const TransactionDescription = styled.span`
color: black;
font-size: 16px;
padding: 0px 5px;
overflow-x: hidden;
width: 100%;
background-color: white;
`

const TransactionValue = styled.span`
text-align: right;
width: 70px;
font-size: 16px;
background-color: white;
${(props) => {
        if (props.type === "credit") {
            return "color: #03AC00"
        } else {
            return "color: #C70000"
        }
    }}
`;

