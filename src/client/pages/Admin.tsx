import React, { useState } from "react";
import Form from "../components/Form";
import Field from "../components/Field";
import fetchAPI from "../utils/fetchAPI";

const Admin: React.FC = () => {
    const [message, setMessage] = useState(""),
        formDataHandler = async (data: any) => {
            try {
                const res = await fetchAPI("project", "POST", data);
                setMessage(`Project ${res.name} added.`)
                console.log(res);
            } catch (error) {
                setMessage("Error: unable to post ticket");
            }
        };

    return (
        <>
            <h1>Admin</h1>
            { message && <p>{message}</p> }
            <section>
                <h2>Add User</h2>
                
            </section>
            <section>
                <h2>Create Project</h2>
                <Form formDataHandler={formDataHandler}>
                    <Field name="name" label="Project Name" />
                </Form>
            </section>
        </>
    )
}

export default Admin;