import React, { useState } from "react";
import Form from "../components/Form";
import Field from "../components/Field";
import SelectorOptions from "../components/SelectorOptions";
import fetchAPI from "../utils/fetchAPI";
import options from "../data/optionTypes.json"

const Admin: React.FC = () => {
    const [message, setMessage] = useState(""),
        projectFormHandler = async (data: any) => {
            try {
                const res = await fetchAPI("project", "POST", data);
                setMessage(`Project ${res.name} added.`)
                console.log(res);
            } catch (error) {
                setMessage("Error: unable to post project");
            }
        },
        userFormHandler = async (data: any) => {
            try {
                const res = await fetchAPI("user/register", "POST", data);
                setMessage(`User added.`)
                console.log(res);
            } catch (error) {
                setMessage("Error: unable to create user");
            }
        };

    return (
        <>
            <h1>Admin</h1>
            { message && <p>{message}</p> }
            <section>
                <h2>Add User</h2>
                <Form formDataHandler={userFormHandler}>
                    <Field name="user_name" label="User Name" />
                    <Field name="user_email" label="Email" />
                    <Field name="password" label="Password" type="password" />
                    <Field name="user_role" label="Role" type="select">
                        <SelectorOptions options={options["roles"]} />
                    </Field>
                </Form>
            </section>
            <section>
                <h2>Create Project</h2>
                <Form formDataHandler={projectFormHandler}>
                    <Field name="name" label="Project Name" />
                </Form>
            </section>
        </>
    )
}

export default Admin;