import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import BrandEditForm from './BrandEditForm';
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

function PaymentCard({addbrand,updatebrand,history,brands,match}){
  const {params} = match;
  
  let brandinfo = {};
  console.log(match);
  let images = [];
  for(let item in brands)
  {
      if(brands[item].id == params.id)
      {
        brandinfo = {...brands[item]};
        for(let item in brandinfo.image)
        {
          images.push(b64toBlob(brandinfo.image[item].src,params.id + item + ".jpg"));
        }

        brandinfo.image = images;
      }
  }

  const submit = function(data)
  {
    console.log(data);
    if(!params.id)
    {
      addbrand(data);
    }
    else
    {
      data.createdAt = brandinfo.createdAt?brandinfo.createdAt:{seconds:+ new Date()};
      updatebrand(data,params.id);
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
            <BrandEditForm brandinfo = {brandinfo} handleSubmit={(data)=>{ submit(data); }} />
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
  addbrand:async(data)=>{
    let images = [];
    for(let item in data.image)
    {
      let imagebase = await geturl(data.image[item]);
      images.push({src:imagebase});
    }

    data.image = images;
    data.createdAt = {seconds:+ new Date()};
    data.updatedAt = {seconds:+ new Date()};
    dispatch({type:actiontype.ADD_BRAND_ITEM,brand:data});
  },
  updatebrand:async(brand,id)=>{
    let images = [];
    for(let item in brand.image)
    {
      let imagebase = await geturl(brand.image[item]);
      images.push({src:imagebase});
    }

    brand.image = images;
    brand.updatedAt = {seconds: + new Date()};
    dispatch({type:actiontype.UPDATE_BRAND_ITEM,brand,id});
  }
})

const mapstateProps = (state) => ({
  brands:state.brands
})

export default connect(mapstateProps,mapdispathProps)(PaymentCard);
