interface PaginatorFooterProps {
  noOfPages: number;
  currentPage: number;
  setCurrentPage: (pageNo: number) => void;
}

const PaginationFooter = (props: PaginatorFooterProps) => {
  const { currentPage, noOfPages, setCurrentPage } = { ...props };
  /**
   * Sets the currentPageNumber which changes the records shown in grid.
   * @param pageValue value passed by the pagination button.
   */
  const handlePaginationButtonClick = (pageValue: number) => {
    // Can't do anything if there's only one page.
    if (noOfPages <= 1) {
      return;
    }
    // Previous page
    if (pageValue === -1) {
      // If it's the first page, previous page navigation shouldn't be allowed.
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    // Next page or any page value
    else if (pageValue > 0) {
      // If the end has not been reached
      if (pageValue <= noOfPages) {
        setCurrentPage(pageValue);
      }
    }
  };
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
