import "./Login.css";
import { useState } from "react";
import App from "../../App.js";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handdleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      email,
      password,
    };
    fetch(`${import.meta.env.VITE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.jwtToken) {
          localStorage.setItem("token", result.jwtToken);
          setLoginSuccessful(true);
          axios
            .get(`${import.meta.env.VITE_URL}/users/email/${email}`)
            .then((response) => {
              const data = response.data;
              localStorage.setItem("id", data.id);
              localStorage.setItem("image", data.image);
              localStorage.setItem("name", data.firstname);
              console.log(data);
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error al obtenerlo:", error);
            });
        } else {
          setLoginSuccessful(false);
          setError("Wrong email or password");
          setIsLoading(false);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {loginSuccessful ? (
        <App />
      ) : (
        <div className="custom-form">
          <img className="logo" src="/logoacc.png" alt="" />
          <form className="custom-form" onSubmit={handdleLogin}>
            {isLoading && <span>Loading...</span>}{" "}
            {error && (
              <div
                style={{ color: "orange" }}
                className={`error-message ${error ? "" : "hidden"}`}
              >
                {error}
              </div>
            )}
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              placeholder="email"
              className="custom-input"
              autoComplete=""
              type="email"
            />
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
              placeholder="password"
              autoComplete=""
              className="custom-input"
              type="password"
            />
            <input
              type="submit"
              value="Login"
              name="new"
              className="custom-button btn btn-block btn-primary cursor"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
