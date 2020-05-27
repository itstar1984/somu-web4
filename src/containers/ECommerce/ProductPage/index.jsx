import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProductCard from './components/ProductCard';
import RelatedItems from './components/RelatedItems';
import * as firebase from 'firebase/app';
import firebaseConfig from '../../../config/firebase';
import { withRouter } from 'react-router';


const ProductPage = ({match}) => {
  console.log('props',match);
  const [product, setProduct] = React.useState([])

  React.useEffect(() => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    let dataArray = [], tmp;
    const db = firebase.firestore();
    // const col = db.collection("products");
    // const snap1 = await col.get();
    // const products = snap1.docs.map(x => x.data());
    const { params } = match;
    if( params && params.id )
    db.collection("products")
    // .where("capital", "==", true)
    .where('id','==',params.id)
    .get()
    .then(function(querySnapshot) {
        // console.log('querySnapshot',querySnapshot.data());
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tmp = doc.data();
            console.log('tmp',tmp);
            dataArray.push(tmp);
        });
        // return {}
    })
    .then(function() {
      console.log('dataArray', dataArray);
      if( dataArray && dataArray.length )
      setProduct( dataArray[0] )
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
  }, [])

  return (<Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Product Page</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <ProductCard product={product} />
    </Row>
    <Row>
      <Col md={12}>
        <h3 className="page-title page-title--not-last">Related Items</h3>
      </Col>
    </Row>
    <Row>
      <RelatedItems />
    </Row>
  </Container>
);
}

export default withRouter(ProductPage);
