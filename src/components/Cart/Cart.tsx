import { Link } from 'react-router-dom';
import './Cart.scss';
import { clearItem } from '../../redux/slices/cartSlice';
import CartItems from '../CartItems/CartItems';
import { useSelector, useDispatch } from 'react-redux';
import CartEmpty from '../../CartEmpty';
import { RootState } from '../../redux/store';

const Cart = () => {
  const { items, totalPrice, totalCount } = useSelector((state:RootState) => state.cart);
  const dispatch = useDispatch();

  const onClickClear = () => {
    dispatch(clearItem());
  };

  if (!totalPrice) {
   return <CartEmpty />
  }

  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="cart__title">
          <img src="/src/assets/icons/cart-black.svg" alt="cart" />
          Корзина
        </h2>
        <div onClick={onClickClear} className="cart__clear">
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
            Всего пицц: <b>{totalCount} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} ₽</b>
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
