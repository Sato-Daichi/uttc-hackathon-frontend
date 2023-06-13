import { useState, useEffect, useContext } from "react";
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
import LogInUserContext from "../store/login-user-context";
import { BACKEND_URL } from "../env";

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

  const { logInUsername, setLogInUsername } = useContext(LogInUserContext);

  const onSubmit: SubmitHandler<LogInForm> = async (data: LogInForm) => {
    try {
      await signInWithEmailAndPassword(fireAuth, data.email, data.password);

      // ログインに成功したらユーザー名を取得する
      console.log("data", data);
      const res = await fetch(
        BACKEND_URL + `/login?email=${data.email}&password=${data.password}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*", // CORS回避
          },
        }
      );
      if (!res.ok) {
        console.error("failed to get username");
        return;
      }

      const resJson = await res.json();
      console.log("resJson", resJson);

      // ユーザー名を取得
      setLogInUsername(resJson.username);
      localStorage.setItem("logInUsername", resJson.username);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
      console.log("error", error);
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
      {user && logInUsername ? (
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
                  <ErrorText>{errors.password.message}</ErrorText>
                )}
              </div>
              <Button type="submit">ログイン</Button>
              <Button onClick={() => navigate("/signup")}>新規登録＞</Button>
            </FormContainer>
          </PopUpContainer>
        </Container>
      )}
    </>
  );
};

export default Login;
