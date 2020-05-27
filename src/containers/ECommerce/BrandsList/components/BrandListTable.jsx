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
import {Button} from 'reactstrap';
import * as actiontype from '../../../../redux/actions/actiontype';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Img2 = `${process.env.PUBLIC_URL}/img/for_store/vase_2.png`;
const PhotoFormatter = ({ value }) => (
    <div className="products-list__img-wrap">
      <img src={value && value.length ? value[0].src : Img2 } alt="" />
    </div>
  );
  
  PhotoFormatter.propTypes = {
    value: PropTypes.string.isRequired,
  };


class BrandListTable extends PureComponent {
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
        const {brands} = this.props;
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
            key: 'featured',
            name: 'Featured',
            sortable: false,
            formatter:({value})=>value?"Y":"N"
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
          },
          {
            key:'id',
            name:'',
            sortable:false,
            formatter:({value})=>this.renderaction(value)
          }
        ];
    }
    
    delete = (id) => {
      this.props.dispatch({type:actiontype.DELETE_BRAND_ITEM,id});
    }

    confirmdialog = (value) => {
      let self = this;
      confirmAlert({
        title:"Delete Brand",
        message:"Are you sure to delete this brand",
        buttons:[
          {
            label:"Yes",
            onClick:()=>{
              self.delete(value);
            }
          },
          {
            label:'No'
          }
        ]
      })
    }

    renderaction = (value) => {
      return (
        <div key={value} style={{alignItems:'center',height:'100%'}}>
          <Button key={"item1" + value} onClick={()=>this.confirmdialog(value)} color="danger" style={{marginBottom:0,paddingLeft:10,paddingTop:5,paddingBottom:5,paddingRight:10}}>Delete</Button>
          <Button key={"item2" + value} color="primary" style={{marginBottom:0,paddingLeft:10,paddingTop:5,paddingBottom:5,paddingRight:10}}>
            <Link to={"/dashboard/brands_edit/" + value} style={{color:'white'}}>Edit</Link>
          </Button>
        </div>
      )
    }
   
    convertdate = (secs) => {
        let t = new Date(1970,0,0);
        t.setMilliseconds(secs.seconds);
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
      
      const {brands} = this.props;
      return (
        <Col md={12} lg={12}>
          <Card>
            <CardBody className="products-list">
              <div className="card__title">
                <h5 className="bold-text">Brands List</h5>
                <ButtonToolbar className="products-list__btn-toolbar-top">
                  <form className="form">
                    <div className="form__form-group products-list__search">
                      <input placeholder="Search..." name="search" />
                      <MagnifyIcon />
                    </div>
                  </form>
                  <Link className="btn btn-primary products-list__btn-add" to="/dashboard/brands_edit">Add New
                    Brand
                  </Link>
                </ButtonToolbar>
              </div>
              {brands.length ? <EditTable heads={this.heads} rows={brands}/> : <h4>Loading Brands...</h4>}
            </CardBody>
          </Card>
        </Col>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    brands:state.brands
  });
  
  export default connect(mapStateToProps)(BrandListTable);