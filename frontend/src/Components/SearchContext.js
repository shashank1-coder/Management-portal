// SearchContext.js
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]); // Store your data here

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // You can add more functionality here if needed

    return (
        <SearchContext.Provider value={{ searchQuery, handleSearch, data, setData }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
