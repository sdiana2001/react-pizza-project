import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className="сart-empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src="/src/assets/icons/not-found.png" alt="Empty cart" />
      <Link to="/" className="сart-empty__btn">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
