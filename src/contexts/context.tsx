import { createContext } from 'react';

type ContextType = {
    name: string;
    age: number
}

const InitialState = {
    name: 'Bonieky',
    age: 90
}

export const Context = createContext<ContextType>(InitialState);

export const ContextProvider = ({ children }: { children: JSX.Element}) => {
    return (
        <Context.Provider value={InitialState}>
            {children}
        </Context.Provider>
    )
}