import * as React from 'react';
import { useUser } from '../hooks';

const { createContext, useContext } = React;

export const UserContext = createContext<any>({});

export const UserContextProvider: React.FC = ({ children }) => {
    const { user, setUser } = useUser();

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            { children }
        </UserContext.Provider>
    )
};

export const useUserValue = () => useContext(UserContext);