import styles from './NotFoundBlock.module.scss';
import { Link } from 'react-router-dom';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h2>Корзина пустая <span>😕</span></h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src="/src/assets/icons/not-found.png" alt="Empty cart" />
      <Link to="/" className={styles.button}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default NotFoundBlock;
