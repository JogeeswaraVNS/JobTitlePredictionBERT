import "bootstrap/dist/css/bootstrap.min.css";
import Homelayout from "./homelayout/Homelayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Predictcomponent from "./predictcomponent/Predictcomponent";
import HomePage from "./homepage/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homelayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/predict",
          element: <Predictcomponent />,
        },
      ],
    },
  ]);

  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
