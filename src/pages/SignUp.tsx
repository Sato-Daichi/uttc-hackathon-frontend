import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { fireAuth } from "../firebase";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { ColorConsts } from "../consts/colorConsts";
import { FontConsts } from "../consts/fontConsts";

type SignUpForm = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (data: SignUpForm) => {
    try {
      await createUserWithEmailAndPassword(fireAuth, data.email, data.password);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const [user, setUser] = useState<any>();

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setUser(currentUser);
    });
  });

  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <Container>
          <PopUpContainer>
            <Title>新規登録</Title>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <div>
                <TextInput
                  type="email"
                  placeholder="メールアドレス"
                  {...register("email", { required: "この項目は必須です" })}
                />
                {errors.email?.message && (
                  <ErrorText>{errors.email.message}</ErrorText>
                )}
              </div>
              <div>
                <TextInput
                  type="password"
                  placeholder="パスワード"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "この項目は必須です",
                    },
                    minLength: {
                      value: 8,
                      message: "8文字以上入力してください。",
                    },
                  })}
                />
                {errors.password?.type === "required" && (
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
                {errors.password?.type === "minLength" && (
                  <ErrorText>8文字以上入力してください。</ErrorText>
                )}
              </div>
              <Button type="submit">登録する</Button>
              <Button onClick={() => navigate("/login")}>ログイン＞</Button>
            </FormContainer>
          </PopUpContainer>
        </Container>
      )}
    </>
  );
};

export default SignUp;

// ポップアップのようなcontainerを作る
// 縦方向にも横方向にも中央に配置する
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const PopUpContainer = styled.div`
  width: 400px;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: ${FontConsts.FontWeight.bold};
  border-radius: 10px 10px 0px 0px;
  background-color: ${ColorConsts.ColorTheme.basic};
  color: ${ColorConsts.ColorTheme.white};
  height: 60px;
  line-height: 60px;
  text-align: center;
`;

const FormContainer = styled.form`
  /* width: 100%; */
  /* height: 100%; */
  display: flex;
  padding: 40px;
  flex-direction: column;
  box-sizing: border-box;
`;

const TextInput = styled.input`
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

const Button = styled.button`
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

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;
