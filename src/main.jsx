import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import PrivetRoute from "./components/PrivetRoute.jsx";
import Messenger from "./components/Messenger/Messenger.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/signin",
            element: <SignIn />,
          },
          {
            path: "/messenger",
            element: (
              <PrivetRoute>
                <Messenger />
              </PrivetRoute>
            ),
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
