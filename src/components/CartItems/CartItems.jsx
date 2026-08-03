
// import {  useDispatch, useSelector } from 'react-redux';
// import { removeItem, clearItem } from '../../redux/slices/cartSlice';


const CartItems = ({ id, title, price, imageUrl, count, type, size }) => {
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img src={imageUrl} alt="Сырный цыпленок" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{type} тесто, 26 см.</p>
      </div>
      <div className="cart__item-count">
        <button>-</button>
        <b>{count}</b>
        <button>+</button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <button>✕</button>
      </div>
    </div>
  );
};

export default CartItems;
