import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Field from "../components/Field";
import { login, User } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";

const Login: React.FC = () => {
    const dispatch = useAppDispatch(),
        navigate = useNavigate(),
        postLogin = (userData: User) => {
            dispatch(login(userData));
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