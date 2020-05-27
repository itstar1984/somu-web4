import React,{useState} from 'react';
import { Button, ButtonToolbar,Input} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';
import TagIcon from 'mdi-react/TagIcon';
import renderDropZoneMultipleField from '../../../../shared/components/form/DropZoneMultiple';
import Featured from '../../../../shared/components/form/ToggleButton';
function BrandEditForm ({ handleSubmit, reset,brandinfo}) {
  
  const [brand,setBrand] = useState(brandinfo);

  let brandinfoform = {...brand};
  
  function Submit()
  {
    handleSubmit(brand);
  }
  return (
      <form className="form product-edit" onSubmit={Submit}>
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">Brand Name</span>
            <div className="form__form-group-field">
              <Input name="title" defaultValue={brandinfo.title} onChange={(e)=>{brandinfoform.title = e.target.value; setBrand(brandinfoform);}}></Input>
            </div>
          </div>
          <div className="form__form-group">
            <div className="form__form-group-field">
              <span className="form__form-group-label">Featured</span>
              <Field name="featured" component={Featured} defaultChecked={brandinfo.featured} onChange={(checked)=>{brandinfoform.featured = checked; setBrand(brandinfoform);}}></Field>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Upload photo</span>
            <div className="form__form-group-field">
              <Field
                name="image"
                component={renderDropZoneMultipleField}
                input={{
                  value:brand.image?brand.image:[],
                  onChange:(files)=>{
                    brandinfoform.image = files; setBrand(brandinfoform);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="form__form-group">
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" onClick={()=>handleSubmit(brand)}>Save</Button>
            <Button type="button" onClick={reset}>Cancel</Button>
          </ButtonToolbar>
        </div>
        
      </form>
    );
}

BrandEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'brand_edit_form', // a unique identifier for this form
})(BrandEditForm);
