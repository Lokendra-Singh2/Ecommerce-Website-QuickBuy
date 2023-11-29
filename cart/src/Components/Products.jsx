import React from 'react';
import ProductCard from './ProductCard';

function Products(props) {
  const { products, incrementFunction, index, decrementFunction, deleteProduct } = props;
  return (
    <div className='d-flex w-80  justify-content-center height'>
      <div className='text-black w-100 d-flex flex-column justify-content-center'>
        {
          products && products.length && products.map((product,index)=>{
            return <ProductCard product={product} key={index} incrementFunction={incrementFunction} index={index} decrementFunction={decrementFunction} deleteProduct={deleteProduct}/>
          })
        }
      </div>
    </div>
  );
}

export default Products