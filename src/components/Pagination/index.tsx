import styles from './Pagination.module.scss';

type PaginationProps = {
  totalPages?: number,
  currentPage?: number,
  onChangePage: any
}


export function Pagination({ totalPages = 3, currentPage = 1, onChangePage }:PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ul className={styles.root}>
      {/* Кнопка Назад */}
      <li
        className={`${styles.page} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}>
        ‹
      </li>

      {/* Кнопки со страницами */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <li
            key={pageNumber}
            className={`${styles.page} ${currentPage === pageNumber ? styles.active : ''}`}
            onClick={() => onChangePage(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}

      {/* Кнопка Вперед */}
      <li
        className={`${styles.page} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={() => currentPage < totalPages && onChangePage(currentPage + 1)}>
        ›
      </li>
    </ul>
  );
}
