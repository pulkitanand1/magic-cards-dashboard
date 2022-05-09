import { render, screen, cleanup, act } from "@testing-library/react";
import PaginationFooter from "../PaginationFooter";

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

describe("Pagination footer", () => {
  it("should render pagination footer correctly", () => {
    const mockSetCurrentPage = jest.fn();
    const noOfPages = 10;
    const currentPage = 1;
    act(() => {
      render(
        <PaginationFooter
          setCurrentPage={mockSetCurrentPage}
          noOfPages={noOfPages}
          currentPage={currentPage}
        />
      );
    });
    const paginationFooter = screen.getByTestId("pagination-footer");
    expect(paginationFooter).toBeInTheDocument();

    const allListElements = paginationFooter.querySelectorAll("li");
    allListElements.forEach((elem) => {
      expect(elem).toHaveClass("page-item");
    });
    expect(allListElements[0]).toHaveTextContent("Previous"); // First element should be "previous" button.
    expect(allListElements[allListElements.length - 1]).toHaveTextContent(
      "Next"
    ); // Last element should be "next" button.

    // To check if numbered items are rendered correctly
    for (let i = 1; i < noOfPages; i++) {
      expect(allListElements[i]).toHaveTextContent(i.toString());
    }
    // Current page should be active.
    expect(allListElements[1]).toHaveTextContent(currentPage.toString());
    expect(allListElements[1]).toHaveClass("page-item active");
  });

  it("page link button should set current page", () => {
    const mockSetCurrentPage = jest.fn();
    mockSetCurrentPage.mockImplementation((cpage: number) => {
      currentPage = cpage;
    });
    const noOfPages = 10;
    let currentPage = 1;

    act(() => {
      render(
        <PaginationFooter
          setCurrentPage={mockSetCurrentPage}
          noOfPages={noOfPages}
          currentPage={currentPage}
        />
      );
    });
    const paginationFooter = screen.getByTestId("pagination-footer");
    const allListElements = paginationFooter.querySelectorAll(".page-link");
    const thirdPage = allListElements[3];
    expect(thirdPage).toHaveTextContent("3");
    (thirdPage as HTMLElement).click();
    expect(mockSetCurrentPage).toBeCalled();
    expect(currentPage).toBe(3); // page number changes from 1 to 3.
  });

  it("Next button should work", () => {
    const mockSetCurrentPage = jest.fn();
    const noOfPages = 10;
    let currentPage = 1;
    mockSetCurrentPage.mockImplementation((cpage: number) => {
      currentPage = cpage;
    });

    act(() => {
      render(
        <PaginationFooter
          setCurrentPage={mockSetCurrentPage}
          noOfPages={noOfPages}
          currentPage={currentPage}
        />
      );
    });
    const nextPageButton = screen.getByTestId("next-page");
    nextPageButton.click();
    expect(mockSetCurrentPage).toBeCalled();
    expect(currentPage).toBe(2);
  });

  it("Previous button should not work", () => {
    const mockSetCurrentPage = jest.fn();
    mockSetCurrentPage.mockImplementation((cpage: number) => {
      currentPage = cpage;
    });
    const noOfPages = 10;
    let currentPage = 2;

    act(() => {
      render(
        <PaginationFooter
          setCurrentPage={mockSetCurrentPage}
          noOfPages={noOfPages}
          currentPage={currentPage}
        />
      );
    });
    const previousPageButton = screen.getByTestId("previous-page");
    previousPageButton.click();
    expect(mockSetCurrentPage).toBeCalled();
    expect(currentPage).toBe(1);
  });

  it("Next button should not work", () => {
    const mockSetCurrentPage = jest.fn();
    const noOfPages = 10;
    let currentPage = 10;
    mockSetCurrentPage.mockImplementation((cpage: number) => {
      currentPage = cpage;
    });

    act(() => {
      render(
        <PaginationFooter
          setCurrentPage={mockSetCurrentPage}
          noOfPages={noOfPages}
          currentPage={currentPage}
        />
      );
    });
    const nextPageButton = screen.getByTestId("next-page");
    nextPageButton.click();
    expect(mockSetCurrentPage).not.toBeCalled();
    expect(currentPage).toBe(10);
  });

  it("Previous button should not work", () => {
    const mockSetCurrentPage = jest.fn();
    mockSetCurrentPage.mockImplementation((cpage: number) => {
      currentPage = cpage;
    });
    const noOfPages = 10;
    let currentPage = 1;

    act(() => {
      render(
        <PaginationFooter
          setCurrentPage={mockSetCurrentPage}
          noOfPages={noOfPages}
          currentPage={currentPage}
        />
      );
    });
    const previousPageButton = screen.getByTestId("previous-page");
    previousPageButton.click();
    expect(mockSetCurrentPage).not.toBeCalled();
    expect(currentPage).toBe(1);
  });
});
