import React from 'react';

const SearchEngine = ({value, setValue, foundedList}) => {
    return (
        <div>
            <input
                placeholder='Поиск...'
                value={value}
                onChange={(e) => setValue(e.target.value)}/>
        </div>
    );
};

export default SearchEngine;