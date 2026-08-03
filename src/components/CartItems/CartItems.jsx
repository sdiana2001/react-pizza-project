
import {  useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, minusItem } from '../../redux/slices/cartSlice';



const CartItems = ({ id, title, price, imageUrl, count, type, size }) => {
  const dispatch = useDispatch();

  const onClickPlus = ()=>{
    dispatch(addItem({id}));
  }

    const onClickMinus = () => {
      dispatch(minusItem(id))
    };

       const onClickRemoveAll= () => {
         dispatch(removeItem(id));
       };



  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img src={imageUrl} alt="Сырный цыпленок" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} тесто, {size}
        </p>
      </div>
      <div className="cart__item-count">
        <button onClick={onClickMinus}>-</button>
        <b>{count}</b>
        <button onClick={onClickPlus}>+</button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div onClick={onClickRemoveAll} className="cart__item-remove">
        <button>✕</button>
      </div>
    </div>
  );
};

export default CartItems;
