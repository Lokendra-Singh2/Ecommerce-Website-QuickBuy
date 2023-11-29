import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductCard(props) {
  const { product, incrementFunction, index , decrementFunction, deleteProduct} = props;
  const { name, price, quantity } = product;
  return (
    <div className='m-3 bg-white'>
      <div className="row align-items-center text-black m-3">
    <div className="col-2">
      {name}
    </div>
    <div className="col-4">
    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" className="btn btn-danger" onClick={()=>decrementFunction(index)}>-</button>
  <button type="button" className="btn btn-warning">{quantity}</button>
  <button type="button" className="btn btn-success" onClick={()=>incrementFunction(index)}>+</button>
</div>
    </div>
    <div className="col-2">
      Rs {price}
    </div>
    <div className="col-2">
     Rs {price*quantity}
    </div>
    <div className="col-2" onClick={
      () => deleteProduct(index)
    }>
    <DeleteIcon/>
    </div>
  </div>
    </div>
  );
}

export default ProductCard