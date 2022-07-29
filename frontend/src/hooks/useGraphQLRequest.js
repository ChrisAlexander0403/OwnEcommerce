import { useEffect, useState } from "react";
import axios from "axios";

const useGraphQLRequest = (request) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                let response = await axios.post('http://localhost:5000/graphql', request, {
            
                });
                setData(response.data.data);
            } catch (err) {
                setError(err);
            }
        })();
    }, []);
}

export default useGraphQLRequest;