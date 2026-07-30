import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSortId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';

const sortList = ['rating', 'price', 'title'];
const PIZZAS_LIMIT = 8; 

const Home = () => {
 const categoryId = useSelector((state) => state.filterSlice.categoryId);
 const sortId = useSelector((state) => state.filterSlice.sort);
 const dispatch = useDispatch();





  const [pizzaItems, setPizzaItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categoryType, setCategoryType] = useState(0);
  // const [sortType, setSortType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    setIsLoading(true);
    setCurrentPage(1); // При смене категории сбрасываем на 1 страницу
  };

  const onChangeSort = (id) => {
    dispatch(setSortId(id));
    setIsLoading(true);
  };

  useEffect(() => {
    const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
    const sortQuery = `sortBy=${sortList[sortId]}&order=desc`;
    const searchProperty = searchValue ? `title=${searchValue}` : '';

    const queryString = [categoryQuery, sortQuery, searchProperty].filter(Boolean).join('&');

    fetch(`https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item?${queryString}`)
      .then((res) => res.json())
      .then((res) => {
        setPizzaItem(Array.isArray(res) ? res : []);
        setIsLoading(false);
      })
      .catch(() => {
        setPizzaItem([]);
        setIsLoading(false);
      });
  }, [categoryId, sortId, searchValue]);

  // 1. Фильтруем по полю поиска
  const filteredPizzas = pizzaItems.filter((obj) =>
    obj.title.toLowerCase().includes((searchValue || '').toLowerCase()),
  );

  // 2. Считаем динамическое количество страниц
  const totalPages = Math.ceil(filteredPizzas.length / PIZZAS_LIMIT);

  // 3. Нарезаем ровно по 4 пиццы на страницу
  const startIndex = (currentPage - 1) * PIZZAS_LIMIT;
  const endIndex = startIndex + PIZZAS_LIMIT;
  const currentPagePizzas = filteredPizzas.slice(startIndex, endIndex);

  const pizzas = currentPagePizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sortId} onClickSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(PIZZAS_LIMIT)].map((_, index) => <Skeleton key={index} />)
          : pizzas}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChangePage={(number) => setCurrentPage(number)}
      />
    </>
  );
};

export default Home;
