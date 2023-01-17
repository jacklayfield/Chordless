import Google from "../google.png";
import "../styling/login.css";
import "../styling/theme.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Login = () => {
  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <div className="login">
      <div className="wrapper">
        <div className="center">
          <h1 className="loginTitle">Login with Google</h1>
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
        </div>
      </div>
    </div>
  );
};
