import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BrandEditCard from './components/CategoryEditCard';
import {withRouter} from 'react-router';
function CategoryEdit(props)
{
  return  (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Category Edit</h3>
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

export default withRouter(CategoryEdit);