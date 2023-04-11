import axios from "axios";
import { useEffect, useState } from "react";

/*
The "get" API call.

It takes an API parameter.

status is the current status of the API call.
data is a list of entries.
*/
const useFetch = (fetchUrl, update) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        let url = `http://localhost:1337/api/${fetchUrl}`;

        setStatus("fetching", data);

        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                setStatus("gotten", data)
             })
            .catch((error) => setStatus(error));
    }, [fetchUrl, update]);

    return [status, data];
};

/*
The "singleFetch" API call.

It takes an API parameter and an entry's id.

status is the current status of the API call.
data is the single entry that was gotten.
*/
const useSingleFetch = (fetchUrl, id) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        let url = `http://localhost:1337/api/${fetchUrl}/${id}`;

        setStatus("fetching", data);

        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                setStatus("gotten", data)
             })
            .catch((error) => setStatus(error));
    }, [fetchUrl, id]);

    return [status, data];
};

/*
The "post" API call.

It takes an API parameter.

fetchData is the function called to update this API, and takes a single entry's data.
status is the current status of the API call.
data is the entry that was posted.
*/
const usePost = (postUrl, update) => {

    let url = `http://localhost:1337/api/${postUrl}`;

    const [status, setStatus] = useState("idle");
    const [data, setData] = useState([]);

    const fetchData = async (formData) => {
        setStatus("fetching", formData);

        axios
            .post(
                url, {
                data: formData
            })
            .then((response) => {
                setData(response.data);
                setStatus("posted", data) })
            .catch((error) => {
                setStatus("failed", error);
            });
    };

    return [fetchData, status, data];
};

/*
The "delete" API call.

It takes an API parameter and an entry's id.

status is the current status of the API call.
data is the entry that was deleted.
*/
const useDelete = (deleteUrl, id) => {

    let url = `http://localhost:1337/api/${deleteUrl}/${id}`;

    const [status, setStatus] = useState("idle");
    const [data, setData] = useState([]);

    useEffect(()=> {
        setStatus("fetching", id);

        axios
            .delete(
                url)
            .then((response) => {
                setData(response.data);
                setStatus("deleted succesfully", data) })
            .catch((error) => {
                setStatus("failed", error);
            });
        }, [deleteUrl, id]);

    return [status, data];
}

/*
The "put" API call.

It takes an API parameter and an entry's id.

fetchData is the function called to update this API, and takes a single entry's data.
status is the current status of the API call.
data is the entry that was updated.
*/
const usePut = (postUrl, id, data) => {

    let url = `http://localhost:1337/api/${postUrl}/${id}`;

    const [status, setStatus] = useState("idle");
    const [responseData, setData] = useState([]);

    const fetchData = async (formData) => {
        setStatus("fetching", formData);

        axios
            .put(
                url, {
                data: formData
            })
            .then((response) => {
                setData(response.data);
                setStatus("posted", responseData) })
            .catch((error) => {
                setStatus("failed", error);
            });
    };

    return [fetchData, status, responseData];
};

export { useFetch as default, useSingleFetch, usePost, useDelete, usePut };