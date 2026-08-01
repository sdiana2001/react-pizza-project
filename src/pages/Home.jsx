import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { usePagination } from '../hooks/usePagination';
import { SearchContext } from '../App';
import Sort from '../components/Sort/Sort';

const PIZZAS_LIMIT = 8;
const sortList = ['rating', 'price', 'title'];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortId = useSelector((state) => state.filterSlice.sort);
  const pageCount = useSelector((state) => state.filterSlice.pageCount);

  const [pizzaItems, setPizzaItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);
  const isSearch = useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setPageCount(1));
    setIsLoading(true);
  };
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  //Проверяет, пришёл ли пользователь по готовой ссылке.
  useEffect(() => {
    if (window.location.search) {
      // 1. Распаковываем строку URL в объект{}
      const params = qs.parse(window.location.search.substring(1)); // Десериализация(парсинг)

      // 2. Отправляем объект в Redux, чтобы обновить состояние
      dispatch(setFilters(params)); // записал их в Redux.

      // 3. Отмечаем, что фильтры были взяты из URL
      isSearch.current = true;
    }
  }, [dispatch]);

  //  Загрузка пицц с сервера
  useEffect(() => {
    const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
    const sortQuery = `sortBy=${sortList[sortId]}&order=desc`;
    const searchProperty = searchValue ? `title=${searchValue}` : '';
    const queryString = [categoryQuery, sortQuery, searchProperty].filter(Boolean).join('&');

    axios.get(`https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item?${queryString}`).then((res) => {
      setPizzaItem(Array.isArray(res.data) ? res.data : []);
      setIsLoading(false);
    });
  }, [categoryId, sortId, searchValue]);



  //Сохраняет текущие фильтры в адресную строку браузера. Вшиваем параметры в URL при изменении стейтов Redux через qs
  useEffect(() => {
    const queryString = qs.stringify({
      // Сериализация(превращение в строку из обьекта)
      categoryId, // (сокращённая запись JS: categoryId: categoryId).
      sortId,
      pageCount,
    });

    navigate(`?${queryString}`); // чтобы эту полученную строку вставить прямиком в URL-адрес браузера
  }, [categoryId, sortId, pageCount, navigate]);

  // Фильтрация по поисковому запросу
  const filteredPizzas = pizzaItems.filter((obj) =>
    obj.title.toLowerCase().includes((searchValue || '').toLowerCase()),
  );

  // Пагинация через хук (передаем pageCount из Redux)
  const { totalPages, currentItems } = usePagination(filteredPizzas, PIZZAS_LIMIT, pageCount);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(PIZZAS_LIMIT)].map((_, index) => <Skeleton key={index} />)
          : currentItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>

      <Pagination totalPages={totalPages} currentPage={pageCount} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
