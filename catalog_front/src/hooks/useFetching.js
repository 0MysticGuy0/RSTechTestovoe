import { useState } from "react";

export function useFetching( callback ){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetching(){
        try{
            setIsLoading(true)
            setError('')
            await callback()
        }catch(e){
            setError(e.message)
        }finally{
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}