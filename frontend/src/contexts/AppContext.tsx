import React, { Dispatch, SetStateAction, createContext } from 'react';

type ContextProps = {
    accessToken: string | null;
    keywords: string[];
    userName: string | undefined;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Context = createContext({ } as ContextProps);

export default Context;