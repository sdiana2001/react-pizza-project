import { useContext, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import { useNavigate } from 'react-router-dom';
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
  const { categoryId, sortId, pageCount } = useSelector((state) => state.filter);
  const { pizzaItems, status } = useSelector((state) => state.pizza);
  const { searchValue } = useContext(SearchContext);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setPageCount(1));
  };
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  // Загрузка пицц
  useEffect(() => {
    const getPizzas = () => {
      const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
      const sortQuery = `sortBy=${sortList[sortId]}&order=desc`;
      const searchProperty = searchValue ? `title=${searchValue}` : '';

      dispatch(fetchPizzas({ categoryQuery, sortQuery, searchProperty }));
    };
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortId, searchValue, dispatch]);

  // Этот useEffect не проверяет, есть ли в ссылке параметры. Он просто «молчит» при первом запуске,
  // давая время другому коду (useEffect внизу) спокойно прочитать параметры из URL,
  //  и срабатывает только при втором рендере

  //  Если при старте есть URL-параметры — сохраняем их в Redux
  useEffect(() => {
    if (window.location.search) {
      // 1. Распаковываем строку URL в объект{}
      const params = qs.parse(window.location.search.substring(1)); // Десериализация(парсинг)
      // 2. Отправляем объект в Redux, чтобы обновить состояние
      dispatch(setFilters(params));
      isSearch.current = true; //Если параметры в URL есть, запрос при первом рендере блокируй!
    }
  }, [dispatch]);

  // 3. Запись изменений фильтров из Redux в URL (игнорируя самый первый рендер)
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
      {status === 'error' ? (
        <>
          <h2 className="content-error">Произошла ошибка 😕!</h2>
          <p className="content-error_info">
            Не удалось загрузить пиццы. Попробуйте повторить попытку позже или обновите страницу.
          </p>
        </>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(PIZZAS_LIMIT)].map((_, index) => <Skeleton key={index} />)
            : currentItems.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}

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
