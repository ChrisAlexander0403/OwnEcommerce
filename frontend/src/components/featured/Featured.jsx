import React from 'react';
import { MoreVert } from '@mui/icons-material';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FeaturedStyles } from './FeaturedStyles';
import numeral from 'numeral';

const Featured = () => {
  return (
    <FeaturedStyles>
      <div className="top">
        <h1 className="title">Ganancias totales</h1>
        <MoreVert fontSize='small' />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text="70%" strokeWidth={5} styles={buildStyles({ pathColor: 'rgb(36, 0, 80)', textColor: 'rgb(36, 0, 80)' })} />
        </div>
        <p className="title">Ventas totales hoy</p>
        <p className="amount">{numeral(13000).format("$0,0.00")}</p>
        <p className="description">Transacciones previas en proceso. El último pago puede no estar incluido</p>
        <div className="summary">
          <div className="item">
            <div className="item-title">Esta semana</div>
            <div className="item-result positive">
              <IoIosArrowUp />
              <div className="result-amount">${numeral(5000).format("0 a")}</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Semana pasada</div>
            <div className="item-result positive">
              <IoIosArrowUp />
              <div className="result-amount">${numeral(10000).format("0 a")}</div>
            </div>
          </div>
          <div className="item">
            <div className="item-title">Mes pasado</div>
            <div className="item-result negative">
              <IoIosArrowDown />
              <div className="result-amount">${numeral(15000).format("0 a")}</div>
            </div>
          </div>
        </div>
      </div>
    </FeaturedStyles>
  );
}

export default Featured;