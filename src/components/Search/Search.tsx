import { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce'; //задерживает вызов функции на заданное время.
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = useState<string>('');
  const { setSearchValue } = useContext(SearchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Создали функцию и сохранили её. В момент рендера ничего НЕ вызвалось!
  const updateSearchValue = useCallback(
    (str:string ) => {
      debounce((value:string) => {
        setSearchValue(value);
      }, 500)(str);
    },
    [setSearchValue],
  );

  // Запуск происходит ТОЛЬКО при событии onChange
  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const handleClear = () => {
    setValue(''); // 1. Очищаем визуальный инпут СРАЗУ
    setSearchValue(''); // 2. Очищаем поиск в контексте (отправляет запрос)
    inputRef.current?.focus(); // тут хранится ссылка на input
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M27.414,24.586l-4.601-4.601C23.563,18.254,24,16.18,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.18,0,4.254-0.437,5.985-1.187l4.601,4.601c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586  C28.195,26.631,28.195,25.369,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" />
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          className={styles.inputCross}
          onClick={handleClear}
          src="/src/assets/icons/cross.svg"
          alt="cross"
        />
      )}
    </div>
  );
};

export default Search;
