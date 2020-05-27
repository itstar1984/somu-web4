import * as actiontype from './actiontype';

export function set_category(categories)
{
    return {
        type:actiontype.SET_CATEGORY,
        categories:categories
    }
}

export function add_category(category)
{
    return {
        type:actiontype.ADD_CATEGORY,
        category:category
    }
}