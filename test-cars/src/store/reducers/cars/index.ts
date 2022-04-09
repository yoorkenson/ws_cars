import { ICar } from "../../../models/ICar";
import { CarsAction, CarsActionEnum, CarsState } from "./types";

const initialState: CarsState = {
    cars: [] as ICar[],
    error: '',
    isSocket: false,
    colorArray: [],
    classArray: []
}

export default function carsReducer(state = initialState, action: CarsAction): CarsState {
    switch (action.type) {
        case CarsActionEnum.SOCKET_INIT:
            return {...state, isSocket: action.payload}
        case CarsActionEnum.SOCKET_CLOSE:
            return {...state, isSocket: action.payload}
        case CarsActionEnum.GET_CAR:
            return {...state, cars: [...state.cars, action.payload]}
        case CarsActionEnum.SET_ERROR:
            return {...state, error: action.payload}
        case CarsActionEnum.ADD_CLASS:
            const newClassArr =   [...state.classArray];
            if(!state.classArray.includes(action.payload)) {
                newClassArr.push(action.payload)
            }
            return {...state, 
                classArray: 
                [...newClassArr]
            }
        case CarsActionEnum.ADD_COLOR:
            const newColorArr =   [...state.colorArray];
            if(!state.colorArray.includes(action.payload)) {
                newColorArr.push(action.payload)
            }
            return {...state, 
                colorArray: 
                [...newColorArr]
            }
        default:
            return state;
    }
}