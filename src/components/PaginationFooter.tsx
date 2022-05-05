interface PaginatorFooterProps {
  noOfPages: number;
  currentPage: number;
  handlePaginationButtonClick: (pageNo: number) => void;
}

const PaginationFooter = (props: PaginatorFooterProps) => {
  const { currentPage, noOfPages, handlePaginationButtonClick } = { ...props };
  return (
    <nav aria-label="...">
      <ul className="pagination m-2">
        <li
          className={
            currentPage === 1 || noOfPages === 1
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a
            className="page-link"
            onClick={() => handlePaginationButtonClick(-1)}
          >
            Previous
          </a>
        </li>

        {[
          Array.from({ length: noOfPages }, (_, i) => i + 1).map((pageNo) => {
            return (
              <li
                key={pageNo}
                className={
                  currentPage === pageNo ? "page-item active" : "page-item"
                }
              >
                <a
                  className="page-link"
                  onClick={() => handlePaginationButtonClick(pageNo)}
                >
                  {pageNo}
                </a>
              </li>
            );
          }),
        ]}
        <li
          className={
            currentPage === noOfPages ? "page-item disabled" : "page-item"
          }
        >
          <a
            className="page-link"
            onClick={() => handlePaginationButtonClick(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationFooter;
