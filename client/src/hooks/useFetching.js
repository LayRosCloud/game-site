import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]= useState('')
    const fetching = async () => {
        setIsLoading(false);
        try{
            await callback();
        }catch (e){
            setError(e.getMessage())
        }
        setIsLoading(true);
    }
    return [isLoading, fetching, error]
}