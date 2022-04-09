import {ICar} from "../../../models/ICar";

export interface CarsState {
    cars: ICar[]
    isSocket: boolean
    error: string
    colorArray: Array<string>
    classArray: Array<string>
}

export enum CarsActionEnum {
    SET_ERROR = "SET_ERROR",
    SOCKET_INIT = "SOCKET_INIT",
    SOCKET_CLOSE = 'SOCKET_CLOSE',
    GET_CAR = 'GET_CAR',
    ADD_COLOR = 'ADD_COLOR',
    ADD_CLASS = 'ADD_CLASS',
    ADD_SPEED = 'ADD_SPEED',
}

export interface SocketErrorAction {
    type: CarsActionEnum.SET_ERROR;
    payload: string;
}

export interface SocketInitAction {
    type: CarsActionEnum.SOCKET_INIT;
    payload: boolean;
}

export interface SocketCloseAction {
    type: CarsActionEnum.SOCKET_CLOSE;
    payload: boolean;
}

export interface GetCarAction {
    type: CarsActionEnum.GET_CAR
    payload: ICar
}

export interface AddColorAction {
    type: CarsActionEnum.ADD_COLOR
    payload: string
}

export interface AddClassAction {
    type: CarsActionEnum.ADD_CLASS
    payload: string
}

export type CarsAction =
    SocketErrorAction |
    SocketInitAction |
    SocketCloseAction |
    GetCarAction |
    AddColorAction |
    AddClassAction