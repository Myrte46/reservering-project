import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (param, update) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        let url = `http://localhost:1337/api/${param}`;

        setStatus("fetching", data);

        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                setStatus("gotten", data)
             })
            .catch((error) => setStatus(error));
    }, [param, update]);

    return [status, data];
};

const useSingleFetch = (param, id) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        let url = `http://localhost:1337/api/${param}/${id}`;

        setStatus("fetching", data);

        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                setStatus("gotten", data)
             })
            .catch((error) => setStatus(error));
    }, [param, id]);

    return [status, data];
};

const usePost = (postUrl, data) => {

    let url = `http://localhost:1337/api/${postUrl}`;

    const [status, setStatus] = useState("idle");
    const [responseData, setData] = useState([]);

    const fetchData = async (formData) => {
        setStatus("fetching", formData);

        axios
            .post(
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

const useDelete = (deleteUrl, id) => {

    let url = `http://localhost:1337/api/${deleteUrl}/${id}`;

    const [status, setStatus] = useState("idle");
    const [responseData, setData] = useState([]);

    useEffect(()=> {
        setStatus("fetching", id);

        axios
            .delete(
                url)
            .then((response) => {
                setData(response.data);
                setStatus("deleted succesfully", responseData) })
            .catch((error) => {
                setStatus("failed", error);
            });
        }, [deleteUrl, id]);

    return [status, responseData];
}

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