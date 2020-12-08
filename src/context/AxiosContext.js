import React, {useState} from "react";
import * as axios from "axios";

let AxiosContext = React.createContext();

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

function AxiosProvider({ children }) {
  var [state, setstate] = useState({requester : instance})

  return (
    <AxiosContext.Provider value={state}>
        {children}
    </AxiosContext.Provider>
  );
}
function useAxiosState() {
    var context = React.useContext(AxiosContext);
    if (context === undefined) {
        throw new Error("useAxiosState must be used within a AxiosProvider");
    }
    return context.requester;
}

export { AxiosProvider, useAxiosState  };

