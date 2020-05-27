import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import ProductEditForm from './ProductEditForm';
import * as productaction from '../../../../redux/actions/productAction';


function PaymentCard(dispatch,history){ 
  return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Main Information</h5>
            </div>
            <ProductEditForm productinfo = {{}} onSubmit={(data)=>{dispatch(productaction.add_product(data)); history.push('/ackoo/dashboards/products_list')}} />
          </CardBody>
        </Card>
      </Col>
    );
  }

export default PaymentCard;
