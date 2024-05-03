import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import UserList from "./views/user/UserList";
import UserForm from "./views/user/UserForm";
import NotFound from "./views/NotFound";

const AppRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/user" element={<UserList></UserList>}></Route>
            <Route path="/user/new" element={<UserForm></UserForm>}></Route>
            <Route path="/user/:id" element={<UserForm></UserForm>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
    );
}

export default AppRoutes;