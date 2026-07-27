import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
  return (
    <div className="cart">
      {/* Шапка */}
      <div className="cart__top">
        <h2 className="cart__title">
          <img src="/src/assets/icons/cart-black.svg" alt="cart" />
          Корзина
        </h2>
        <div className="cart__clear">
          <img src="/src/assets/icons/trash.svg" alt="trash" />
          <span>Очистить корзину</span>
        </div>
      </div>

      {/* Список товаров */}
      <div className="cart__items">
        {/* Товар 1 */}
        <div className="cart__item">
          <div className="cart__item-img">
            <img src="/src/assets/pizza/pizza-1.png" alt="Сырный цыпленок" />
          </div>
          <div className="cart__item-info">
            <h3>Сырный цыпленок</h3>
            <p>тонкое тесто, 26 см.</p>
          </div>
          <div className="cart__item-count">
            <button>-</button>
            <b>2</b>
            <button>+</button>
          </div>
          <div className="cart__item-price">
            <b>770 ₽</b>
          </div>
          <div className="cart__item-remove">
            <button>✕</button>
          </div>
        </div>

        {/* Товар 2 */}
        <div className="cart__item">
          <div className="cart__item-img">
            <img src="/src/assets/pizza/pizza-2.png" alt="Креветки по-азиатски" />
          </div>
          <div className="cart__item-info">
            <h3>Креветки по-азиатски</h3>
            <p>толстое тесто, 40 см.</p>
          </div>
          <div className="cart__item-count">
            <button>-</button>
            <b>1</b>
            <button>+</button>
          </div>
          <div className="cart__item-price">
            <b>290 ₽</b>
          </div>
          <div className="cart__item-remove">
            <button>✕</button>
          </div>
        </div>
      </div>

      {/* Подвал */}
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего пицц: <b>3 шт.</b>
          </span>
          <span>
            Сумма заказа: <b>900 ₽</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link to="/" className="button__back">
            <span>Вернуться назад</span>
          </Link>
          <button className="pay-btn">
            <span>Оплатить сейчас</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;