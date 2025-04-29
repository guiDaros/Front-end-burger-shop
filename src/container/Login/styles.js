import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";

import BackgroundLogin from "../../assets/bg1.svg";
import Background from "../../assets/Background2.svg";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
export const LeftContainer = styled.div`
  background: url("${BackgroundLogin}");
  background-size: cover;
  background-position: center;

  height: 100%;
  width: 100%;
  max-width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 60%;
  }
`;
export const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
  width: 100%;
  max-width: 50%;

  background: url("${Background}");
  background-color: #2d2d2d;

  p {
    color: #ffffff;
    font-size: 18px;
    font-size: 800;

    a {
      text-decoration: underline;
      color: #9758a6;
      cursor: pointer;
    }
  }
`;
export const Title = styled.h2`
  font-family: "Road Rage", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 48px;
  color: #ffffff;

  span {
    color: #9758a6;
    font-family: "Road Rage", sans-serif;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  input {
    width: 100%;
    height: 52px;
    padding: 0 16px;

    border: none;
    border-radius: 5px;
  }

  label {
    font-size: 18px;
    font-weight: 600;

    color: #ffffff;
  }

  p {
    font-size: 14px;
    line-height: 80%;
    color: #cf3057;
    font-weight: 600;
    height: 10px;
  }
`;
export const Link = styled(ReactLink)`
  text-decoration: none;
  color: #fff;
`;
