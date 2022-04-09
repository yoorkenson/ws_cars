import React, { FC, ReactNode } from 'react';
import { ICar } from '../models/ICar';

interface CarsItemProps {
    car: ICar,
    children?: ReactNode
}

const CarsItem: FC <CarsItemProps> = ({car}: CarsItemProps & { children?: ReactNode }) => {
    return (
        <div className='cars__item'>
            <div className="cars__item__field">
                {car.id}
            </div>
            <div className="cars__item__field">
                {car.plate}
            </div>
            <div className="cars__item__field">
                {car.color}
            </div>
            <div className="cars__item__field">
                {car.carClass}
            </div>
            <div className="cars__item__field">
                {car.speed}
            </div>
            <div className="cars__item__field">
                {car.timestamp}
            </div>
        </div>
    );
};

export default CarsItem;