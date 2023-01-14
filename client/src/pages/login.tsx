import Google from "../google.png";
import "../styling/login.css";

export const Login = () => {
  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <div>
      <h1>Choose a Login Method</h1>

      <div className="loginButton google" onClick={google}>
        Google
      </div>
      <div>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Password" />
        <button>Login</button>
      </div>
    </div>
  );
};
