import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import OrdersListTable from './components/OrdersListTable';

const OrdersList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Campaigns List</h3>
        <h3 className="page-subhead subhead">Use this page manage your Campaigns</h3>
      </Col>
    </Row>
    <Row>
      <OrdersListTable />
    </Row>
  </Container>
);

export default OrdersList;
