import "./Home.css";
import Input from "./Input";
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import FetchData, { PostData, DeleteData, SingleFetchData } from "./Data.js";
import Update from "./Update.js";

export default function Home() {
    const { register, handleSubmit, formState: { errors }, control } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });
    const url = "partners";

    const [data, setData] = useState([]);
    const [method, setMethod] = useState("get");
    const [id, setId] = useState("");

    let [status, setStatus] = useState();

    let fetchStatus;
    let fetchData;
    let setFetch;

    /*
    Deconstructs the returning data from the methodSwitch to be in a usable state.

    data is the methodSwitch returned data.
    method is a useState variable that can be updated to call upon the right method.

    For example, the "get" method will deconstruct the "get" data from the methodSwitch (a list of all entries within the current API being used) and make it usable by putting it in the data in the setData field.
    The setStatus is more for debugging purposes, returning the current status of the API call.
    */
    function getReturnValue(data) {
        switch (method) {
            case "get":
                // destructuring
                [fetchStatus, fetchData] = data;
                setData(fetchData);
                setStatus(fetchStatus);
                break;
            case "post":
                [setFetch, fetchStatus, fetchData] = data;
                if (fetchStatus == "posted") {
                    setMethod("get");
                }
                break;
            case "delete":
                [fetchStatus, fetchData] = data;
                setMethod("get");
                break;
            case "singleFetch":
                [fetchStatus, fetchData] = data;
                setData(fetchData);
                setStatus(fetchStatus);
                break;
            default:
                console.log("You didn't use a valid returnValue");
                break;
        }
        console.log("getReturnValue ", method, fetchStatus, fetchData);
    }

    /*
    Conditionally calls the right useFetch method.

    method is a useState variable that can be updated to call upon the right method.
    url is the API currently being called.
    id is one specific entry within the url.

    Every data call returns the getReturnValue function (see above for usage)
    */
    function methodSwitch() {
        switch (method) {
            case "get":
                return <FetchData getReturnValue={getReturnValue} url={url} />;
            case "post":
                return <PostData getReturnValue={getReturnValue} url={url} data={{}} />;
            case "delete":
                return <DeleteData getReturnValue={getReturnValue} url={url} id={id} />;
            case "singleFetch":
                return <SingleFetchData getReturnValue={getReturnValue} url={url} id={id} />;
            default:
                console.log("You didn't use a valid methodSwitch");
                break;
        }
    }

    //post section

    /*
    Upon posting a new and correct entry (according to the useForm), this function will set the method to "post" and makes the API call by setting the setFetch to the data the useForm returned.

    data is the data the useForm returned, in object form
    setFetch is the function returned by the "post" useFetch call to update the data field, this is what makes the new entry.
    */
    const onSubmit = (data, e) => {
        setMethod("post");
        console.log(data, e);
        if (typeof setFetch === "function") {
            setFetch(data);
        }
    };

    const [myError, setMyError] = useState();

    /*
    If the useForm detects a mistake, it wil return this error and posts it in the log, as well as set the error for the Input fields to handle.
    */
    const onError = (errors, e) => {
        console.log(errors, e);
        setMyError(errors);
    }

    //delete section

    /*
    After the user presses on the delete button, this function activates to delete the desired entry.

    event target is the id of the data to be deleted.

    The right id and method are set so the "delete" methodSwitch and getReturnValue will handle the rest in deleting the entry.
    */
    const handleDelete = (e) => {
        const { name } = e.target;
        setId(name);
        setMethod("delete");
    }

    //update section

    /*
    After the user presses on the update button, this function activates to update the desired entry.

    event target is the id of the data being updated.

    The right id, method, and status are set, which will switch the updateForm to the new 'scene' of the Update.js JSX-element.
    */
    const handleUpdate = (e) => {
        const { name } = e.target;
        setId(name);
        setMethod("singleFetch");
        setStatus("idle");
    }

    /*
    After the user presses the submit button in the Update.js JSX-element, this function will run to return the user back to the main form.

    The id is emptied, the method put on "get" and status put on "idle" to re-trigger the "get" methodSwitch so the update will show up.
    */
    const handlePutSubmit = (data, e) => {
        setId("");
        setMethod("get");
        setStatus("idle");
    }

    /*
    Shows the "get" data in a list, along with the update and delete buttons.
    */
    function renderData() {
        if (method == "get" && status == "gotten") {
            return <>
                {(data.data || []).map((item, index) =>
                    <div key={index} className="margin">
                        <h3>{item.attributes.name}</h3>
                        <div>{item.attributes.mail}</div>
                        <div>{item.attributes.phone}</div>
                        <div>{item.attributes.subject}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.attributes.message }} />
                        <button onClick={handleDelete} name={item.id} className="button">Delete</button>
                        <button onClick={handleUpdate} name={item.id} className="button margin">Update</button>
                    </div>
                )}
            </>

        }
    }

    /*
    If the id is empty, it'll show the main form with its accompanying Input.js JSX-element and the data underneath that.
    If the id has a number in it (by pressing on the update button in renderData), it will show the Update.js JSX-element.
    */
    function updateForm() {
        if (id === "") {
            return (<>
                <form onSubmit={handleSubmit(onSubmit, onError)} control={control}>
                    <h1 className='margin'>Form:</h1>
                    <Input
                        name="name"
                        validationSchema={{ required: "Dit veld is verplicht" }}
                        label="Je naam"
                        required
                        errorLog={myError}
                        register={register} />
                    <Input
                        name="mail"
                        validationSchema={{
                            required: "Dit veld is verplicht",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Zorg ervoor dat er een email word gebruikt"
                            }
                        }}
                        label="Je e-mailadres"
                        required
                        errorLog={myError}
                        register={register} />
                    <Input
                        name="phone"
                        validationSchema={{
                            required: "Dit veld is verplicht",
                            pattern: {
                                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                                message: "Zorg dat er een telefoonnummer word gebruikt"
                            }
                        }}
                        label="Je telefoon"
                        required
                        errorLog={myError}
                        register={register}
                    />
                    <Input
                        name="subject"
                        validationSchema={{ required: "Dit veld is verplicht" }}
                        label="Onderwerp"
                        required
                        errorLog={myError}
                        register={register} />
                    <Input
                        name="message"
                        validationSchema={{ required: "Dit veld is verplicht" }}
                        label="Je bericht"
                        required
                        errorLog={myError}
                        register={register}
                        textarea />
                    <button type="submit" className="button margin" onClick={() => setMethod("post")}>Submit</button>
                </form>
                <h2 className='margin'>Information:</h2>
                {renderData()}
            </>)
        } else {
            return <Update id={id} handlePutSubmit={handlePutSubmit} method={method} data={data} fetchStatus={status} url={url} />
        }
    }

    return (
        <>
            {updateForm()}
            {methodSwitch()}
        </>
    )
}