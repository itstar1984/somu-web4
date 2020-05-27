import * as Api from '../Api';
import {call,put,take,actionChannel} from 'redux-saga/effects';
import * as brandaction from '../actions/brandaction';
import * as actiontype from '../actions/actiontype';

export function* getbrands()
{
    const brands = yield call(Api.getbrand);
    yield put(brandaction.set_brands(brands));
}

export function* addbrand()
{
    while(true)
    {
        const brand = yield take(actiontype.ADD_BRAND_ITEM);
        const brandlist = yield call(Api.addbrand,brand);
        if(brandlist)
        {
            yield put(brandaction.add_brand(brandlist));
        }
    }
}

export function* deletebrand()
{
    while(true)
    {
        const id = yield take(actiontype.DELETE_BRAND_ITEM);
        const deleted = yield call(Api.deletebrand,id);
        if(deleted)
        {
            yield put(brandaction.delete_brand(id));
        }
    }
}

export function* updatebrand()
{
    while(true)
    {
        const data = yield take(actiontype.UPDATE_BRAND_ITEM);
        const updated = yield call(Api.updatebrand,data);
        if(updated)
        {
            yield put(brandaction.update_brand(updated));
        }
    }
}