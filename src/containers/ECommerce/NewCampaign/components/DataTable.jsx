/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col } from 'reactstrap';
import DataPaginationTable from './DataPaginationTable';
import Pagination from '../../../../shared/components/pagination/Pagination';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import * as firebase from 'firebase/app';
import firebaseConfig from '../../../../config/firebase';
require("firebase/firestore");

const Img1 = `${process.env.PUBLIC_URL}/img/for_store/vase.png`;

const PhotoFormatter = ({ value }) => (
  <div className="products-list__img-wrap">
    <img src={value && value.length ? value[0].src : Img1} alt="" />
  </div>
);

PhotoFormatter.propTypes = {
  value: PropTypes.array.isRequired,
};

export default class DataTable extends PureComponent {
  constructor() {
    super();

    const initialPageNumber = 1;
    const initialRowsCount = 10;

    const minRows = 20;
    const maxRows = 41;
    const rowsCount = Math.random() * (maxRows - minRows);

    const originalRows = this.createRows(rowsCount + minRows);
    const currentPageRows = this.filterRows(originalRows, initialPageNumber, initialRowsCount);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      rows: originalRows,
      rowsToShow: currentPageRows,
      pageOfItems: initialPageNumber,
      itemsToShow: initialRowsCount,
      products: [],
      selectedProducts: [],
      searchValue: '',
      db: firebase.firestore(),
    };

  }

  onChangePage = (pageOfItems) => {
    const { rows, itemsToShow } = this.state;
    if (pageOfItems) {
      const rowsToShow = this.filterRows(rows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow, pageOfItems });
    }
  };

  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows + 1; i += 1) {
      rows.push({
        id: i,
        first: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
        last: ['Morisson', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
        user: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
        age: Math.min(100, Math.round(Math.random() * 30) + 20),
        date: this.getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
        location: ['Melbourne', 'Tokio', 'Moscow', 'Rome'][Math.floor((Math.random() * 4))],
        work: ['Nova Soft', 'Dog Shop', 'Aspirity', 'Business Bro', 'Starlight'][Math.floor((Math.random() * 5))],
      });
    }
    return rows;
  };

  filterRows = (originalRows, pageNumber, rowsOnPage) => {
    const rowsFrom = rowsOnPage * (pageNumber - 1);
    const rowsTo = rowsFrom + rowsOnPage;
    return originalRows.slice(rowsFrom, rowsTo);
  };

  onSorting = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    };
    const {
      rows, pageOfItems, itemsToShow,
    } = this.state;
    if (sortDirection !== 'NONE') {
      let sortRows = [...rows].sort(comparer);
      sortRows = this.filterRows(sortRows, pageOfItems, itemsToShow);
      this.setState({ rowsToShow: sortRows });
      return sortRows;
    }
    const sortRows = this.filterRows(rows, pageOfItems, itemsToShow);
    this.setState({ rowsToShow: sortRows });
    return sortRows;
  };

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const products = await this.getCol('products')
    const categories = await this.getCol('categories')
    // const users = await this.getCol('users')
    const brands = await this.getCol('brands')

    this.setState({ products, categories, brands })
  }

  getCol = async (key) => {
    const { db } = this.state
    var col = db.collection(key);
    const snap1 = await col.get();
    return snap1.docs.map(x => x.data());
  }

  getColWhere = async (key,where) => {
    const { db } = this.state
    var col = db.collection(key);
    const snap1 = await col.where('title', '==', where).get();
    return snap1.docs.map(x => x.data());
  }

  searchData = async e => {
    const { products, searchValue } = this.state
    // const products = await this.getColWhere('products', e.target.value)
    const fproducts = products.filter(function (item) {
      return item.title.toLowerCase().search(searchValue.toLowerCase()) !== -1;
    })
    this.setState({ products: fproducts });
    console.log('query name', searchValue, products);
  }

  onChange = ( e, value ) => {
    this.setState({ searchValue: value });
  }

  onSelect = ( e, value ) => {
    const { selectedProducts } = this.state

    console.log('searchData', e, value);
    // clearTimeout(this.typingTimeout);
    //
    // // Reset the timer, to make the http call after 475MS (this.callSearch is a method which will call the search API. Don't forget to bind it in constructor.)
    // this.typingTimeout = setTimeout(this.searchData, 475);
    // this.setState({ searchValue: value ? value.title : ''  });
    this.setState({ searchValue: '', selectedProducts: [...selectedProducts, value]  });
    this.props.setProducts([...selectedProducts, value])
  }

  findItem = (value, key) => {
    if (this.state[key]) {
      const found = this.state[key].find(x => x.id === value)
      return found ? found.title : value
    }
    else return value
  }

  get heads() {
    console.log("heads", this.state.categories);

    return [
      {
        key: 'id',
        name: 'ID',
        width: 120,
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
        formatter: ({ value }) => this.findItem(value, 'categories')
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
        formatter: ({ value }) => this.findItem(value, 'brands')
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

  render() {
    const {
      rows, itemsToShow, pageOfItems, rowsToShow, searchValue, products, selectedProducts
    } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Listed Products</h5>
              <h5 className="subhead">You can list products here for your <span className="red-text">Campaign</span></h5>
            </div>
            <Autocomplete
              id="combo-box-demo"
              inputValue={searchValue}
              onChange={this.onSelect}
              onInputChange={this.onChange}
              options={products}
              getOptionLabel={option => option.title}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Search Products" variant="outlined" fullWidth />
              )}
            />

            <DataPaginationTable
              heads={this.heads}
              rows={selectedProducts}
              onSorting={this.onSorting}
            />
            <Pagination
              itemsCount={products.length}
              itemsToShow={itemsToShow}
              pageOfItems={pageOfItems}
              onChangePage={this.onChangePage}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
