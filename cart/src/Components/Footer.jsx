import React from 'react'

function Footer(props) {
  const { total = 0 } = props;
  return (
    <nav className="navbar bg-body-tertiary bg-white border border-primary border-3 p-0">
    <div className="container-fluid p-2 m-0">
      <a className="navbar-brand p-0">Grand Total</a>
      <a className='col-3 bg-primary text-center p-0 m-0 h-100 text-white'>
        Rs {total}
      </a>
    </div>
  </nav>
  )
}

export default Footer