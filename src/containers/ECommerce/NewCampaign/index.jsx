import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import VerticalForm from './components/VerticalForm';
import HorizontalForm from './components/HorizontalForm';

const NewCampaign = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Create New Campaign</h3>
        <h3 className="page-subhead subhead">You can add here new offers for your existed products</h3>
      </Col>
    </Row>
    <Row>
      <VerticalForm onSubmit={console.log} />
    </Row>
  </Container>
);

export default NewCampaign;
