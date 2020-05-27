import {SET_PRODUCT,ADD_PRODUCT} from '../actions/actiontype';

const initialstate = [];
export default function(state = initialstate,action)
{
    switch (action.type) {
        case SET_PRODUCT:
            return action.product;
        case ADD_PRODUCT:
            return [action.product,...state];    
        default:
            return state;

    }
}