import React from 'react';

function Navbar(props) {
  const {length} = props;
  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1'>
            Cart App <span className='badge bg-primary'>{length}</span>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;