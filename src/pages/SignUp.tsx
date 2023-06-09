import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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

type SignUpForm = {
  email: string;
  password: string;
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
