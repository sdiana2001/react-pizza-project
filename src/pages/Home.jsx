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
  const isMounted = useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setPageCount(1));
    setIsLoading(true);
  };
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  // 1. ПЕРВЫЙ ЭТАП: Если при старте есть URL-параметры — сохраняем их в Redux
  useEffect(() => {
    if (window.location.search) {
      // 1. Распаковываем строку URL в объект{}
      const params = qs.parse(window.location.search.substring(1)); // Десериализация(парсинг)
      console.log(params);
      // 2. Отправляем объект в Redux, чтобы обновить состояние
      dispatch(setFilters(params)); // записал их в Redux.

      isSearch.current = true; //Если параметры в URL есть, запрос при первом рендере блокируй!
    }
  }, [dispatch]);

  // 2. ВТОРОЙ ЭТАП: Загрузка пицц
  useEffect(() => {
    const fetchPizzas = () => {
      setIsLoading(true);
      const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
      const sortQuery = `sortBy=${sortList[sortId]}&order=desc`;
      const searchProperty = searchValue ? `title=${searchValue}` : '';
      const queryString = [categoryQuery, sortQuery, searchProperty].filter(Boolean).join('&');

      axios.get(`https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item?${queryString}`).then((res) => {
        setPizzaItem(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false);
      });
    };

    // Если при открытии сайта параметров в URL НЕ БЫЛО — делаем обычный запрос
    if (!isSearch.current) {
      fetchPizzas();
    }

    // СБРАСЫВАЕМ ФЛАГ: теперь при любых будущих кликах пользователя запросы БУДУТ отправляться!
    isSearch.current = false;
  }, [categoryId, sortId, searchValue]);

  
  
  
  // Этот useEffect не проверяет, есть ли в ссылке параметры. Он просто «молчит» при первом запуске,
  // давая время другому коду (useEffect внизу) спокойно прочитать параметры из URL,
  //  и срабатывает только при втором рендере

  // 3. ТРЕТИЙ ЭТАП: Запись изменений фильтров из Redux в URL (игнорируя самый первый рендер)
  useEffect(() => {
    // Проверка if (isMounted.current) спасает ссылку от преждевременной дефолтной перезаписи при первой загрузке страницы!
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId, // (сокращённая запись JS: categoryId: categoryId).
        sortId,
        pageCount,
      });

      navigate(`?${queryString}`); // navigate моментально вставит строчку в URL браузера.
    }
    isMounted.current = true; // // После первого рендера разблокируем обновление URL
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

// Запрет: Переменная isMounted.current изначально равна false.
// Почему: Нам НЕЛЬЗЯ переписывать URL дефолтными значениями из Redux (categoryId: 0 и т.д.), 
// потому что пользователь мог прийти по готовой ссылке извне (например, с фильтрами ?categoryId=2).
// Что происходит: Код с navigate пропускается, строка URL остается чистой/исходной,
//  а в конце isMounted.current переключается на true.