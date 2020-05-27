import * as Api from '../Api';
import {call,put,take} from 'redux-saga/effects';
import * as productaction from '../actions/productAction';
import * as actiontype from '../actions/actiontype';

export function* getProductList()
{
    const products = yield call(Api.productlist);
    yield put(productaction.set_product(products));
}

export function* addproduct()
{
    while(true)
    {
        const product = yield take(actiontype.ADD_PRODUCT);
        const productlist = yield call(Api.addproduct,product);
        yield put({type:actiontype.ADD_PRODUCT,productlist});
    }
}