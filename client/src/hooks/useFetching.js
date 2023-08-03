import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]= useState('')
    const fetching = async () => {
        setIsLoading(true);
        try{
            await callback();
        }catch (e){
            setError(e.getMessage())
        }
        setIsLoading(false);
    }
    return [isLoading, fetching, error]
}