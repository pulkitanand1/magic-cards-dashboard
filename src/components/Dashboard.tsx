import "./Dashboard.scss";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../app/hook";
import LanguageContext from "../contexts/LanguageContext";
import { DashboardFilters } from "../dataTypes/DashboardFilters";
import { selectCards } from "../features/magicCards/cardsDashboardSlice";
import PaginationFooter from "./PaginationFooter";
import SidePanel from "./SidePanel";
import {
  applyFilterOnMagicCards,
  getPaginatedResult,
} from "../utils/DataManipulators";

export default function Dashboard() {
  const { selectedLanguage } = useContext(LanguageContext);

  const intialFilterState: DashboardFilters = {
    language: "English",
    pageSize: 50,
    colors: [],
    rarity: "All",
    superType: "All",
  };
  const [filters, setFilters] = useState(intialFilterState);
  const [currentPage, setCurrentPage] = useState(1);

  const magicCards = applyFilterOnMagicCards(
    useAppSelector(selectCards),
    selectedLanguage,
    filters
  ); // InitialState

  /**
   * When language is changed in the context.
   */
  useEffect(() => {
    if (filters.language !== selectedLanguage) {
      filters.language = selectedLanguage;
      setFilters(filters);
    }
  }, [selectedLanguage]);

  const sidePanelPassThruProps = {
    setCurrentPage,
    filters,
    setFilters,
  };

  const noOfPages = Math.ceil(magicCards.length / filters.pageSize);
  const paginationPassThruProps = {
    noOfPages,
    currentPage,
    setCurrentPage,
  };

  const paginatedResult = getPaginatedResult(magicCards, filters, currentPage);

  return (
    <div className="container-fluid">
      <div className="row">
        <SidePanel {...sidePanelPassThruProps} />
        <div className="col-xl-10 col-md-9">
          <h3 className="text-dark p-2">
            {paginatedResult.length === 0
              ? "No Records found"
              : `Total: ${magicCards.length} records`}
          </h3>
          {paginatedResult.length > 0 && (
            <div className="magicCardsGrid table-responsive border border-primary p-1 m-2">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="col-md-1">
                      #
                    </th>
                    <th scope="col" className="col-l">
                      Name
                    </th>
                    <th scope="col" className="col-md-2">
                      Layout
                    </th>
                    <th scope="col" className="col-md-2">
                      Rarity
                    </th>
                    <th scope="col" className="col-md-2">
                      Card Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResult.map((card) => {
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
          )}
          {paginatedResult.length > 0 && noOfPages > 1 && (
            <PaginationFooter {...paginationPassThruProps} />
          )}
        </div>
      </div>
    </div>
  );
}
