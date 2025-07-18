import React, { useState } from "react";
import "./Login.css";
import logo from "../../../assets/logo.png";
import { login, signUp } from "../../../firebase";
import netflix_spinner from "./../../../assets/netflix_spinner.gif";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
      navigate("/");
    } else {
      await signUp(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
  ) : (
    <div className="login">
      <img src={logo} alt="logo" className="login-logo" />
      <div className="login-form">
        <h1> {signState} </h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="E-mail"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now!
              </span>
            </p>
          ) : (
            <p>
              Already Have An Account?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now!
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
