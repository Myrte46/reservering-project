import { useState, useEffect } from "react";
import useFetch, { usePost, useDelete, usePut, useSingleFetch } from "../Hook/useFetch";

const useData = ({ type, url, update = 0, id = "" }) => {
    const [getStatus, getResponseData] = useFetch(url, update);
    const [setPostFetch, postStatus, postResponseData] = usePost(url, update);
    const [deleteStatus, deleteData] = useDelete(url, id);
    const [singleStatus, singleData] = useSingleFetch(url, id);
    const [setPutFetch, putStatus, putResponseData] = usePut(url, id);

    const [data, setData] = useState([]);

    useEffect(() => {
        switch (type) {
            case "get":
                console.log("Get log ", getStatus, getResponseData);
                setData(getResponseData || []);
                return [data];
            // case "post":
            //     console.log("Post log ", postStatus, postResponseData);
            //     return [setPostFetch];
            // case "delete":
            //     console.log("delete log ", deleteStatus, deleteData);
            //     return [];
            // case "singleFetch":
            //     console.log("Single get log ", singleStatus, singleData);
            //     setData(singleData || []);
            //     return [data];
            // case "put":
            //     console.log("Put log ", putStatus, putResponseData);
            //     return [setPutFetch];
            // default:
            //     console.log("You didn't use a valid type");
            //     return [];
        }
    }, [type, url, update, id]);
}

export default useData;