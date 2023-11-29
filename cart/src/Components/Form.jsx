import React from 'react'

function Form() {
  return (
    <div>
  
    <legend>Disabled fieldset example</legend>
    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">Product Name</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Product Name"/>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">Product Price</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Product Price"/>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">Product Quantity</label>
      <input type="text" id="disabledTextInput" class="form-control" placeholder="Product Quantity"/>
    </div>

    <button type="submit" class="btn btn-primary">Add Product</button>

</div>
  )
}

export default Form