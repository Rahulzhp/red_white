import React, { useState } from 'react'
import "../Styles/searchbar.css"

const Searchbar = ({ handleSearch, handleSort }) => {
    const [search, setSearch] = useState('');
    handleSearch(search)
    const handleSortChange = (event) => {
        const sortValue = event.target.value;
        handleSort(sortValue);
    };

    return (
        <div className='main'>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="sort-bar">
                <label htmlFor="sort-select">Sort By:</label>
                <select id="sort-select" onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="price-low">Price Low to High</option>
                    <option value="price-high">Price High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default Searchbar