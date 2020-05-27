/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import {
  ButtonToolbar, Card, CardBody, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import firebaseConfig from '../../../../config/firebase';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import EditTable from '../../../../shared/components/table/EditableTable';
import {connect} from 'react-redux';
// const firebase = require("firebase");
require("firebase/firestore");


const Img1 = `${process.env.PUBLIC_URL}/img/for_store/vase.png`;
const Img2 = `${process.env.PUBLIC_URL}/img/for_store/vase_2.png`;
const Img3 = `${process.env.PUBLIC_URL}/img/for_store/vase_3.png`;
const Img4 = `${process.env.PUBLIC_URL}/img/for_store/fur.png`;
const Img5 = `${process.env.PUBLIC_URL}/img/for_store/pillow.png`;
const Img6 = `${process.env.PUBLIC_URL}/img/for_store/pillow_2.png`;
const Img7 = `${process.env.PUBLIC_URL}/img/for_store/pillow_dog.png`;

const PhotoFormatter = ({ value }) => (
  <div className="products-list__img-wrap">
    <img src={value && value.length ? value[0].src : Img1 } alt="" />
  </div>
);

PhotoFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};



const StatusFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span>
    : <span className="badge badge-disabled">Disabled</span>
);

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

 class ProductsListTable extends PureComponent {
  constructor() {
    super();
    // this.heads =
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      rows: this.createRows(17),
      pageOfItems: [],
      companies: [],
      db: firebase.firestore()
    };
  }

 

  getCol = async (key) => {
    const { db } = this.state
    var col = db.collection(key);
    const snap1 = await col.get();
    return snap1.docs.map(x => x.data());
  }

 

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  findItem = ( value, data ) => {
    console.log(data);
    
    if(data){
      const found = data.find(x => x.id === value)
      return found ? found.title : value
    }
    else return value
  }

  get heads(){
    const {categories,brands} = this.props;
    return [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        sortable: true,
      },
      {
        key: 'image',
        name: 'Image',
        formatter: PhotoFormatter,
      },
      {
        key: 'title',
        name: 'Title',
        sortable: true,
      },
      {
        key: 'categoryId',
        name: 'Category',
        sortable: true,
        formatter: ({ value })  => this.findItem(value,categories)
      },
      // {
      //   key: 'companyId',
      //   name: 'Company',
      //   sortable: true,
      //   formatter: ({ value })  => this.findItem(value,'companies')
      // },
      {
        key: 'brandId',
        name: 'Brand',
        sortable: true,
        formatter: ({ value })  => this.findItem(value,brands)
      },
      {
        key: 'price',
        name: 'Price, $',
        sortable: true,
      },
      // {
      //   key: 'status',
      //   name: 'Status',
      //   sortable: true,
      //   formatter: StatusFormatter,
      //   width: 110,
      // },
    ];
  };

  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  createRows = (numberOfRows) => {
    const rows = [];

    for (let i = 1; i < numberOfRows + 1; i += 1) {
      rows.push({
        id: Math.min(99999, Math.round((Math.random() * 99999) + 1000)),
        photo: [Img1, Img2, Img3, Img4, Img5, Img6, Img7][Math.floor((Math.random() * 7))],
        name: ['Glass Vase', 'Pillow'][Math.floor((Math.random() * 2))],
        category: 'Home accessories',
        quantity: Math.min(400, Math.round(Math.random() * 400)),
        articul: `art${Math.min(99999, Math.round((Math.random() * 99999) + 1))}`,
        price: Math.min(1000, (Math.random() * 1000) + 20).toFixed(2),
        status: ['Enabled', 'Disabled'][Math.floor((Math.random() * 2))],
      });
    }
    return rows;
  };

  render() {
    const { rows} = this.state;
    
    const {products} = this.props;
    console.log(products);
    console.log('products.length',products.length);
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="products-list">
            <div className="card__title">
              <h5 className="bold-text">Products List</h5>
              <ButtonToolbar className="products-list__btn-toolbar-top">
                <form className="form">
                  <div className="form__form-group products-list__search">
                    <input placeholder="Search..." name="search" />
                    <MagnifyIcon />
                  </div>
                </form>
                <Link className="btn btn-primary products-list__btn-add" to="/dashboard/product_edit">Add New
                  Product
                </Link>
              </ButtonToolbar>
            </div>
            <p className="typography-message">Show
              <select className="select-options">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              products
            </p>
            {products.length ? <EditTable heads={this.heads} rows={products} enableRowSelect /> : <h4>Loading Products...</h4>}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  products:state.product,
  categories:state.categories,
  brands:state.brands
});

export default connect(mapStateToProps)(ProductsListTable);