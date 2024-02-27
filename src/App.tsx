import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet  } from "react-router-dom";
import Users from "./pages/users/Users";
// import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
// import Product from "./pages/product/Product";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Accessibility from "./pages/accessibilities/Accessibilities";
import Places from "./pages/places/Places";
import Categories from "./pages/categories/Categories";
import Recommended from "./pages/recommended/Recommended";
import Comments from "./pages/comments/Comments";
import Usernew from "./pages/usernew/Usernew";
import Accessibilitynew from "./pages/accessibilitynew/Accessibilitynew";
import Recommendednew from "./pages/recomendednew/Recomendednew";
import Categorynew from "./pages/categorynew/Categorynew";
// import Commentnew from "./pages/commentnew/Commentnew";
import Placesnew from "./pages/placesnew/Placesnew";
import Accessibilityedit from "./pages/accessibilityedit/Accessibilityedit";
import Placesedit from "./pages/placesedit/Placesedit";
import Recommendededit from "./pages/recommendededit/Recommendededit";
import Categoriesedit from "./pages/categoriesedit/Categoriesedit";
import Commentsee from "./pages/commentsee/Commentsee";
import Profile from "./pages/profile/profile";
import { useEffect, useState } from "react";
// import { useState } from "react";


const queryClient = new QueryClient();

function App() {

  const [token, setToken] = useState(localStorage.getItem('token')); // Reemplaza 'miToken' con el nombre real de tu token
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  // Función para cerrar sesión
  const logout = () => {
    // Lógica de cierre de sesión (puede incluir la solicitud al servidor para invalidar el token, etc.)

    // Eliminar el token del localStorage
    localStorage.clear(); // Reemplaza 'miToken' con el nombre real de tu token
    setToken(null);
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem('token'); // Reemplaza 'miToken' con el nombre real de tu token
      console.log('chequeando')
      if (storedToken) {
        const decodedToken = JSON.parse(atob(storedToken.split('.')[1])); // Decodificar el token JWT
        const expirationTime = (decodedToken.exp * 1000) ; // Convertir a milisegundos
        // const expirationTime = (decodedToken.exp * 1000) - 86370000; // Convertir a milisegundos
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
          setIsTokenExpired(true);
          logout();
          window.location.reload()
        } else {
          setIsTokenExpired(false);
        }
      }
    };

    // Verificar el estado del token al montar el componente
    checkTokenExpiration();

    // Configurar un temporizador para verificar la expiración del token periódicamente
    const tokenCheckInterval = setInterval(() => {
      checkTokenExpiration();
    }, 5000); // Verificar cada minuto

    // Limpiar el temporizador al desmontar el componente
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, []);


  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/usernew",
          element: <Usernew />,
        },
        {
          path: "/accessibility",
          element: <Accessibility />,
        },
        {
          path: "/accessibility/:id",
          element: <Accessibilityedit />,
        },
        {
          path: "/accessibilitynew",
          element: <Accessibilitynew />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:id",
          element: <Categoriesedit />, 
        },
        {
          path: "/categorynew",
          element: <Categorynew />,
        },
        {
          path: "/recommended",
          element: <Recommended />,
        },
        {
          path: "/recommended/:id",
          element: <Recommendededit />,
        },
        {
          path: "/recommendednew",
          element: <Recommendednew />,
        },
        {
          path: "/comments",
          element: <Comments />,
        },
        {
          path: "/comments/:id",
          element: <Commentsee />,
        },
        // {
        //   path: "/commentnew",
        //   element: <Commentnew />,
        // },
        {
          path: "/places",
          element: <Places />,
        },
        {
          path: "/places/:id",
          element: <Placesedit />,
        },
        {
          path: "/placesnew",
          element: <Placesnew />,
        },
      ],
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
