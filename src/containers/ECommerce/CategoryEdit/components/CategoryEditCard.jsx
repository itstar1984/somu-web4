import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CategoryEditForm from './CategoryEditForm';
import * as actiontype from '../../../../redux/actions/actiontype';
import {connect} from 'react-redux'

function b64toBlob(b64Data,filename, contentType="image/png", sliceSize = 512) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;
  b64Data = b64Data.split(",")[1];

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  var file =  new File([blob],filename,{type:contentType});
  return getFile(file);
}

function getFile(file)
{
  Object.assign(file,{
    preview:URL.createObjectURL(file)
  })

  return file;
}

function PaymentCard({addcategory,updatecategory,history,categories,match}){
  const {params} = match;
  
  let categoryinfo = {};
  console.log(match);
  let images = [];
  for(let item in categories)
  {
      if(categories[item].id == params.id)
      {
        categoryinfo = {...categories[item]};
        for(let item in categoryinfo.image)
        {
          images.push(b64toBlob(categoryinfo.image[item].src,params.id + item + ".jpg"));
        }

        categoryinfo.image = images;
      }
  }

  const submit = function(data)
  {
    console.log(data);
    if(!params.id)
    {
      addcategory(data);
    }
    else
    {
      data.createdAt = categoryinfo.createdAt?categoryinfo.createdAt:{seconds:+ new Date()};
      updatecategory(data,params.id);
    }
    
    history.push("/dashboard/brands_list");
  }

  return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Main Information</h5>
            </div>
            <CategoryEditForm categoryinfo = {categoryinfo} categories={categories} handleSubmit={(data)=>{ submit(data); }} />
          </CardBody>
        </Card>
      </Col>
    );
  }

async function geturl(image)
{
  return new Promise((resolve,reject)=>{
      let filereader = new FileReader();
      filereader.readAsDataURL(image);
      filereader.onload = () => {
        let base64 = filereader.result;
        resolve(base64);
      }
  })
}

const mapdispathProps = (dispatch)=>({
  addcategory:async(data)=>{
    let images = [];
    for(let item in data.image)
    {
      let imagebase = await geturl(data.image[item]);
      images.push({src:imagebase});
    }

    data.image = images;
    data.createdAt = {seconds:+ new Date()};
    data.updatedAt = {seconds:+ new Date()};
    dispatch({type:actiontype.ADD_CATEGORY_ITEM,category:data});
  },
  updatecategory:async(category,id)=>{
    let images = [];
    for(let item in category.image)
    {
      let imagebase = await geturl(category.image[item]);
      images.push({src:imagebase});
    }

    category.image = images;
    category.updatedAt = {seconds: + new Date()};
    dispatch({type:actiontype.UPDATE_BRAND_ITEM,category,id});
  }
})

const mapstateProps = (state) => ({
  categories:state.categories
})

export default connect(mapstateProps,mapdispathProps)(PaymentCard);
