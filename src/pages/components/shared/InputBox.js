import styled from "styled-components";

export default function InputBox({
  placeHolder,
  type,
  required = true,
  handleChange,
  isDisabled = false,
  name,
  value,
  step = "",
  min = ""
}) {
  return (
    <Wrapper
      step={step}
      placeholder={placeHolder}
      type={type}
      min={min}
      required={required}
      name={name}
      value={value}
      onChange={handleChange}
      disabled={isDisabled}
    />
  );
}

const Wrapper = styled.input`
  height: 58px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
  border: 0px solid;
  margin: 6px 0px;
  font-size: 20px;
  padding: 6px;

  &&::placeholder {
    font-size: 20px;
    color: #000;
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #b3b3b3;
  }
`;