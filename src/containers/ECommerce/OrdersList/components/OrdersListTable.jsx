/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import EditTable from '../../../../shared/components/table/EditableTable';

import * as firebase from 'firebase/app';
import firebaseConfig from '../../../../config/firebase';
require("firebase/firestore");

const MoneyFormatter = ({ value }) => (
  <div>
      ${value}
  </div>
);

MoneyFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const StatusFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span>
    : <span className="badge badge-disabled">Disabled</span>
);

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

export default class OrdersListTable extends PureComponent {
  constructor() {
    super();
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      rows: this.createRows(17),
      pageOfItems: [],
      db: firebase.firestore(),

    };
  }

  componentDidMount(){
    this.getData()
  }

  getCol = async (key) => {
    const { db } = this.state
    var col = db.collection(key);
    const snap1 = await col.get();
    return snap1.docs.map(x => x.data());
  }

  getData = async () => {
    const products = await this.getCol('products')
    // const categories = await this.getCol('categories')
    const offers = await this.getCol('offers')
    // const brands = await this.getCol('brands')

    this.setState(
      { offers,
        products,
        // categories,
        // brands
      });
  }

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  findItem = ( value, key ) => {
    if(this.state[key]){
      const found = this.state[key].find(x => x.id === value)
      return found ? found.title : value
    }
    else return value
  }

  get heads(){
    console.log("heads",this.state.products);
    return [
      {
        key: 'id',
        name: 'ID',
        sortable: true,
      },
      // {
      //   key: 'createdAt',
      //   name: 'Created At',
      //   sortable: true,
      //   formatter: ({ value })  => value.toDate
      // },
      {
        key: 'productId',
        name: 'Product',
        sortable: true,
        formatter: ({ value })  => this.findItem(value,'products')
      },
      {
        key: 'cashback',
        name: 'Cashback',
        sortable: true,
        width: 80,
      },
      {
        key: 'redemption',
        name: 'Redemption Type',
        sortable: true,
      },
      {
        key: 'validity',
        name: 'Validity',
        sortable: true,
      },
      {
        key: 'claimedNumber',
        name: 'Claim Count',
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
  }


  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems });
  };

  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  createRows = (numberOfRows) => {
    const rows = [];

    for (let i = 1; i < numberOfRows + 1; i += 1) {
      rows.push({
        id: Math.min(99999, Math.round((Math.random() * 99999) + 1000)),
        date: this.getRandomDate(new Date(2017, 3, 1), new Date(2018, 3, 1)),
        customer_name: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
        price: Math.min(1000, (Math.random() * 1000) + 20).toFixed(2),
        tax: Math.min(10, Math.random() * 10).toFixed(2),
        delivery: Math.min(10, Math.random() * 10).toFixed(2),
        quantity: Math.min(5, Math.round((Math.random() * 5) + 1)),
        status: ['Enabled', 'Disabled'][Math.floor((Math.random() * 2))],
      });
    }
    return rows;
  };

  render() {
    const { offers } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Campaigns list</h5>
            </div>
            <p className="typography-message">Show
              <select className="select-options">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              entries
            </p>
            {offers && offers.length ? <EditTable heads={this.heads} rows={offers} enableRowSelect /> : <h4>Loading Products...</h4>}

          </CardBody>
        </Card>
      </Col>
    );
  }
}
