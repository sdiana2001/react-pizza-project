import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../scss/FullPizza.module.scss'; // Или .css

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const [activeSize, setActiveSize] = useState(1); // 0: 25см, 1: 30см, 2: 35см
  const [activeType, setActiveType] = useState(0); // 0: Традиционное, 1: Тонкое
  const { id } = useParams();

  const sizes = [25, 30, 35];
  const types = ['Традиционное', 'Тонкое'];

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item/` + id);
        setPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Левая часть - изображение */}
        <div className={styles.imageBlock}>
          <div className={styles.dashedCircle}></div>
          <img src={pizza.imageUrl} alt={pizza.title} className={styles.pizzaImg} />
        </div>

        {/* Правая часть - информация */}
        <div className={styles.infoBlock}>
          <div className={styles.header}>
            <h2>{pizza.title}</h2>
            <button className={styles.infoBtn}>i</button>
          </div>

          <p className={styles.subtitle}>30 см, традиционное тесто, 570 г</p>

          <p className={styles.description}>
            Соус альфредо, сыр моцарелла, <span className={styles.removable}>томаты ✕</span>,{' '}
            <span className={styles.removable}>перец сладкий ✕</span>,{' '}
            <span className={styles.removable}>шампиньоны свежие ✕</span>, соус том ям, креветки
          </p>

          {/* Переключатель размеров */}
          <div className={styles.selector}>
            <ul>
              {sizes.map((size, index) => (
                <li
                  key={size}
                  onClick={() => setActiveSize(index)}
                  className={activeSize === index ? styles.active : ''}>
                  {size} см
                </li>
              ))}
            </ul>
            <ul>
              {types.map((type, index) => (
                <li
                  key={type}
                  onClick={() => setActiveType(index)}
                  className={activeType === index ? styles.active : ''}>
                  {type}
                </li>
              ))}
            </ul>
          </div>

          {/* Кнопка добавления в корзину */}
          <button className={styles.addBtn}>В корзину за {pizza.price} сом</button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
