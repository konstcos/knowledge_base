import initialState from "../contstants/initialState";
import * as types from "../contstants/types";

export function loading(state = initialState.loading, action) {

    switch (action.type) {
        case types.app.LOADING:
            return true;
        case types.app.LOADED:
            return false;
        default:
            return state;
    }
}