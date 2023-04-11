import useFetch, { usePost, useDelete, usePut, useSingleFetch } from "../Hook/useFetch";
import { useEffect } from "react";

/*
The "get" function call.

It returns its data if the fetchStatus is "gotten".
*/
function FetchData(props) {
    const [fetchStatus, fetchData] = useFetch(props.url);

    useEffect(() => {
        if (fetchStatus == "gotten") {
            props.getReturnValue([fetchStatus, fetchData]);
        }
    }, [fetchStatus]);
    return null;
}

/*
The "post" function call.
*/
function PostData(props) {
    const returnData = usePost(props.url, props.data);

    props.getReturnValue(returnData);
    return null;
}

/*
The "delete" function call.
*/
function DeleteData(props) {
    const returnData = useDelete(props.url, props.id);

    props.getReturnValue(returnData);
    return null;
}

/*
The "singleFetch" function call.

It returns its data if the fetchStatus is "gotten".
*/
function SingleFetchData(props) {
    const [fetchStatus, fetchData] = useSingleFetch(props.url, props.id);

    useEffect(() => {
        if (fetchStatus == "gotten") {
            props.getReturnValue([fetchStatus, fetchData]);
        }
    }, [fetchStatus]);

    return null;
}

export { FetchData as default, PostData, DeleteData, SingleFetchData };