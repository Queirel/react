import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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
import Accessibilities from "./pages/accessibilities/Accessibilities";
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


const queryClient = new QueryClient();

function App() {
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
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/usernew",
          element: <Usernew />,
        },
        {
          path: "/accessibility",
          element: <Accessibilities />,
        },
        {
          path: "/accessibility/:id",
          element: <Accessibilities />,
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
          element: <Categories />,
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
          element: <Recommended />,
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
          element: <Comments />,
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
          element: <Places />,
        },
        {
          path: "/placesnew",
          element: <Placesnew />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
