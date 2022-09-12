import styled from "styled-components";

export default function Text({
  children,
  color = "white",
  size,
  position,
  fontFamily = "",
  pointer = false,
  fontWeight = 400,
  fontStyle = "",
  decoration = "",
  clickFunction,
  margin = "3px auto",
}) {
  return (
    <Wrapper
      color={color}
      margin={margin}
      size={size}
      fontFamily={fontFamily}
      position={position}
      fontWeight={fontWeight}
      decoration={decoration}
      fontStyle={fontStyle}
      pointer={pointer}
      onClick={clickFunction}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.span`
  font-size: 22px;
  margin: 5px 0px;
  word-break: normal;
  ${(props) => {
    let config = "";
    if (props.size === "small") {
      config += `
        font-size: 16px;
      `;
    }

    if (props.size === "medium") {
      config += `
        font-size: 20px;
      `;
    }

    if (props.size === "large") {
      config += `
        font-size: 26px;
      `;
    }

    if (props.size === "title") {
      config += `
        font-size: 32px
      `;
    }

    if (props.color === "black") {
      config += `
        color: #000;
      `;
    }

    if (props.color === "white") {
      config += `
        color: #fff;
      `;
    }

    if (props.pointer === true) {
      config += `
        cursor: pointer;
      `;
    }

    if (props.position === "center") {
      config += `
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        `;
    }

    if (props.margin !== "") {
      config += `
    margin: ${props.margin};`
    }

    if (props.fontStyle !== "") {
      config += `
        font-style:${props.fontStyle};
        `;
    }

    if (props.fontWeight !== "") {
      config += `
        font-weight:${props.fontWeight};
        `;
    }

    if (props.fontFamily !== "") {
      config += `
        font-family:${props.fontFamily};
        `;
    }

    if (props.decoration !== "") {
      config += `
        text-decoration:${props.decoration};
        `;
    }
    return config;
  }}
`;
