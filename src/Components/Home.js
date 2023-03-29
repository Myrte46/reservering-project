import "./Home.css";
import Input from "./Input";
import useFetch, { usePost, useDelete } from "../Hook/useFetch";
import useData from "../Hook/useData";
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const { register, handleSubmit, formState: { errors }, control } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });
    const url = "partners";

    //const [testData] = useData({type: "get", url: url, update: update});
    // const [setFetch] = useData({type: "post", url: url, update: update});
    // useData({type: "delete", url: url, id: id});
    // const [testData] = useData({type: "singleFetch", url: url, id: id});
    // const [setFetch] = useData({type: "put", url: url, id: id});
    // useData({type: type})

    //get section
    const [update, setUpdate] = useState(0);
    const [getStatus, getResponseData] = useFetch(url, update);

    const [data, setData] = useState((getResponseData || []));

    useEffect(() => {
        // handle successful/failed fetch status and data/error
        console.log("Get log ", getStatus, getResponseData);
        setData(getResponseData);
    }, [getStatus, getResponseData]);

    //post section
    const [setFetch, fetchStatus, responseData] = usePost(url, {});

    useEffect(() => {
        // handle successful/failed fetch status and data/error
        console.log("Post log ", fetchStatus, responseData);
        setUpdate(update + 1);
    }, [fetchStatus, responseData]);

    const onSubmit = (data, e) => {
        console.log(data, e);
        setFetch(data);
    };

    const [myError, setMyError] = useState();

    const onError = (errors, e) => {
        console.log(errors, e);
        setMyError(errors);
    }

    //delete section
    const [deleteId, setDelete] = useState({});
    const [deleteStatus, replyData] = useDelete(url, deleteId);

    const handleDelete = (e) => {
        const { name } = e.target;
        setDelete(name);
    }

    useEffect(() => {
        // handle successful/failed fetch status and data/error
        console.log("Delete log", deleteStatus, replyData);
        setUpdate(update + 1);
    }, [deleteStatus, replyData]);

    //update section
    const [id, setId] = useState("");

    const handleUpdate = (e) => {
        const { name } = e.target;
        setId(name);
    }

    function handleReturn() {
        setId("");
        setUpdate(update + 1);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)} control={control}>
                <Input
                    name="name"
                    validationSchema={{ required: "Dit veld is verplicht" }}
                    label="Je naam"
                    required
                    errorLog={myError}
                    register={register} />
                <button type="submit" className="button margin">Submit</button>
            </form>
            {
                (data.data || []).map((item, index) =>
                    <div key={index} className="margin">
                        <h3>{item.attributes.name}</h3>
                    </div>
                )
            }
        </>
    )
}