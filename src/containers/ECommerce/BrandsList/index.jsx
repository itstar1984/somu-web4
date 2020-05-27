import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BrandListTable from './components/BrandListTable';

const BrandsList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Brands List</h3>
        <h3 className="page-subhead subhead">Use this page if you want to manage your brands</h3>
      </Col>
    </Row>
    <Row>
      <BrandListTable />
    </Row>
  </Container>
);

export default BrandsList;
