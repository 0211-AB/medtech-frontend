import React, { useState, useCallback, useEffect } from "react";
import { verifyTokenAndGetDetails } from "../services/authService";
const AuthContext = React.createContext({
    token: "",
    isAdmin: false,
    isSuperAdmin: false,
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN);
    return {
        token: storedToken,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [isAdmin, setisAdmin] = useState(false)
    const [isSuperAdmin, setisSuperAdmin] = useState(false)
    const [user, setUser] = useState(null)

    const userIsLoggedIn = !!token;

    useEffect(() => {
        if (userIsLoggedIn && user === null) {
            const getData = async () => {
                try {
                    const res = await verifyTokenAndGetDetails();
                    setisAdmin(res.user.role === "Admin")
                    setisSuperAdmin(res.user.role === "SuperAdmin")
                    setUser({ name: res.user?.name, email: res.user?.email, organization: res.user?.organization })

                    if (res.user.hasResetPassword === false)
                        throw new Error("Password Reset Error")

                }
                catch (e) {
                    logoutHandler()
                }
            }

            getData()
        }
        else
            return;
        // eslint-disable-next-line
    }, [user])

    const logoutHandler = useCallback(() => {
        setToken(null);
        setisAdmin(false)
        setisSuperAdmin(false)
        setUser(null)
        localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN);
    }, []);

    const loginHandler = (token, isAdmin, isSuperAdmin, user) => {
        setToken(token);
        setisAdmin(isAdmin)
        setisSuperAdmin(isSuperAdmin)
        setUser(user)
        localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN, token);
    };

    const contextValue = {
        isAdmin: isAdmin,
        isSuperAdmin: isSuperAdmin,
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        user: user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;