import React, { useState } from 'react';
import {
  Card, CardBody, Col, ButtonToolbar,
} from 'reactstrap';
import HeartIcon from 'mdi-react/HeartIcon';
import StarIcon from 'mdi-react/StarIcon';
import StarOutlineIcon from 'mdi-react/StarOutlineIcon';
import { Link } from 'react-router-dom';
import ProductGallery from './ProductGallery';
import images from './imgs';
import ProductTabs from './ProductTabs';
import ColorSelect from './ColorSelect';

const ProductCard = ({product}) => {
  const [color, setColor] = useState('white');

  const onLike = () => {
    if (color === 'white') {
      setColor('#70bbfd');
    } else {
      setColor('white');
    }
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="product-card">
            <ProductGallery images={product && product.image ? product.image : images} />
            <div className="product-card__info">
              <h3 className="product-card__title">{product.title}</h3>
              <div className="product-card__rate">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
                <a className="product-card__link" href="/easydev/dashboard/product_page">See all reviews</a>
              </div>
              <h1 className="product-card__price">{product.currency+' '+product.price} <span className="product-card__old-price">{product.currency+' '+product.price+Math.round(Math.random()*10)}</span></h1>
              <p className="typography-message">
                <div dangerouslySetInnerHTML={{__html: product.body}} />
              </p>
              <form className="form product-card__form">
                <div className="form__form-group">
                  <span className="form__form-group-label product-card__form-label">Select Color</span>
                  <div className="form__form-group-field">
                    <ColorSelect options={[
                      { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                      { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                      { value: 'Pink Sugar', label: 'Pink Sugar', color: '#f7a9c4' },
                    ]}
                    />
                  </div>
                </div>
                <ButtonToolbar className="product-card__btn-toolbar">
                  <Link className="btn btn-primary" to="/dashboard/cart">Add to cart</Link>
                  <button
                    className="product-card__wish-btn"
                    type="button"
                    onClick={onLike}
                  >
                    <HeartIcon color={color} />Add to wishlist
                  </button>
                </ButtonToolbar>
              </form>
              <ProductTabs />
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
