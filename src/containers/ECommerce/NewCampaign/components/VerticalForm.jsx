import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TimetableIcon from 'mdi-react/TimetableIcon';
import renderDateTimePickerField from '../../../../shared/components/form/DateTimePicker';
import renderRadioButtonField from '../../../../shared/components/form/RadioButton';

import LocationTree from './LocationTree'
import Table from './DataTable';
import * as firebase from 'firebase/app';
import firebaseConfig from '../../../../config/firebase';
require("firebase/firestore");


class VerticalForm extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      db: firebase.firestore(),
      showPassword: false,
      products:[],
      locations:[],
      selectedLocations: {}
    };
  }

  componentDidMount() {
    this.getData()
  }

  getCol = async (key) => {
    const { db } = this.state
    var col = db.collection(key);
    const snap1 = await col.get();
    return snap1.docs.map(x => x.data());
  }

  getData = async () => {
    const locations = await this.getCol('locations')
    // const categories = await this.getCol('categories')
    // const offers = await this.getCol('offers')
    // const brands = await this.getCol('brands')

    this.setState({
      locations,
    });
  }

  submitData = (e,data) => {
    e.preventDefault();
    const { db } = this.state;
    console.log(e,this.props);
    
    // db.collection("offers").add({
    //   name: "Tokyo",
    //   country: "Japan"
    // })
    // .then(function (docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function (error) {
    //   console.error("Error adding document: ", error);
    // });
  }

  setProducts = (products) => {
    this.setState({products})
  }

  setLocations = (selectedLocations) => {
    this.setState({ selectedLocations })
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };


  render() {
    const { handleSubmit, reset, t } = this.props;
    const { locations } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">CAMPAIGN DETAILS</h5>
              <h5 className="subhead">Campaign Name, Date, Location, Products</h5>
            </div>
            <form className="form" onSubmit={this.submitData}>
              <div className="form__form-group">
                <span className="form__form-group-label">Campaign Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="defaultInput"
                    component="input"
                    type="text"
                    placeholder="Ex Summer Sale"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Set Campaign Date</span>
                <div className="form__form-group-field">
                  <Field
                    name="date_time"
                    component={renderDateTimePickerField}
                    placeholder="Set Date and Time"
                  />
                  <div className="form__form-group-icon">
                    <TimetableIcon />
                  </div>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Location</span>
                <div className="form__form-group-field">
                  <LocationTree
                    setLocations={this.setLocations}
                    locations={locations}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Online/Offline Offer</span>
                <div className="form__form-group-field">
                  <Field
                    name="radio_colored"
                    component={renderRadioButtonField}
                    label="Online"
                    radioValue="Online"
                    defaultChecked
                    className="colored"
                  />
                </div>
                <div className="form__form-group-field">
                  <Field
                    name="radio_colored"
                    component={renderRadioButtonField}
                    label="Offline"
                    radioValue="2"
                    className="colored"
                  />
                </div>
              </div>

              <Table setProducts={this.setProducts} />

              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Create Campaign</Button>
                <Button type="button" onClick={reset}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'vertical_form', // a unique identifier for this form
})(withTranslation('common')(VerticalForm));
