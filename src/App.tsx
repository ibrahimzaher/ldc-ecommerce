import { RouterProvider } from "react-router-dom";
import { router } from "./core/routes/AppRoutes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
