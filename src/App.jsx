import './assets/scss/index.scss';
import Header from './assets/components/Header/Header';
import Categories from './assets/components/Categories/Categories';
import Sort from './assets/components/Sort/Sort';
import PizzaBlock from './assets/components/PizzaBlock/PizzaBlock';
import { useEffect, useState } from 'react';
import Skeleton from './assets/components/PizzaBlock/Skeleton'

function App() {
  const [pizzaItems, setPizzaItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPizzaItem(res);
        setIsLoading(false);
      });
  }, []);

  // const onClickAdd=(obj)=>{
  //  setPizzaItem((prev)=> [...prev, obj])
  //  console.log(pizzaItem);
  // }

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
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : pizzaItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
