import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
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

type LogInForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>({
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<LogInForm> = async (data: LogInForm) => {
    try {
      await signInWithEmailAndPassword(fireAuth, data.email, data.password);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
      return;
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
        <Navigate to={`/`} />
      ) : (
        <Container>
          <PopUpContainer>
            <Title>ログイン</Title>
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
              <Button type="submit">ログイン</Button>
              <Button onClick={() => navigate("/login")}>新規登録＞</Button>
            </FormContainer>
          </PopUpContainer>
        </Container>
      )}
    </>
  );
};

export default Login;
