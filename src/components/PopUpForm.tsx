import styled from "styled-components";
import { FontConsts } from "../consts/fontConsts";
import { ColorConsts } from "../consts/colorConsts";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

export const PopUpContainer = styled.div`
  width: 400px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: ${FontConsts.FontWeight.bold};
  border-radius: 10px 10px 0px 0px;
  background-color: ${ColorConsts.ColorTheme.basic};
  color: ${ColorConsts.ColorTheme.white};
  height: 60px;
  line-height: 60px;
  text-align: center;
`;

export const FormContainer = styled.form`
  /* width: 100%; */
  /* height: 100%; */
  display: flex;
  padding: 40px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  margin-bottom: 10px;
  &:focus {
    border: 1px solid #333;
  }
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  margin: 10px 0px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: ${FontConsts.FontWeight.bold};
  background-color: ${ColorConsts.ColorTheme.basic};
  color: ${ColorConsts.ColorTheme.white};
  cursor: pointer;
  transition: 0.2s;
  /* hoverすると背景色を少し薄くする */
  &:hover {
    background-color: ${ColorConsts.ColorTheme.basic} + 20;
  }
`;
