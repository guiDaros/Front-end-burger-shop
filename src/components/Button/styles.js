import styled from "styled-components";

export const ContainerButton = styled.button`
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 5px;
  background-color: #9758a6;
  font-family: "Road Rage", sans-serif;
  font-size: 30px;
  color: #fff;
  transition: background-color 0.3s ease, border 0.3s ease;

  &:hover {
    background-color: #6f3576;
    border: 1px dashed #fff;
  }
`;
