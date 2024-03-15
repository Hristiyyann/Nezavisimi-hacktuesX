import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

type ContextProps = {
    accessToken: string | null;
    keywords: string[];
    userName: string | undefined;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
    setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Context = createContext({ } as ContextProps);

function AppContext({ children }: { children: JSX.Element }) {
    const [accessToken, setAccessToken] = useState(window.localStorage.getItem('accessToken'));
    const [keywords, setKeywords] = useState<string[]>([]);
    const [userName, setUserName] = useState<string>();

    return (
        <Context.Provider
            value = {{ 
                accessToken, setAccessToken,
                keywords, setKeywords,
                userName, setUserName
            }}
        >
            {children}
        </Context.Provider>
    )

}

export { AppContext };
