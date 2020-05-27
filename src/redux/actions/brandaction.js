import * as actiontype from './actiontype';

export function set_brands(brands)
{
    return {
        type:actiontype.SET_BRAND,
        brands:brands
    }
}

export function add_brand(brand)
{
    return {
        type:actiontype.ADD_BRAND,
        brand:brand
    }
}

export function delete_brand(id)
{
    return {
        type:actiontype.DELETE_BRAND,
        id
    }
}

export function update_brand({brand,id})
{
    return {
        type:actiontype.UPDATE_BRAND,
        brand,
        id
    }
}