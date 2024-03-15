import React, { Dispatch, SetStateAction, createContext } from 'react';
import { Keyword } from 'types/Keywords';

type ContextProps = {
    accessToken: string | null;
    keywords: Keyword[];
    userName: string | undefined;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    setKeywords: React.Dispatch<React.SetStateAction<Keyword[]>>;
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Context = createContext({ } as ContextProps);

export default Context;