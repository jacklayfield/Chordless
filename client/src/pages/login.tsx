import Google from "../google.png";
import "../styling/login.css";
import "../styling/theme.css";

export const Login = () => {
  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <div className="center">
      <div className="cover">
        <h1 className="login-text">Login</h1>
        <div className="input-container">
          <input type="text" placeholder="username" />
        </div>
        <div className="input-container bottom">
          <input type="password" placeholder="password" />
        </div>

        <div className="login-btn">Login</div>

        <h4 className="alt-login-text">Or login with</h4>

        <div className="alt-login">
          <div className="login-btn google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
        </div>
      </div>
    </div>
  );
};
