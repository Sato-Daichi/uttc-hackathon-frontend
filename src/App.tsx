import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useEffect, useState } from "react";
import LoginUserContext from "./store/login-user-context";

function App() {
  const [logInUsername, setLogInUsername] = useState<string>("");

  useEffect(() => {
    // ローカルストレージからログイン情報を取得
    const storedLogInUsername = localStorage.getItem("logInUsername");

    // ログイン情報があればログイン状態を更新
    if (storedLogInUsername) {
      setLogInUsername(storedLogInUsername);
    }
  }, []);

  return (
    <LoginUserContext.Provider
      value={{
        logInUsername: logInUsername,
        setLogInUsername: setLogInUsername,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/" element={<LogIn />} />
          <Route path="/signup/" element={<SignUp />} />
        </Routes>
      </Router>
    </LoginUserContext.Provider>
  );
}

export default App;
