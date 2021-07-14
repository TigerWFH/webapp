const prefix='SINGLE/';

export enum API_STATUS {
    INITIAL = 0,
    SUCCESS = 1,
    FAILURE = 2
}

export const RENDER_UI = Symbol(`${prefix}RENDER_UI`);
export const RENDER_UI_SUCCESS = Symbol(`${prefix}RENDER_UI_SUCCESS`);
export const RENDER_UI_FAILURE = Symbol(`${prefix}RENDER_UI_FAILURE`);

export const GET_CARD = Symbol(`${prefix}GET_CARD`);
export const GET_CARD_SUCCESS = Symbol(`${prefix}GET_CARD_SUCCESS`);
export const GET_CARD_FAILURE = Symbol(`${prefix}GET_CARD_FAILURE`);
export const GET_CARD2 = Symbol(`${prefix}GET_CARD2`);
export const GET_CARD_SUCCESS2 = Symbol(`${prefix}GET_CARD_SUCCESS2`);
export const GET_CARD_FAILURE2 = Symbol(`${prefix}GET_CARD_FAILURE2`);