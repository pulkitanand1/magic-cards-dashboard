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
    <div className="container-xxl my-md-4 bd-layout">
      <aside className="bd-sidebar">
        <div className="bd-links">
          <ul>
            <li>hi</li>
          </ul>
        </div>
      </aside>

      <main className="bd-main order-1">
        <div className="row">
          {cards.map((card) => {
            return (
              <div key={card.id} className="col-sm-3">
                <div className="card">
                  <div className="card-body">
                    <h6 className="class-title">{card.name}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
