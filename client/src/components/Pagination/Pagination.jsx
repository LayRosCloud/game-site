import React, {useEffect, useState} from 'react';
import PaginationItem from "./PaginationItem/PaginationItem";
import classes from "./Pagination.module.css";
const Pagination = ({totalCount}) => {
    const [elements, setElements] = useState([]);

    useEffect(()=>{
        const numbers = []
        for (let i = 1; i <= totalCount; i++) {
            numbers.push(i)
        }
        setElements(numbers)
    }, [])
    return (
        <div className={classes.container}>
            {elements.map(element =>
                    <PaginationItem key={element} number={element}
                />)}
        </div>
    );
};

export default Pagination;