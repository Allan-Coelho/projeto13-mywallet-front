import { useContext, useState } from "react";
import { postSignUp } from "../../services/services.js";
import MainContainer from "../components/shared/MainContainer.js";
import InputBox from "../components/shared/InputBox.js";
import UserContext from "../../contexts/UserContext.js";
import { Link, useNavigate } from "react-router-dom";
import Text from "../components/shared/Text.js";
import Button from "../components/shared/Button.js";
import styled from "styled-components";

export default function SignUpPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthToken, setUsername } = useContext(UserContext);
    const navigate = useNavigate();

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    function signUp(event) {
        event.preventDefault();

        const body = {
            name: form.name,
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword
        };

        if (form.name.length === 0 || form.email.length === 0 || form.password.length === 0 || form.confirmPassword !== form.password) {
            alert("Por favor, preencha o formulário corretamente.")
        }

        const promise = postSignUp(body);

        setIsLoading(true);

        promise.then((response) => {
            const data = response.data;
            setAuthToken(data);
            setUsername(form.name);
            setIsLoading(false);
            navigate("/");
        });

        promise.catch((response) => {
            setIsLoading(false);
            alert(response.response.data);
            console.log(response);
        });
    }

    return (
        <MainContainer>
            <Wrapper>
                <Text
                    size={"title"}
                    position={"center"}
                    fontFamily={"'Saira Stencil One', cursive"}
                    margin={"30px 0px"}
                >MyWallet</Text>
                <form onSubmit={signUp}>
                    <InputBox
                        type="text"
                        placeHolder={"Nome"}
                        handleChange={handleChange}
                        isDisabled={isLoading}
                        name="name"
                        required={true}
                        value={form.name}
                    />
                    <InputBox
                        type="email"
                        placeHolder={"E-mail"}
                        handleChange={handleChange}
                        isDisabled={isLoading}
                        name="email"
                        required={true}
                        value={form.email}
                    />
                    <InputBox
                        type="password"
                        placeHolder={"Senha"}
                        handleChange={handleChange}
                        isDisabled={isLoading}
                        name="password"
                        required={true}
                        value={form.password}
                    />
                    <InputBox
                        type="password"
                        placeHolder={"Confirme a senha"}
                        handleChange={handleChange}
                        isDisabled={isLoading}
                        name="confirmPassword"
                        required={true}
                        value={form.confirmPassword}

                    />
                    <Button
                        type="submit"
                        content="Cadastrar"
                        isDisabled={isLoading}
                        margin={"13px auto"}
                    />
                </form>


                <Link to={"/signin"}>
                    <Text
                        size="small"
                        position="center"
                        decoration="underline"
                        pointer={true}
                        margin={"30px 0px"}
                        fontWeight={700}
                    >
                        {"Já tem uma conta? Entre Agora"}
                    </Text>
                </Link>
            </Wrapper>
        </MainContainer>
    )


}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`