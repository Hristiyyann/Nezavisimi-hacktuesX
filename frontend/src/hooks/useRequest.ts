import { useState } from 'react';
import instance from 'utils/axiosInstance';

type useRequestProps = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
}

function useRequest({ url, method }: useRequestProps) {
    const [getLoading, setGetLoading] = useState(true);
    const [changeLoading, setChangeLoading] = useState(false);

    const performer = async (body: any) => {
        method !== 'get' && setChangeLoading(true);

        try {
            const result = await instance[method](url, body);
            
            return {
                success: true,
                result
            };
        }
        catch (error) {
            return error
        }
        finally {
            method === 'get' && setGetLoading(false);
            method !== 'get' && setChangeLoading(false);
        }
    }

    return {
        performer, getLoading, changeLoading
    }
}

export default useRequest;