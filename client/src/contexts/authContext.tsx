import * as React from 'react';
import { Dispatch } from 'react';
import { useAuth } from '../hooks';
import { AuthToken } from '../interfaces';

const { createContext, useContext } = React;

interface AuthContextValue {
    authUser: AuthToken,
    setAuthUser: Dispatch<React.SetStateAction<AuthToken>> | undefined
}

export const AuthContext = createContext<AuthContextValue>({
    authUser: new AuthToken(null, null),
    setAuthUser: undefined
});
 
export const AuthContextProvider: React.FC = ({ children }) => {
    const { authUser, setAuthUser } = useAuth();

    return (
        <AuthContext.Provider value={{
            authUser,
            setAuthUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthValue = () => useContext(AuthContext);