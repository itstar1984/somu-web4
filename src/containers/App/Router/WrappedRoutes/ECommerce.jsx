import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Cart from '../../../ECommerce/Cart/index';
import OrdersList from '../../../ECommerce/OrdersList/index';
import NewCampaign from '../../../ECommerce/NewCampaign/index';
import Payment from '../../../ECommerce/Payment/index';
import ProductEdit from '../../../ECommerce/ProductEdit/index';
import ProductsList from '../../../ECommerce/ProductsList/index';
import Catalog from '../../../ECommerce/Catalog/index';
import ProductPage from '../../../ECommerce/ProductPage/index';
import CategoryList from '../../../ECommerce/CategoryList/index';
import CategoryEdit from '../../../ECommerce/CategoryEdit/index';
import BrandsList from '../../../ECommerce/BrandsList/index';
import BrandEdit from '../../../ECommerce/EditBrand/index';

export default () => (
  <Switch>
    <Route path="/dashboard/cart" component={Cart} />
    <Route path="/dashboard/catalog" component={Catalog} />
    <Route exact path="/dashboard/campaigns" component={OrdersList} />
    <Route exact path="/dashboard/campaigns/new" component={NewCampaign} />
    <Route path="/dashboard/payment" component={Payment} />
    <Route path="/dashboard/product_edit" component={ProductEdit} />
    <Route path="/dashboard/product_page/:id" component={ProductPage} />
    <Route path="/dashboard/products_list" component={ProductsList} />
    <Route path="/dashboard/categories_list" component={CategoryList}></Route>
    <Route path="/dashboard/categories_edit" component={CategoryEdit}></Route>
    <Route path="/dashboard/brands_list" component={BrandsList}></Route>
    <Route path="/dashboard/brands_edit/:id" component={BrandEdit}></Route>
    <Route path="/dashboard/brands_edit/" component={BrandEdit}></Route>
    
  </Switch>
);
