import "./Login.css";
import { useState } from "react";
import App from "../../App.js";
// import { Navigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handdleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true)
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
        // const verify = await axios.post(
        //   `${import.meta.env.VITE_URL}/auth/verify`,
        //   result
        // );
        // console.log(verify.data);
        if (result.jwtToken) {
          localStorage.setItem("token", result.jwtToken);
          setLoginSuccessful(true);
        } else {
          setLoginSuccessful(false);
          setError('Wrong email or password');
          // alert('Wrong email or password')
          setIsLoading(false)
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if (loginSuccessful) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      {loginSuccessful ? (
        <App />
      ) : (
        <div className="custom-form">
   

      <img className="logo" src="logoacc.png" alt="" />
          <form className="custom-form" onSubmit={handdleLogin}
>
{isLoading && <span>Cargando...</span>} {error && <div style={{ color: 'orange' }} className={`error-message ${error ? '' : 'hidden'}`}>{error}</div>}
            {/* <label className="custom-label">Email:</label> */}
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
            {/* <label className="custom-label">Password:</label> */}
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
            <input type="submit" value="Login" name="new" className="custom-button btn btn-block btn-primary cursor"/>
          </form>
            {/* <button className="custom-button" onClick={handdleLogin}>
              Login
            </button> */}
        </div>
      )}
    </>
  );
};

export default Login;
