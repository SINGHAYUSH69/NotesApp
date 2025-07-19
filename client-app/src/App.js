import Login from "./Components/login";
import { Navigate } from "react-router-dom";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import CreateNote from "./Components/createNote";
import ViewNote from "./Components/viewNote";
import Dashboard from "./Components/dashboard";
const router=createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/user/login" />,
  },
  {
    path:"/user/login",
    element:<Login/>,
  },
  {
    path:"/note/create",
    element:<CreateNote/>,
  },
  {
    path:"/notes/view",
    element:<ViewNote/>,
  },
  {
    path:"/dashboard",
    element:<Dashboard/>,
  }
]);
function App() {
  return <RouterProvider router={router}/>
}
export default App;
