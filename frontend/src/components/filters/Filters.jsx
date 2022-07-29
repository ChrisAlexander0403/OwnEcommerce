import React, { useEffect, useRef, useState } from 'react';
import { Container, Plus } from './FiltersStyles';

const Filters = ({ category, filters }) => {
    
    const [optionsHeight, setOptionsHeight] = useState(0);
    const [collapsible, setCollapsible] = useState(true);
    const [height, setHeight] = useState('auto');

    const options = useRef(null);
    
    const toggle = () => {
        setCollapsible(!collapsible);
        setHeight(collapsible ? "0" : `${optionsHeight}px`);
    }

    useEffect(() => {
        setOptionsHeight(options.current.clientHeight);
    }, []);

    return (
        <Container>
            <div className="filter-container">
                <div className="filter" onClick={toggle}>
                    <p>{category}</p>
                    <Plus />
                </div>
                <div className="options" style={{ height: `${height}`}} ref={options}>
                    {filters.map((filter, index) => {
                        return(
                            <Filter filter={filter} key={index}/>
                        );
                    })}                    
                </div>
            </div>
        </Container>
    );
}

const Filter = ({ filter }) => {

    const [isActive, setIsActive] = useState(false);

    return(
        <div className={`option ${isActive ? "active" : ""}`} onClick={() => setIsActive(!isActive)}>{filter}</div>
    )
}

export default Filters;
