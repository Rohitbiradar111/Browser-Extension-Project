import { createContext, useContext, useReducer } from "react";
import { BrowserReducer } from "../reducer/browser-reducer";

const initialValue = {
    name: "",
    time: "",
    message: "",
    task: null
}

const BrowserContext = createContext(initialValue);

const BrowserProvider = ({ children }) => {

    const [{ name, time, message, task }, browserDispatch] = useReducer(BrowserReducer, initialValue);

    return (
        <BrowserContext.Provider value={{ name, time, message, task, browserDispatch }}>
            {children}
        </BrowserContext.Provider>
    )
}

const usebrowser = () => useContext(BrowserContext);

export { BrowserProvider, usebrowser };