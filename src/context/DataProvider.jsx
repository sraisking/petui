import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log("inside service call");
            const response = await fetch(`${apiUrl}/pets`);
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setData(result);
            } else {
                setError(result.message || 'An error occurred');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DataContext.Provider value={{ data, loading, error, fetchData }}>
            {children}
        </DataContext.Provider>
    );
};