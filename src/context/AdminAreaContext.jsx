import React, { createContext, useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export const AdminAreaContext = createContext();

const AdminAreaProvider = props => {
    const currentUser = useContext(AuthenticationContext);

    return (
        <>
          <AdminAreaContext.Provider>
            {currentUser.user.role.includes("admin") ? props.children : null}
          </AdminAreaContext.Provider>
        </>
      );
}

export default AdminAreaProvider;