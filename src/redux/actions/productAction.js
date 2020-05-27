import * as actiontype from './actiontype';

export function set_product(product)
{
    return {
        type:actiontype.SET_PRODUCT,
        product:product
    }
}

export function add_product(product)
{
    return {
        action:actiontype.ADD_PRODUCT,
        product:product
    }
}