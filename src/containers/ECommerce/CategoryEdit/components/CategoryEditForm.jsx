import React,{useState} from 'react';
import { Button, ButtonToolbar,Input} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CurrencyUsdIcon from 'mdi-react/CurrencyUsdIcon';
import TagIcon from 'mdi-react/TagIcon';
import renderDropZoneMultipleField from '../../../../shared/components/form/DropZoneMultiple';
import Featured from '../../../../shared/components/form/ToggleButton';
import Select from 'react-select';
function CategoryEditForm ({ handleSubmit, reset,categoryinfo,categories}) {
  
  const [category,setCategory] = useState(categoryinfo);

  let categoryinfoform = {...category};
  
  function getcategories()
  {
      let categorylist = [];
      for(let item in categories)
      {
        categorylist.push({label:categories[item].title,value:categories[item].id});
      }

      return categorylist;
  }

  function getcategory(value)
  {
      for(let item in categories)
      {
          if(categories[item].id == value)
          {
              return {label:categories[item].title,value:categories[item].id};
          }
      }
  }

  return (
      <form className="form product-edit">
        <div className="form__half">
          <div className="form__form-group">
            <span className="form__form-group-label">Category Name</span>
            <div className="form__form-group-field">
              <Input name="title" defaultValue={categoryinfo.title} onChange={(e)=>{categoryinfoform.title = e.target.value; setCategory(categoryinfoform);}}></Input>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Parent Category</span>
            <div className="form__form-group-field" style={{display:'block'}}>
                <Select 
                    options={getcategories()} 
                    defaultValue={getcategory(categoryinfo.parentCategoryId)} 
                    placeholder="Select Parent Category"
                    isOptionSelected={(option)=>{
                        categoryinfoform.parentCategoryId = option.value;
                        setCategory(categoryinfoform);
                    }}
                    ></Select>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Upload photo</span>
            <div className="form__form-group-field">
              <Field
                name="image"
                component={renderDropZoneMultipleField}
                input={{
                  value:category.image?category.image:[],
                  onChange:(files)=>{
                    categoryinfoform.image = files; setCategory(categoryinfoform);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="form__form-group">
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" onClick={()=>handleSubmit(category)}>Save</Button>
            <Button type="button" onClick={reset}>Cancel</Button>
          </ButtonToolbar>
        </div>
      </form>
    );
}

CategoryEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'brand_edit_form', // a unique identifier for this form
})(CategoryEditForm);
