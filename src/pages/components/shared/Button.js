import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function Button({
    content,
    type = "",
    clickFunction,
    isDisabled = false,
    margin = "3px auto"
}) {
    return (
        <Wrapper
            type={type}
            margin={margin}
            onClick={clickFunction}
            disabled={isDisabled}
        >
            {isDisabled ? (
                <ThreeDots
                    height="13"
                    width="51"
                    radius="9"
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            ) : (
                content
            )}
        </Wrapper>
    );
}

const Wrapper = styled.button`
  background-color: #A328D6;
  width: 100%;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  border: 0px solid;
  font-weight: 700;
  margin: 3px auto;
  font-size: 20px;
  height: 46px;
  width: 100%;

  ${(props) => {
        let config = "";

        if (props.margin !== "") {
            config += `
        margin: ${props.margin};
    `
        }

        return config;
    }}
`;
