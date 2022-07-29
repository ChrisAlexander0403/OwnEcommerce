import axios from 'axios';

const useRequest = () => {
    try {
        const data = await axios.post('http://localhost:3000/graphql', {
        });
    } catch {

    }
}

export default useRequest;