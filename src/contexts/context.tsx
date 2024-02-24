import React, { createContext, useContext, useState, useCallback } from 'react';

type ContextType = {
    Pomodoro: number,
    ShortBreak: number,
    LongBreak: number,
    setPomodoro: (value: number) => void,
    setShortBreak: (value: number) => void,
    setLongBreak: (value: number) => void,
}

const InitialState = {
    Pomodoro: 25,
    ShortBreak: 5,
    LongBreak: 15,
    setPomodoro: () => {},
    setShortBreak: () => {},
    setLongBreak: () => {},
}

export const Context = createContext<ContextType>(InitialState);

export const useCustomContext = () => {
    return useContext(Context);
};

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [contextState, setContextState] = useState(InitialState);

    const limitTo120 = (value: number) => Math.min(Math.max(value, 0), 120); // Limita o valor entre 0 e 120 minutos

    const setPomodoro = useCallback((value: number | string) => {
        const trimmedValue = String(value).trim();
        const parsedValue = trimmedValue === '' ? 0 : limitTo120(isNaN(parseInt(trimmedValue, 10)) ? 0 : parseInt(trimmedValue, 10));
        setContextState((prev) => ({ ...prev, Pomodoro: parsedValue }));
    }, []);

    const setShortBreak = useCallback((value: number | string) => {
        const trimmedValue = String(value).trim();
        const parsedValue = trimmedValue === '' ? 0 : limitTo120(isNaN(parseInt(trimmedValue, 10)) ? 0 : parseInt(trimmedValue, 10));
        setContextState((prev) => ({ ...prev, ShortBreak: parsedValue }));
    }, []);

    const setLongBreak = useCallback((value: number | string) => {
        const trimmedValue = String(value).trim();
        const parsedValue = trimmedValue === '' ? 0 : limitTo120(isNaN(parseInt(trimmedValue, 10)) ? 0 : parseInt(trimmedValue, 10));
        setContextState((prev) => ({ ...prev, LongBreak: parsedValue }));
    }, []);

    const contextValue: ContextType = {
        ...contextState,
        setPomodoro,
        setShortBreak,
        setLongBreak,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};
