import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { DashboardFilters } from "../DataTypes/DashboardFilters";
import {
  getCardsForDashboardAsync,
  selectCards,
} from "../features/magicCards/cardsDashboardSlice";

export default function Dashboard() {
  const cards = useAppSelector(selectCards);
  const dispatch = useAppDispatch();

  const filters: DashboardFilters = {
    language: "Eng",
    pageSize: 50,
  };

  useEffect(() => {
    dispatch(getCardsForDashboardAsync(filters));
  }, [cards]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-2 col-md-3 mt-3">
          <div className="card">
            <div className="card-body">
              <h5 className="class-title">{"Color"}</h5>
              <div className="card-text row form-check">
                <label>
                  <input className="form-check-input" type="checkbox" /> black
                </label>
                <label>
                  <input className="form-check-input" type="checkbox" /> white
                </label>
              </div>
            </div>
          </div>
          <button>Apply</button>
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
