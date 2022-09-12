import { useContext, useState } from "react";
import { postSignIn } from "../../services/services.js";
import MainContainer from "../components/shared/MainContainer.js";
import InputBox from "../components/shared/InputBox.js";
import UserContext from "../../contexts/UserContext.js";
import { Link, useNavigate } from "react-router-dom";
import Text from "../components/shared/Text.js";
import Button from "../components/shared/Button.js";
import styled from "styled-components";

export default function SignUpPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
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

    function signIn(event) {
        event.preventDefault();

        const body = {
            email: form.email,
            password: form.password,
        };

        if (form.email.length === 0 || form.password.length === 0) {
            alert("Por favor, preencha o formulário corretamente.")
        }

        const promise = postSignIn(body);

        setIsLoading(true);

        promise.then((response) => {
            const data = response.data;
            setAuthToken(data.token);
            setUsername(data.username);
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
                <form onSubmit={signIn}>
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

                    <Button
                        type="submit"
                        content="Entrar"
                        isDisabled={isLoading}
                        margin={"13px auto"}
                    />
                </form>


                <Link to={"/signup"}>
                    <Text
                        size="small"
                        position="center"
                        decoration="underline"
                        pointer={true}
                        margin={"30px 0px"}
                        fontWeight={700}
                    >
                        {"Primeira vez? Cadastre-se!"}
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