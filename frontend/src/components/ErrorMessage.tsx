import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../App";

export const ErrorMessage  = () => {

    const pageState = useContext(PageContext)
    const errorMessage = pageState.errorMessage;

    return(
            <div className="error-message" role="error-message">
               <span>{errorMessage}</span>
            </div>
    );

};

