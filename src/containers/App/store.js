import { combineReducers, createStore,applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import createActionBuffer from 'redux-action-buffer';
import {
  cryptoTableReducer,
  newOrderTableReducer,
  sidebarReducer,
  themeReducer,
  customizerReducer,
  todoReducer,
  rtlReducer,
  authReducer,
  productReducer,
  categoryReducer,
  brandReducer
} from '../../redux/reducers/index';

import * as ProductSaga from '../../redux/saga/product';
import * as CategorySaga from '../../redux/saga/category'; 
import * as BrandSaga from '../../redux/saga/brand';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  rtl: rtlReducer,
  sidebar: sidebarReducer,
  cryptoTable: cryptoTableReducer,
  newOrder: newOrderTableReducer,
  customizer: customizerReducer,
  todos: todoReducer,
  user: authReducer,
  product:productReducer,
  categories:categoryReducer,
  brands:brandReducer
});

const sagamiddleware = createSagaMiddleware();

const store = createStore(reducer,applyMiddleware(sagamiddleware));


export default {
  ...store,
  runSaga:[
    sagamiddleware.run(ProductSaga.getProductList),
    sagamiddleware.run(BrandSaga.getbrands),
    sagamiddleware.run(CategorySaga.getcategory),
    sagamiddleware.run(ProductSaga.addproduct),
    sagamiddleware.run(CategorySaga.addcategory),
    sagamiddleware.run(BrandSaga.addbrand),
    sagamiddleware.run(BrandSaga.deletebrand),
    sagamiddleware.run(BrandSaga.updatebrand)    
  ]
};
