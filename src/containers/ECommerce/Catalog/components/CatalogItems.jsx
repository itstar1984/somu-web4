import React from 'react';
import { Col } from 'reactstrap';
import ProductItems from '../../../../shared/components/catalog/ProductItems';
import catalogList from './catalog_list';

import * as firebase from 'firebase/app';
import firebaseConfig from '../../../../config/firebase';

const CatalogItems = () =>{
  const [products, setState] = React.useState([])


  React.useEffect(() => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    let dataArray = [], tmp;
    const db = firebase.firestore();
    // const col = db.collection("products");
    // const snap1 = await col.get();
    // const products = snap1.docs.map(x => x.data());
    db.collection("products")
    // .where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tmp = doc.data();
            dataArray.push(
              {
                src: tmp.image && tmp.image.length ? tmp.image[0].src : `${process.env.PUBLIC_URL}/img/for_store/catalog/25.png`,
                title: tmp.title,
                price: tmp.price,
                description:  (<div dangerouslySetInnerHTML={{__html: tmp.body}} />),
                colors: ['#00b3c6', '#50e3c2', '#fa4a86'],
                new: true,
                id: tmp.id
              }
            )
        });
    })
    .then(function() {
      setState(dataArray)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


  }, [])
    return  (<Col md={12} lg={12}>
    <ProductItems items={products} />
  </Col>)
};

export default CatalogItems;
