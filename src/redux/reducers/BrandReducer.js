import * as actiontype from '../actions/actiontype';

const initialstate = [];
export default function(state = initialstate,action)
{
    switch (action.type) {
        case actiontype.SET_BRAND:
            return action.brands;
        case actiontype.ADD_BRAND:
            return [action.brand,...state]
        case actiontype.DELETE_BRAND:
            const copy = [...state];
            for(let item in copy)
            {
                if(copy[item].id == action.id)
                {
                    copy.splice(item,1);
                    break;
                }
            }
            return copy;
            
        case actiontype.UPDATE_BRAND:
            const copybrand = [...state];
            for(let item in copybrand)
            {
                if(copybrand[item].id == action.id)
                {
                    copybrand[item] = action.brand;
                    break;
                }
            }

            return copybrand;
        default:
            return state;
    }
}