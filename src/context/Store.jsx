import React, { useState, useEffect } from 'react'
import { GetPetsContext } from './DataProvider'
function Store({ children }) {
    const [pets, setPets] = useState([])
    const apiUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;
    useEffect(() => {
        // fetch('')
        //     .then((res) => {
        //         console.log("res", res.json());
        //         setPets(res.json())
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        const res = fetch(`${apiUrl}/pets`)
        const data = res.json();
        setPets(data)
    }, [])
    return (
        <GetPetsContext.Provider value={[pets, setPets]}>
            {children}
        </GetPetsContext.Provider>
    )
}
export default Store