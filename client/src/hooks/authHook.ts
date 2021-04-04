import { useState, useEffect } from 'react';
import { auth } from '../libs';
import { AuthToken } from '../interfaces';

const useAuth = () => {
    const uid = localStorage.getItem('uid');
    const idToken = localStorage.getItem('idToken');

    const authToken = new AuthToken(uid, idToken);
    const [authUser, setAuthUser] = useState<AuthToken>(authToken);

    const setAuth = (uid: string, idToken: string) => {
        const _authUser = new AuthToken(idToken, uid);
        localStorage.setItem('uid', uid);
        localStorage.setItem('idToken', idToken);

        _authUser.uid = uid;
        _authUser.idToken = idToken;
        setAuthUser(_authUser);
    }
    
    useEffect(() => {
        console.log('me cally');
        const loadToken = async () => {
            if (auth.currentUser) {
                const idToken = await auth.currentUser.getIdToken(true);
                const uid = auth.currentUser.uid;
                setAuth(uid, idToken);
            }
        }
        loadToken();

        const unsubscribed = auth.onAuthStateChanged(async (user) => {
           if(user) {
               const idToken = await user.getIdToken();
               if (idToken !== authUser.idToken) {
                setAuth(user.uid, idToken);
               }
           }
        });

        return () => unsubscribed();
    }, [authUser.idToken]);
    
    return {
        authUser,
        setAuthUser
    };
};

export default useAuth;