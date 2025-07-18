import Login from "./Components/login";
import { Navigate } from "react-router-dom";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import CreateNote from "./Components/createNote";
const router=createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/note/create" />,
  },
  {
    path:"/user/login",
    element:<Login/>,
  },
  {
    path:"/note/create",
    element:<CreateNote/>,
  }
]);
function App() {
  return <RouterProvider router={router}/>
}
export default App;
