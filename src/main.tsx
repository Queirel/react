import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './pages/login/Login.tsx'
import axios from 'axios'

// function parseJwt (token: any) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }


// let tokenExistAndStillValid = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());
const tokenExistAndStillValid =localStorage.getItem('token');
// console.log(tokenExistAndStillValid)


const verifyJwt = async (jwt: any): Promise<any> => {
  const verify = await axios.post(
    `${import.meta.env.VITE_URL}/auth/verify`,
    {jwtToken: jwt}
  )
  // console.log(verify.data)
  return verify.data
  ;}
  const verified  = await verifyJwt(tokenExistAndStillValid)
  
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

            <>{verified ? <App /> : <Login /> }</>

    {/* <App /> */}
  </React.StrictMode>,
)
