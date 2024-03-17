import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Authentication from "./pages/Authentication/Authentication";
import Welcome from "./pages/Welcome/Welcome";
import AuthProvider from "./store/AuthProvider";
import Profile from "./pages/Profile/Profile";
import { useState } from "react";
import Tracker from "./pages/Tracker/Tracker";

function App() {
  const [onHeader, setOnHeader] = useState();
  const headerHandler = (update) => {
    setOnHeader(update);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header forUpdate={onHeader} />,
      children: [
        {
          path: "/auth",
          element: <Authentication />,
        },
        {
          path: "/welcome",
          element: <Welcome />,
        },
        {
          path: "/profile",
          element: <Profile OnHeader={headerHandler} />,
        },
        {
          path: "/tracker",
          element: <Tracker />,
        },
      ],
    },
  ]);
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
