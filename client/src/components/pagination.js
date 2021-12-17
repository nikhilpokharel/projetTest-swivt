/** @format */

export default function Pagination({
  limitedPosts,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / limitedPosts); i++) {
    pageNumber.push(i);
  }

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination'>
        {pageNumber.map((item, index) => (
          <li
            onClick={() => {
              paginate(item);
            }}
            style={{ cursor: "pointer" }}
            key={index}
            className={`page-item ${currentPage === item ? "active" : ""} py-4`}
          >
            <span className='page-link'>{item}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
