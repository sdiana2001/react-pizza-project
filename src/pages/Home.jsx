import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

  const sortList = ['rating', 'price', 'title'];


const Home = ({ searchValue }) => {
  const [pizzaItems, setPizzaItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryType, setCategoryType] = useState(0);
  const [sortType, setSortType] = useState(0);

  const onChangeCategory = (id) => {
    setCategoryType(id);
    setIsLoading(true); // Включаем скелетон СРАЗУ при клике
  };

  const pizzas = pizzaItems
    .filter((obj) => obj.title.toLowerCase().includes(searchValue || '').toLowerCase())
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);


  useEffect(() => {
    // Если categoryType > 0, добавляем фильтр. Если 0 ("Все"), запрос идет без фильтра
    const categoryQuery = categoryType > 0 ? `category=${categoryType}` : '';
    const sortQuery = `sortBy=${sortList[sortType]}&order=desc`;

    const queryString = [categoryQuery, sortQuery].filter(Boolean).join('&');

    fetch(`https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item?${queryString}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPizzaItem(res);
        setIsLoading(false);
      });
  }, [categoryType, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryType} onClickCategory={onChangeCategory} />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas}
      </div>
    </>
  );
};

export default Home;
