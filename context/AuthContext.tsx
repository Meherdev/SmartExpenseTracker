import React, { createContext, useEffect, useState } from "react";

type User = {
    name: string,
    id: string,
}

type Auth = {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<Auth>({user: null, setUser: () => {}});

export function AuthProvider ({children}: {children: JSX.Element}) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {

    }, []);

    return (<AuthContext.Provider value={{user, setUser}}>
            {children}
            </AuthContext.Provider>
        );
}   