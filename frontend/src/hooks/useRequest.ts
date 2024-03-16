import { useState } from 'react';
import instance from 'utils/axiosInstance';

type useRequestProps = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
}

function useRequest({ url, method }: useRequestProps) {
    const [getLoading, setGetLoading] = useState(true);
    const [changeLoading, setChangeLoading] = useState(false);

    const performer = async <T>(body?: any) => {
        method !== 'get' && setChangeLoading(true);

        try {
            const result = await instance[method](url, method === 'delete' ? { data: body } : body);
            
            return result as T;
        }
        catch (error) {
            return undefined;
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