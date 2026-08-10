import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setSortId } from '../../redux/slices/filterSlice.js';
import { RootState } from '../../redux/store';






function Sort() {

  const dispatch = useDispatch();
  const sortId = useSelector((state: RootState) => state.filter.sort);

  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null); // нужен для реализации функции «закрытие выпадающего меню при клике вне его области»
  
  const popup = ['популярности', 'цене', 'алфавиту'];
  const sortName = popup[sortId];

  const changedFilter = (index:number ) => {
    dispatch(setSortId(index));
    setOpen(false);
  };

useEffect(() => {
  const handleClick = (event: MouseEvent) => {
    const path = event.composedPath();

    // Если кликнули ВНЕ блока sortRef — закрываем
    if (sortRef.current && !path.includes(sortRef.current)) {
      setOpen(false);
    }
  };

  // Передаем { capture: true } или просто true третьим аргументом
  document.body.addEventListener('click', handleClick, true);

  return () => {
    document.body.removeEventListener('click', handleClick, true);
  };
}, []);


  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortName}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {popup.map((item, index) => (
              <li
                key={item}
                onClick={() => changedFilter(index)}
                className={sortId === index ? 'active' : ''}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
