import { useEffect, useState } from 'react';

import { Back, Forward, Index, ProductsContainer } from './ProductsStyles';
import Product from '../product/Product';

const Products = ({ Data }) => {
    const [pages, setPages] = useState();
    const [index, setIndex] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPages(Math.ceil(Data.length/12));
        setData(Data.slice(0, 12));
        for(let i = 0; i < pages; i++){
            setIndex(index => [...index, <Index className="index" onClick={() => setPage(i)}>{i+1}</Index>]);
        }
    }, [pages, Data]);

    useEffect(() => {
        setData(Data.slice(12*page, 12*page + 12))
    }, [page, Data]);

    return (
        <ProductsContainer>
            <div className="options">
                {
                    page > 0 && 
                        <Index onClick={() => setPage(page-1)}>
                            <Back />
                        </Index>
                }
                {index}
                {
                    page < pages-1 &&
                    <Index onClick={() => setPage(page+1)}>
                    <Forward />
                    </Index>
                }
            </div>
            <div className="content">
                {data.map((data, index) => {
                    return(
                        <Product data={data} key={index} />
                    );
                })}
            </div>
            <div className="options">
                {
                    page > 0 && 
                        <Index onClick={() => setPage(page-1)}>
                            <Back />
                        </Index>
                }
                {index}
                {
                    page < pages-1 &&
                    <Index onClick={() => setPage(page+1)}>
                    <Forward />
                    </Index>
                }
            </div>
        </ProductsContainer>
    );
}

export default Products;