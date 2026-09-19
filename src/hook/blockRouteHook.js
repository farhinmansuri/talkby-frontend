import { useBlocker } from "react-router-dom"

export const useBlockRouting=(isLoading)=>{
    const blocker =useBlocker(isLoading)
    return blocker;
}