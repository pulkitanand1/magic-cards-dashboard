import "./Dashboard.scss";
import { useContext } from "react";
import { useAppSelector } from "../app/hook";
import LanguageContext from "../contexts/LanguageContext";
import { selectCards } from "../features/magicCards/cardsDashboardSlice";
import PaginationFooter from "./PaginationFooter";
import SidePanel from "./SidePanel";
import {
  applyFilterOnMagicCards,
  getPaginatedResult,
} from "../utils/DataManipulators";
import { DashboardFilters } from "../dataTypes/DashboardFilters";
import { Link } from "react-router-dom";

interface DashboardProps {
  filters: DashboardFilters;
  setFilters: (modifiedFilterData: DashboardFilters) => void;
  currentPage: number;
  setCurrentPage: (pageNo: number) => void;
  handleMagicCardClick: (id: string) => void;
}

export default function Dashboard({
  filters,
  setFilters,
  currentPage,
  setCurrentPage,
  handleMagicCardClick,
}: DashboardProps) {
  const { selectedLanguage } = useContext(LanguageContext);

  const magicCards = applyFilterOnMagicCards(
    useAppSelector(selectCards), // Magic Cards from state
    selectedLanguage,
    filters
  );

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
          <div>
            <h3 className="text-dark p-1">
              {paginatedResult.length === 0
                ? "No Records found. Try searching or modify filters."
                : `Total: ${magicCards.length} records`}
            </h3>
          </div>

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
