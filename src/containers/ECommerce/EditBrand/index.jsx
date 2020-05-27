import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BrandEditCard from './components/BrandEditCard';
import {withRouter} from 'react-router';
function BrandEdit(props)
{
  return  (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Brands Edit</h3>
          <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                information
          </h3>
        </Col>
      </Row>
      <Row>
        <BrandEditCard {...props}/>
      </Row>
    </Container>
  );
}



export default withRouter(BrandEdit);