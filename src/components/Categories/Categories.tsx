type CategoriesProps = {
  value: number,
  onClickCategory: any
}


const Categories =({ value, onClickCategory }:CategoriesProps) => {

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
        {categoriesArr.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
