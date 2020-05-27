import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CategoryListTable from './components/CategoryListTable';

const CategoriesList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Categories List</h3>
        <h3 className="page-subhead subhead">Use this page if you want to manage your categories</h3>
      </Col>
    </Row>
    <Row>
      <CategoryListTable />
    </Row>
  </Container>
);

export default CategoriesList;
