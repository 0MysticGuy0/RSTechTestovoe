import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { AuthContext } from "../context/context";

function AppRouter(){
    const {isAuth} = useContext(AuthContext)

    return (
        <Routes className='App'>
            {
                (isAuth ? privateRoutes : publicRoutes)
                .map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component }
                        exact={route.exact}
                    />
                ))
            }
          </Routes>
    )
}

export default AppRouter;