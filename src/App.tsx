import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useEffect, useState } from "react";
import LoginUserContext from "./store/login-user-context";

function App() {
  const [logInUserId, setLogInUserId] = useState<string>("");
  const [logInUserName, setLogInUserName] = useState<string>("");

  useEffect(() => {
    // ローカルストレージからログイン情報を取得
    const storedLogInUserId = localStorage.getItem("logInUserId");
    const storedLogInUserName = localStorage.getItem("logInUserName");

    // ログイン情報があればログイン状態を更新
    if (storedLogInUserId && storedLogInUserName) {
      setLogInUserId(storedLogInUserId);
      setLogInUserName(storedLogInUserName);
    }
  }, []);

  return (
    <LoginUserContext.Provider
      value={{
        logInUserId: logInUserId,
        setLogInUserId: setLogInUserId,
        logInUserName: logInUserName,
        setLogInUserName: setLogInUserName,
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
