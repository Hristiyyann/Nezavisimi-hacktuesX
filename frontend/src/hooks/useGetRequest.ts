import { useEffect, useState } from 'react';
import instance from 'utils/axiosInstance';

type useGetRequestProps = {
    url: string; 
}

function useGetRequest<T>({ url }: useGetRequestProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>();
    const [tryAgain, setTryAgain] = useState(0);

    useEffect(() => {
        performer();
    }, [tryAgain])

    const refetch = () => {
        setLoading(true);
        setData(undefined);
        setTryAgain(prev => prev + 1);
    }

    const performer = async () => {
        try {
            const result = await instance.get(url);
            console.log(result);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        loading, data, refetch
    }
}

export default useGetRequest;