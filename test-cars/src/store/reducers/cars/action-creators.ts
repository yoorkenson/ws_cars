import { ICar } from "../../../models/ICar";
import { AddClassAction, AddColorAction, CarsActionEnum, GetCarAction, SocketCloseAction, SocketErrorAction, SocketInitAction } from "./types";


export const CarsActionCreators = {
    onSocket: (socket: boolean): SocketInitAction => ({type: CarsActionEnum.SOCKET_INIT, payload: socket}),
    onCloseSocket: (socket: boolean): SocketCloseAction => ({type: CarsActionEnum.SOCKET_CLOSE, payload: socket}),
    onError: (error: string): SocketErrorAction => ({type: CarsActionEnum.SET_ERROR, payload: error}),
    onAddCar: (car: ICar): GetCarAction => ({type: CarsActionEnum.GET_CAR, payload: car}),
    onAddClass: (classItem: string): AddClassAction => ({type: CarsActionEnum.ADD_CLASS, payload: classItem}),
    onAddColor: (color: string): AddColorAction => ({type: CarsActionEnum.ADD_COLOR, payload: color}),
}