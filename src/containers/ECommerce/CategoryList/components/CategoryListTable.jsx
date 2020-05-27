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
import moment from 'moment';

const Img2 = `${process.env.PUBLIC_URL}/img/for_store/vase_2.png`;
const PhotoFormatter = ({ value }) => (
    <div className="products-list__img-wrap">
      <img src={value && value.length ? value[0].src : Img2 } alt="" />
    </div>
  );
  
  PhotoFormatter.propTypes = {
    value: PropTypes.string.isRequired,
  };


class CategoryListTable extends PureComponent {
    constructor() {
      super();
      // this.heads =
      if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
      }
      this.state = {
        pageOfItems: [],
        companies: [],
        db: firebase.firestore()
      };
    }

    

  
    get heads(){
        const {categories} = this.props;
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
            key: 'parentCategoryId',
            name: 'Parent Category',
            sortable: true,
            formatter: ({value} )  => this.findItem(value,categories)
          },
          {
            key: 'createdAt',
            name: 'Created',
            sortable: true,
            formatter: ( {value} )  => this.convertdate(value)
          },
          {
            key: 'updatedAt',
            name: 'Updated',
            sortable: true,
            formatter: ( {value} )  => this.convertdate(value)
          }
        ];
    }
    
    finditem = (value,categories)=>
    {
        let title = "";
        for(let item in categories)
        {
            if(categories[item].id == value)
            {
                return categories[item].title;
            }
        }

        return title;
    }
    convertdate = (secs) => {
        let t = new Date(1970,1,1);
        t.setSeconds(secs.seconds);
        return moment(t).format('YYYY-MM-DD')
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
  
    
  
    render() {
      const { rows} = this.state;
      
      const {categories} = this.props;
      
      return (
        <Col md={12} lg={12}>
          <Card>
            <CardBody className="products-list">
              <div className="card__title">
                <h5 className="bold-text">Categories List</h5>
                <ButtonToolbar className="products-list__btn-toolbar-top">
                  <form className="form">
                    <div className="form__form-group products-list__search">
                      <input placeholder="Search..." name="search" />
                      <MagnifyIcon />
                    </div>
                  </form>
                  <Link className="btn btn-primary products-list__btn-add" to="/dashboard/categories_edit">Add New
                    Catgegory
                  </Link>
                </ButtonToolbar>
              </div>
              {categories.length ? <EditTable heads={this.heads} rows={categories} enableRowSelect /> : <h4>Loading Categories...</h4>}
            </CardBody>
          </Card>
        </Col>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    categories:state.categories
  });
  
  export default connect(mapStateToProps)(CategoryListTable);