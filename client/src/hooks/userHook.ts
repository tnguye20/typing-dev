import { useState, useEffect } from 'react';
import { User } from '../interfaces';
import { UserDao } from '../daos';
import { useAuthValue } from '../contexts';

const useUser = () => {
    const [user, setUser] = useState<User>();
    const { authUser } = useAuthValue();

    useEffect(() => {
        const { userRef }  = new UserDao(authUser!.uid!);
        if (userRef) {
            const unsubscribe = userRef.onSnapshot((u) => {
                if (u.exists) {
                    const data = u.data() as User;
                    data.uid = u.id;
                    setUser(data);
                }
            });
            return () => unsubscribe();
        }
    }, [authUser]);

    return {
        setUser,
        user
    };
};

export default useUser;