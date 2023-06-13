import { useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { fireAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Container,
  ErrorText,
  FormContainer,
  PopUpContainer,
  TextInput,
  Title,
} from "../components/PopUpForm";
import LogInUserContext from "../store/login-user-context";
import { BACKEND_URL } from "../env";

type SignUpForm = {
  email: string;
  password: string;
  username: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onChange",
    criteriaMode: "all",
  });

  const { setLogInUserId, setLogInUsername } = useContext(LogInUserContext);

  const onSubmit: SubmitHandler<SignUpForm> = async (data: SignUpForm) => {
    try {
      await createUserWithEmailAndPassword(fireAuth, data.email, data.password);

      // ユーザー登録
      const res = await fetch(BACKEND_URL + `/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.username,
        }),
      });
      if (!res.ok) {
        console.error("failed to signup");
        return;
      }

      const resUser = await res.json();
      console.log("resJson", resUser);

      // userIdとusernameを取得
      setLogInUserId(resUser.id);
      localStorage.setItem("logInUserId", resUser.id);
      setLogInUsername(data.username);
      console.log("logInUsername", data.username);
      localStorage.setItem("logInUsername", data.username);

      navigate("/");
    } catch (error) {
      console.log("error", error);
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
                  message: "8文字以上入力してください",
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
          <div>
            <TextInput
              type="text"
              placeholder="ユーザー名"
              {...register("username", { required: "この項目は必須です" })}
            />
            {errors.username?.message && (
              <ErrorText>{errors.username.message}</ErrorText>
            )}
          </div>
          <Button type="submit">登録する</Button>
          <Button onClick={() => navigate("/login")}>ログイン＞</Button>
        </FormContainer>
      </PopUpContainer>
    </Container>
  );
};

export default SignUp;
