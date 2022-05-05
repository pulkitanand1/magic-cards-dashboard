import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { DashboardFilters } from "../DataTypes/DashboardFilters";
import {
  getCardsForDashboardAsync,
  selectCards,
} from "../features/magicCards/cardsDashboardSlice";
import { CheckboxCardSidePanel, SelectionCardSidePanel } from "./SidePanelFilterItem";

export default function Dashboard() {
  const intialFilterState: DashboardFilters = {
    language: "English",
    pageSize: 50,
    colors: [],
    rarity: [],
    superTypes: [],
  };
  const [filters, setFilters] = useState(intialFilterState);


  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);


  const handleColorSelection = (colors: string[]) => {
    filters.colors = colors;
    setFilters(filters);
  };

  const props = {
    handleSelection: handleColorSelection,
    filterLabel: "Colors",
    selectionItems: ["black", "white"]
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-2 col-md-3 mt-2">
          <CheckboxCardSidePanel {...props} />
          <SelectionCardSidePanel {...props} />
          <button className="btn btn-primary" onClick={() => dispatch(getCardsForDashboardAsync(filters))}>Fetch Data</button>
        </div>

        <div className="col-xl-10 col-md-9">
          <div className="row row-cols-1 row-cols-md-5 g-2 mt-1">
            {cards.map((card) => {
              return (
                <div key={card.id} className="col">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="class-title">{card.name}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
