import './App.css';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import Footer from './Components/Footer';
import React,{useState} from 'react';
import Form from './Components/Form';

function App() {
  const productArray = [
    {
      name:'p1',
      price:20,
      quantity:10
    },
    {
      name:'p2',
      price:30,
      quantity:15
    },
    {
      name:'p3',
      price:25,
      quantity:20
    },
    {
      name:'p4',
      price:45,
      quantity:5
    },
    {
      name:'p5',
      price:45,
      quantity:5
    },
  ];

  const [products,setProducts] = useState(productArray);

  const total = products.reduce((total,product)=>{
     return total+(product.price*product.quantity);
  },0);

  const incrementFunction = (index)=>{
    products[index].quantity +=1;
    setProducts([...products]);
  }

  const decrementFunction = (index)=>{
    products[index].quantity -=1;
    setProducts([...products]);
  }

  const deleteProduct = (index) =>{
    products.splice(index,1)
    setProducts(...products);
  }
  return (
    <div className="App bg-dark height">
      <Navbar productCount = {products.length}/>
      <Form/>
      <Products products={products} incrementFunction={incrementFunction} decrementFunction={decrementFunction} deleteProduct={deleteProduct}/>
      <Footer total={total}/>

    </div>
  );
}

export default App;
