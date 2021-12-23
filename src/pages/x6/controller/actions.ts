import { bindActionCreators } from "redux";
import store from "../../../store";
import * as t from "./types";

const MOCK_DATA = [];

const getData = function () {
  return {
    type: t.GET_LOG,
  };
};

const getDataSuccess = function (data: any) {
  return {
    type: t.GET_LOG_SUCCESS,
    payload: data,
  };
};

const requestData = function () {
  return (dispatch: any, getState: any) => {
    setTimeout(function () {
      dispatch(getDataSuccess({}));
    });
  };
};

export default bindActionCreators(
  {
    requestData,
  },
  store.dispatch
);
