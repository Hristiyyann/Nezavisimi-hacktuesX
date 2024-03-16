import React, { Dispatch, SetStateAction, createContext } from 'react';
import { Keyword } from 'types/Keywords';

type ContextProps = {
    accessToken: string | null;
    keywords: Keyword[];
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    setKeywords: React.Dispatch<React.SetStateAction<Keyword[]>>;
}

const Context = createContext({ } as ContextProps);

export default Context;