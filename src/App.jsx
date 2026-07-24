import './assets/scss/index.scss';
import Header from './assets/components/Header/Header';
import Categories from './assets/components/Categories/Categories';
import Sort from './assets/components/Sort/Sort';
import PizzaBlock from './assets/components/PizzaBlock/PizzaBlock';
import { useState } from 'react';


// const data = [
//   {
//     id: 0,
//     imageUrl: '/pizza/pizza-1.png',
//     title: 'Чизбургер-пицца',
//     types: [0, 1],
//     sizes: [26, 30, 40],
//     price: 395,
//   },
//   {
//     id: 1,
//     imageUrl: '/pizza/pizza-2.png',
//     title: 'Сырная',
//     types: [0, 1],
//     sizes: [26],
//     price: 450,
//   },
//   {
//     id: 2,
//     imageUrl: '/pizza/pizza-3.png',
//     title: 'Креветки по-азиатски',
//     types: [0],
//     sizes: [30],
//     price: 290,
//   },
//   {
//     id: 3,
//     imageUrl: '/pizza/pizza-4.png',
//     title: 'Сырный цыпленок',
//     types: [0, 1],
//     sizes: [26, 30, 40],
//     price: 385,
//   },
// ];


function App() {
  const [pizzaItem, setPizzaItem] = useState([]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzaItem.map((obj, index)=>{
            <PizzaBlock
              id={obj.id}
              key={index}
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
            />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
