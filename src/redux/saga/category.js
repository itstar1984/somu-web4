import * as Api from '../Api';
import {call,put,take} from 'redux-saga/effects';
import * as categoryaction from '../actions/categoryaction';
import * as actiontype from '../actions/actiontype';
export function* getcategory()
{
    const categories = yield call(Api.getcategory);
    yield put(categoryaction.set_category(categories));
}

export function* addcategory()
{
    while(true)
    {
        const category = yield take(actiontype.ADD_CATEGORY);
        const categorylist = yield call(Api.addcategory,category);
        yield put({type:actiontype.ADD_CATEGORY,categorylist});
    }
}