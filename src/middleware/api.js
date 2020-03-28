// inspired by https://leanpub.com/redux-book
import axios from "axios";
import {API} from "../actions/types";
import {accessDenied, apiError, apiStart, apiEnd} from "../actions/api";

const apiMiddleware = ({dispatch}) => next => action => {
    next(action);

    if (action.type !== API) return;

    const {
        url,
        method,
        data,
        accessToken,
        onSuccess,
        onFailure,
        label,
        headers
    } = action.payload;
    const dataOrParams = ["GET", "DELETE", "POST"].includes(method) ? "params" : "data";

    // axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["x-api-key"] = "2gYXRJD8wr4GLVG2ggEf1aSvqwAOwetD3fRTNqrt";

    //axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    if (label) {
        dispatch(apiStart(label));
    }

    axios
        .request({
            url,
            method,
            headers,
            [dataOrParams]: data
        })
        .then(({data}) => {
            dispatch(onSuccess(data));
        })
        .catch(error => {
            dispatch(apiError(error));
            dispatch(onFailure(error));

            if (error.response && error.response.status === 403) {
                dispatch(accessDenied(window.location.pathname));
            }
        })
        .finally(() => {
            if (label) {
                dispatch(apiEnd(label));
            }
        });
};

export default apiMiddleware;
