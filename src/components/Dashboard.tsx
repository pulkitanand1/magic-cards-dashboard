import "./Dashboard.scss";
import { useContext } from "react";
import { useAppSelector } from "../app/hook";
import LanguageContext from "../contexts/LanguageContext";
import { selectCards } from "../features/magicCards/cardsDashboardSlice";
import PaginationFooter from "./PaginationFooter";
import SidePanel from "./sidePanel/SidePanel";
import {
  applyFilterOnMagicCards,
  getPaginatedResult,
} from "../utils/DataManipulators";
import { DashboardFilters } from "../dataTypes/DashboardFilters";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

interface DashboardProps {
  filters: DashboardFilters;
  handleSetFilters: (modifiedFilterData: DashboardFilters) => void;
  currentPage: number;
  setCurrentPage: (pageNo: number) => void;
  handleMagicCardClick: (id: string) => void;
}

/**
 * This component renders the data grid, pagination footer and side panel
 * and performs the filteration on data fetched after search.
 * @param param filters and current page from Parent component.
 * @returns
 */
export default function Dashboard({
  filters,
  handleSetFilters,
  currentPage,
  setCurrentPage,
  handleMagicCardClick,
}: DashboardProps) {
  const { selectedLanguage } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);

  // Getting data post filteration.
  const magicCards = applyFilterOnMagicCards(
    useAppSelector(selectCards), // Magic Cards from state
    selectedLanguage,
    filters
  );

  const sidePanelPassThruProps = {
    filters,
    handleSetFilters,
  };

  const noOfPages = Math.ceil(magicCards.length / filters.pageSize);
  const paginationPassThruProps = {
    noOfPages,
    currentPage,
    setCurrentPage,
  };

  const paginatedResult = getPaginatedResult(magicCards, filters, currentPage);

  return (
    <div className="container-fluid" data-testid="dashboard">
      <div className="row">
        <SidePanel {...sidePanelPassThruProps} />
        <div className="col-xl-10 col-md-9">
          <div>
            <h3 className={isDark ? `text-light p-1` : `p-1`}>
              {paginatedResult.length === 0
                ? "No Records found. Please check Search box and Filter values."
                : `Total: ${magicCards.length} records`}
            </h3>
          </div>

          {paginatedResult.length > 0 && (
            <div
              className={`magicCardsGrid table-responsive border rounded-3  m-2 ${
                isDark ? " border-light" : "border-dark"
              }`}
            >
              <table className={`table text-${isDark ? "light" : "dark"}`}>
                <thead className={`sticky-top bg-${isDark ? "dark" : "body"}`}>
                  <tr>
                    <th scope="col" className="col-md-1">
                      #
                    </th>
                    <th scope="col" className="col-md-3">
                      Name
                    </th>
                    <th scope="col" className="col-md-2">
                      Color
                    </th>
                    <th scope="col" className="col-md-2">
                      SuperType
                    </th>
                    <th scope="col" className="col-md-2">
                      Layout
                    </th>
                    <th scope="col" className="col-md-2">
                      Rarity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResult.map((card) => {
                    return (
                      <tr key={card.id}>
                        <td>{card.seqNo}</td>
                        <td>
                          <Link
                            onClick={() => {
                              handleMagicCardClick(card.id);
                            }}
                            to="/magicCardDetails"
                          >
                            {card.name}
                          </Link>
                        </td>
                        <td>{card.colors}</td>
                        <td>
                          {card.supertypes === undefined
                            ? "None"
                            : card.supertypes}
                        </td>
                        <td>{card.layout}</td>
                        <td>{card.rarity}</td>
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
