import * as actiontype from '../actions/actiontype';

const initialstate = [];
export default function(state = initialstate,action)
{
    switch (action.type) {
        case actiontype.SET_CATEGORY:
            return action.categories;
        case actiontype.ADD_CATEGORY:
            return [action.category,...state]
    
        default:
            return state;
    }
}