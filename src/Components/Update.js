import { useEffect, useState } from "react";
import Input from './Input.js';
import { useForm } from "react-hook-form";
import FetchData, { PostData, DeleteData, SingleFetchData, PutData } from "./Data.js";
import { usePut } from "../Hook/useFetch.js";

export default function Update(props) {
    const id = props.id;
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

    const [setFetch, fetchStatus, fetchData ] = usePut(props.url, id, props.data);

    /*
    Fills out the Input fields.

    props.fetchStatus and props.method are both from the Home.js JSX-element.
    setValue is from the useForm to populate the right fields.
    props.data is from the Home.js JSX-element, and will contain the single data gotten with the "singleFetch" API call.
    */
    useEffect(() => {
        // handle successful/failed fetch status and data/error
        if (props.fetchStatus == "gotten" && props.method == "singleFetch") {

            setValue('name', props.data.data.attributes["name"]);
            setValue('mail', props.data.data.attributes["mail"]);
            setValue('phone', props.data.data.attributes["phone"]);
            setValue('subject', props.data.data.attributes["subject"]);
            setValue('message', props.data.data.attributes["message"]);
        }
    }, [props.fetchStatus, props.method]);

    /*
    Upon posting a new and correct entry (according to the useForm), this function makes the API call by setting the setFetch to the data the useForm returned.

    data is the data the useForm returned, in object form
    setFetch is the function returned by the "put" useFetch call to update the data field, this is what makes the new entry.
    */
    const onSubmit = (data, e) => {
        if (typeof setFetch === "function") {
            setFetch(data);
        }
        props.handlePutSubmit(data, e);
    };

    const [myError, setMyError] = useState();

    /*
    If the useForm detects a mistake, it wil return this error and posts it in the log, as well as set the error for the Input fields to handle.
    */
    const onError = (errors, e) => {
        console.log(errors, e);
        setMyError(errors);
    }

    /*
    If there is no data, the id will be shown.
    If there is data, the form - prefilled with earlier filled out data - will be shown, as well as a button to sumbit the data and go back to the main form.
    */
    if (props.data.length !== []) {
        return (
            <>
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
                    <button type="submit" className="button margin">Submit</button>
                </form>
            </>
        )
    } else {
        return <>{id}</>
    }
}