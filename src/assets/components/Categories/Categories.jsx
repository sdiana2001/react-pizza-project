import { useState } from "react";

function Categories() {
  const[activeIndex, setAtiveIndex] = useState(0)

  const categoriesArr = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ];
  

  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((item, index) => (
          <li onClick={() => setAtiveIndex(index)} className={activeIndex === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
