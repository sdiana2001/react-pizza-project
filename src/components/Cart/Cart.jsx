import { Link } from 'react-router-dom';
import './Cart.scss';
// import { removeItem, clearItem } from '../../redux/slices/cartSlice';
import CartItems from '../CartItems/CartItems';
import { useSelector } from 'react-redux';

const Cart = () => {
  const items = useSelector((state)=> state.cart.items)

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
        {items.map((obj) => (
          <CartItems key={obj.id} {...obj} />
        ))}
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
