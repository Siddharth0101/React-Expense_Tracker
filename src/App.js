import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Authentication from "./pages/Authentication/Authentication";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/auth",
          element: <Authentication />,
        },
        {
          path: "/welcome",
          element: <Welcome />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
