import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Field from "../components/Field";
import { login, User } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";
import fetchAPI from "../utils/fetchAPI";

const Login: React.FC = () => {
    const dispatch = useAppDispatch(),
        navigate = useNavigate(),
        postLogin = async (userData: User) => {
            const auth = await fetchAPI("user/login", "POST", userData);
            localStorage.setItem('user', JSON.stringify(auth));
            localStorage.setItem("userTime", `${new Date()}`);
            dispatch(login({ name: auth.user_name }));
            navigate("/");
        };

    return (
        <Form formDataHandler={postLogin}>
            <Field label="User" name="user_name" />
            <Field label="Password" name="password" type="password" />
        </Form>
    )
}

export default Login;