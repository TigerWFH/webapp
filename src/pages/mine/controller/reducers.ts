/* eslint-disable import/no-anonymous-default-export */
import { AnyAction } from 'redux';
import * as t from './types';

const MOCK_ORDER_STATUS = {
  WAITING_PAY: 2,
  DELIVERED: 6,
  REFUNDED: 6
};
export interface IMineState {
  [propName: string]: any;
}

export const initialState: IMineState = {
  portrait: undefined,
  name: undefined,
  orderStatus: MOCK_ORDER_STATUS
};
export default (state: any = initialState, action: AnyAction) => {
  const {
    type
    // payload
  } = action;
  switch (type) {
    case t.GET_USER_INFO_SUCCESS: {
      return {
        ...state
      };
    }
    case t.GET_USER_INFO_FAILURE: {
      return state;
    }
    case t.GET_ORDER_INFO_SUCCESS: {
      return state;
    }
    case t.GET_ORDER_INFO_FAILURE: {
      return state;
    }
    default:
      return state;
  }
};
