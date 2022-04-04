import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Field from "../components/Field";
import fetchAPI from "../utils/fetchAPI";

const Register: React.FC = () => {
    const navigate = useNavigate(),
        registerUser = async (user: NewUser) => {
            const { status } = await fetchAPI("user/login", "POST", user);
            if(status !== 200) {
                console.error(`Error: could not register user: ${status}`)
                return
            }
            navigate("/login");
        };

    return (
        <Form formDataHandler={registerUser}>
            <Field label="User" name="user_name" />
            <Field label="Email" name="user_email" type="email" />
            <Field label="Password" name="password" type="password" />
        </Form>
    )
}

export default Register;

interface NewUser {
    user_name: string
    user_email: string
    password: string
}