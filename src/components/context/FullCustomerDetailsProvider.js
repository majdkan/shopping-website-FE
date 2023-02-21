import React, { createContext, useState } from "react";

const FullCustomerDetailsContext = createContext({});

export const FullCustomerDetailsProvider = ({ children }) => {
    const [fullCustomerDetails, setFullCustomerDetails] = useState();

    return (
        <FullCustomerDetailsContext.Provider value={{ fullCustomerDetails, setFullCustomerDetails }}>
            {children}
        </FullCustomerDetailsContext.Provider>
    )
}

export default FullCustomerDetailsContext;

