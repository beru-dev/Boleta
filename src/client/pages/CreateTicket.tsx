import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Field from "../components/Field";
import SelectorOptions from "../components/SelectorOptions";
import fetchAPI from "../utils/fetchAPI";
import jsonParseSafe from "../utils/jsonParseSafe";
import options from "../data/optionTypes.json";

const CreateTicket: React.FC = () => {
    const [message, setMessage] = useState(""),
        [projects, setProjects] = useState<string[]>([]),
        navigate = useNavigate(),
        formDataHandler = async (data: any) => {
            const user = jsonParseSafe(localStorage.getItem("user")),
                name = user?.user_name;
                data.submitter = name;
            try {
                await fetchAPI("ticket", "POST", data);
                // navigate("/newTicket")
                navigate("/")
            } catch (error) {
                setMessage("Error: unable to post ticket");
            }
        };

    useEffect(() => {
        if(projects.length > 0) return;
        fetchAPI("project").then(res => {
            setProjects(res.map(({ name }: { name: string }) => name));
        });
    }, [projects]);

    return (
        <>
            { message && <p>{message}</p> }
            <Form formDataHandler={formDataHandler}>
                <Field name="project_name" label="Project" type="select">
                    <SelectorOptions options={projects} />
                </Field>
                <Field name="title" label="Title" />
                <Field name="ticket_priority" label="Priority" type="select">
                    <SelectorOptions options={options["priority"]} />
                </Field>
                <Field name="ticket_status" label="Status" type="select">
                    <SelectorOptions options={options["status"]} />
                </Field>
                <Field name="assignee" label="Assignee" />
                <Field name="story_points" label="Story Points" />
                <Field name="ticket_description" label="Description" type="textarea" />
            </Form>
        </>
    )
}

export default CreateTicket;