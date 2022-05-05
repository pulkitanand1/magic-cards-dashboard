import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import LanguageContext from "../Contexts/LanguageContext";
import { DashboardFilters } from "../DataTypes/DashboardFilters";
import { MagicCardItem } from "../DataTypes/MagicCardItem";
import {
  getCardsForDashboardAsync,
  selectCards,
} from "../features/magicCards/cardsDashboardSlice";
import {
  CheckboxCardSidePanel,
  SelectionCardSidePanel,
} from "./SidePanelFilterItem";
import "./Dashboard.scss";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { selectedLanguage } = useContext(LanguageContext);

  const intialFilterState: DashboardFilters = {
    language: "English",
    pageSize: 50,
    colors: [],
    rarity: [],
    superTypes: [],
  };
  const [filters, setFilters] = useState(intialFilterState);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCards = (cards: MagicCardItem[]) => {
    // Only cards that have foreign names are allowed
    let _cards = [...cards].filter((card) => card.foreignNames !== undefined);

    // noOfPages is only updated when data has been fetched.

    _cards = _cards.map((card, idx) => {
      const _card = { ...card };

      if (selectedLanguage !== "English") {
        const foreignNameByLanguage = card.foreignNames.find(
          (fn) => fn.language === selectedLanguage
        );
        if (foreignNameByLanguage) {
          _card.name = foreignNameByLanguage.name;
        }
      }
      _card.seqNo = idx + 1;
      return _card;
    });
    _cards.sort((a, b) => a.layout.localeCompare(b.layout));
    return _cards;
  };

  const magicCards = filteredCards(useAppSelector(selectCards)); // InitialState

  /**
   * Dispatches filteration on the basis of selected colors.
   * @param colors Selected Colors on the left pane
   */
  const handleColorSelection = (colors: string[]) => {
    filters.colors = colors;
    setFilters(filters);
  };

  const noOfPages = Math.ceil(magicCards.length / filters.pageSize);

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

  const props = {
    handleSelection: handleColorSelection,
    filterLabel: "Colors",
    selectionItems: ["black", "white"],
  };

  /**
   * When language is changed in the context.
   */
  useEffect(() => {
    if (filters.language !== selectedLanguage) {
      filters.language = selectedLanguage;
      setFilters(filters);
    }
  }, [selectedLanguage]);

  const handleApplyClick = () => {
    setCurrentPage(1);
    dispatch(getCardsForDashboardAsync());
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-2 col-md-3 mt-2">
          <CheckboxCardSidePanel {...props} />
          <SelectionCardSidePanel {...props} />
          <button
            className="btn btn-primary mt-3 justify-content-center"
            onClick={handleApplyClick}
          >
            Apply
          </button>
        </div>
        <div className="col-xl-10 col-md-9">
          <div className="magicCardsGrid table-responsive border border-primary p-1 m-2">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Layout</th>
                  <th scope="col">Rarity</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {magicCards.map((card) => {
                  return (
                    <tr key={card.id}>
                      <td>{card.seqNo}</td>
                      <td>{card.name}</td>
                      <td>{card.layout}</td>
                      <td>{card.rarity}</td>
                      <td>
                        <button className="btn btn-outline-primary">
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
                Array.from({ length: noOfPages }, (_, i) => i + 1).map(
                  (pageNo) => {
                    return (
                      <li
                        key={pageNo}
                        className={
                          currentPage === pageNo
                            ? "page-item active"
                            : "page-item"
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
                  }
                ),
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
        </div>
      </div>
    </div>
  );
}
