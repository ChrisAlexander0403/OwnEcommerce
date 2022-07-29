import numeral from 'numeral';
import React from 'react';
import { TableStyles } from './TableStyles';

const Table = () => {

    const rows = [
        {
          id: 1143155,
          product: "Acer Nitro 5",
          img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "John Smith",
          date: "1 March",
          amount: 785,
          method: "Cash on Delivery",
          status: "Approved",
        },
        {
          id: 2235235,
          product: "Playstation 5",
          img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
          customer: "Michael Doe",
          date: "1 March",
          amount: 900,
          method: "Online Payment",
          status: "Pending",
        },
        {
          id: 2342353,
          product: "Redragon S101",
          img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "John Smith",
          date: "1 March",
          amount: 35,
          method: "Cash on Delivery",
          status: "Pending",
        },
        {
          id: 2357741,
          product: "Razer Blade 15",
          img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "Jane Smith",
          date: "1 March",
          amount: 920,
          method: "Online",
          status: "Approved",
        },
        {
          id: 2342355,
          product: "ASUS ROG Strix",
          img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "Harold Carol",
          date: "1 March",
          amount: 2000,
          method: "Online",
          status: "Pending",
        },
    ];

    return (
        <TableStyles>
            <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Método de pago</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        return (
                            <tr key={index}>
                                <td>{row.id}</td>
                                <td>{row.product}</td>
                                <td>{row.customer}</td>
                                <td>{row.date}</td>
                                <td>{numeral(row.amount).format("$0,0.00")}</td>
                                <td>{row.method}</td>
                                <td><span className={row.status.toLowerCase()}>{row.status}</span></td>
                            </tr>
                    );
                    })}
                </tbody>
            </table>
        </TableStyles>
    );    
}

export default Table;