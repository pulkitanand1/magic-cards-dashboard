import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export interface SelectionCardSidePanelProps {
  filterLabel: string;
  handleSelection: (selectedValue: string) => void;
  optionValues: string[];
  selectedItem: string;
}

export const SelectionCardSidePanel = (props: SelectionCardSidePanelProps) => {
  const { filterLabel, optionValues, selectedItem, handleSelection } = props;

  const themeContext = useContext(ThemeContext);

  const cardTheme = {
    background: themeContext.theme.background,
    color: themeContext.theme.foreground,
    border: "2px solid " + themeContext.theme.foreground,
  };

  const handleDropDownEvent = (selectedValue: string) => {
    handleSelection(selectedValue);
  };
  return (
    <div className="card mb-2 rounded-3" style={cardTheme}>
      <div className="card-body">
        <h5 className="class-title">{filterLabel}</h5>
        <div className="row form-check card-text">
          {
            <div className="card-body p-0">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedItem}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {optionValues.map((item) => (
                  <li
                    key={item}
                    className="dropdown-item"
                    onClick={() => handleDropDownEvent(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
