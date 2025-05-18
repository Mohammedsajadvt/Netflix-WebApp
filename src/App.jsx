import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router =  createBrowserRouter(
    [  {
        path:'/',element:<Login/>
      },
      {
        path:'/home',element:<Home/>
      },
    ]
  );
  return <RouterProvider router={router}/>;
}

export default App;
