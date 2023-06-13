import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { useEffect, useState } from "react";
import LoginUserContext from "./store/login-user-context";
import NotFound from "./pages/NotFound";

function App() {
  const [logInUserId, setLogInUserId] = useState<string>("");
  const [logInUsername, setLogInUsername] = useState<string>("");

  useEffect(() => {
    // ローカルストレージからログイン情報を取得
    const storedLogInUserId = localStorage.getItem("logInUserId");
    const storedLogInUsername = localStorage.getItem("logInUsername");

    // ログイン情報があればログイン状態を更新
    if (storedLogInUserId && storedLogInUsername) {
      setLogInUserId(storedLogInUserId);
      setLogInUsername(storedLogInUsername);
    }
  }, []);

  return (
    <LoginUserContext.Provider
      value={{
        logInUserId: logInUserId,
        setLogInUserId: setLogInUserId,
        logInUsername: logInUsername,
        setLogInUsername: setLogInUsername,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={logInUsername ? <Home /> : <LogIn />} />
          <Route
            path="/login/"
            element={logInUsername ? <Navigate to="/" /> : <LogIn />}
          />
          <Route
            path="/signup/"
            element={logInUsername ? <Navigate to="/" /> : <SignUp />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LoginUserContext.Provider>
  );
}

export default App;
