import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ICar } from '../models/ICar';
import { CarsActionCreators } from '../store/reducers/cars/action-creators';
import CarsItem from './CarsItem';

const CarsList: FC = () => {

    const {colorArray, classArray, cars, isSocket} = useTypedSelector(state => state.cars);
    const dispatch = useDispatch()

    const socket = useRef<WebSocket>()

    function connect() {
        socket.current = new WebSocket('ws://localhost:5001')

        socket.current.onopen = () => {
            dispatch(CarsActionCreators.onSocket(true))
        }
        socket.current.onmessage = (event) => {
            const message: ICar = JSON.parse(event.data)
            dispatch(CarsActionCreators.onAddCar(message))
            dispatch(CarsActionCreators.onAddClass(message.carClass))
            dispatch(CarsActionCreators.onAddColor(message.color))
        }
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
            dispatch(CarsActionCreators.onError('Socket произошла ошибка'))
        }
    }
    
    const closeSocket = () => {
        socket.current?.close()
        dispatch(CarsActionCreators.onCloseSocket(false))
    }

    const [selectedClass, setSelectedClass] = useState<Array<string>>([])
    const [selectedColors, setSelectedColors] = useState<Array<string>>([])
    const [selectedSpeed, setSelectedSpeed] = useState({speed: 0, moreLess: 'more'})

    const [table, setTable] = useState(true)

    const [filteredArray, setFilteredArray] =useState<Array<ICar>>([])


    const setFilter = (carsArray: Array<ICar>) => {
        let result = [];
        const filterCars = carsArray.filter(car => 
            (selectedClass.length !==0 ? selectedClass.includes(car.carClass) : classArray.includes(car.carClass)) &&
            (selectedColors.length !==0 ? selectedColors.includes(car.color) : colorArray.includes(car.color))
        )                    
        if (selectedSpeed.moreLess === 'more') {
            result = filterCars.filter(elem =>  
                elem.speed >= selectedSpeed.speed
            )
        } else {
            result =  filterCars.filter(elem => 
             elem.speed <= selectedSpeed.speed
          )
        }
        setFilteredArray(result)
    }
    

    
    useEffect(() => {
        setFilter(cars)
    }, [cars])

    return (
        <div className="container">
            <h1>{!isSocket ? 'не подключено' :'подключено'}</h1>
            {!isSocket
            ?
                <button className='button' onClick={connect}>Открыть соединение</button>
            :
                <button className='button' onClick={closeSocket}>Закрыть соединение</button>
            }
            <div className='options'>
            <div>
                <h2>class</h2>
                <div className="filter__item">
                    {classArray.map((item, index) => {
                        return(
                            <>
                                <label key={index} htmlFor={item} >
                                    <input type='checkbox' id={item} name={item} value={item} 
                                        onChange={event => {
                                            const isChecked = event.target.checked
                                            if (isChecked) {
                                                setSelectedClass([...selectedClass, event.target.value])
                                            }
                                            else 
                                            {
                                                const index = selectedClass.indexOf(event.target.value)
                                                let newArr = selectedClass
                                                newArr.splice(index, 1)
                                                setSelectedClass(newArr)
                                            }
                                        }}
                                    />
                                    <span>{item}</span>
                                </label>
                            </>
                        )
                    })}
                </div>
            </div>
            <div>
                <h2>color</h2>
                <div className="filter__item">
                    {colorArray.map((item, index) => {
                        return(
                            <>
                                <label key={index} htmlFor={item}>
                                    <input type='checkbox' id={item} name={item} value={item}
                                        onChange={event => {
                                            const isChecked = event.target.checked
                                            if (isChecked) {
                                                setSelectedColors([...selectedColors, event.target.value])
                                            } else {
                                                const index = selectedColors.indexOf(event.target.value)
                                                let newArr = selectedColors
                                                newArr.splice(index, 1)
                                                setSelectedColors(newArr)
                                            }
                                        }}
                                    />
                                    <span>{item}</span>
                                </label>
                            </>
                        )
                    })}
                </div>
            </div>
            <h2>speed</h2>
            <div>
                <input className='filter' placeholder='0' type="tel" value={selectedSpeed.speed}
                    onChange={e => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === '' || re.test(e.target.value)) {
                            setSelectedSpeed({...selectedSpeed, speed: +e.target.value})
                            }
                        }    
                    }
                />
                <select className='filter' name="carSpeed" id="carSpeed"
                    onChange={e => setSelectedSpeed({...selectedSpeed, moreLess: e.target.value})}
                >
                    <option value='more'>
                        больше
                    </option>
                    <option value='less'>
                        меньше
                    </option>
                </select>
            </div>
            <button onClick={() => {
                setFilter(cars)
                setTable(false)
            }}>
                FILTER
                </button>
            <button onClick={() => setTable(true)}>
                SEE ALL
            </button>
            </div>
            <div className="cars__wrapper">
                <div className="cars__wrapper__header">
                    <div className="cars__item__field__header">
                        ID
                    </div>
                    <div className="cars__item__field__header">
                        Plate
                    </div>
                    <div className="cars__item__field__header">
                        Color
                    </div>
                    <div className="cars__item__field__header">
                        Class
                    </div>
                    <div className="cars__item__field__header">
                        Speed
                    </div>
                    <div className="cars__item__field__header">
                        Timestamp
                    </div>
                </div>
                <div className="cars__list">
                    {table && cars.map((car, index) => {
                        return(
                            <CarsItem key={index} car={car}/>
                        )
                    })}
                    {!table && filteredArray.map((car, index) => {
                        return(
                            <CarsItem key={index} car={car}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default CarsList;