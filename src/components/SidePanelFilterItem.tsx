export interface CheckboxCardSidePanelProps {
  filterLabel: string;
  handleCheckedValues: (items: string[]) => void;
  optionValues: string[];
  checkedItems: string[];
}

export const CheckboxCardSidePanel = (props: CheckboxCardSidePanelProps) => {
  const _checkedItems = [...props.checkedItems]; // To avoid modifying the state
  const { filterLabel, optionValues, handleCheckedValues } = props;
  const handleCheckboxEvent = (isChecked: boolean, checkedValue: string) => {
    const idx = _checkedItems.indexOf(checkedValue);
    if (isChecked && idx === -1) {
      _checkedItems.push(checkedValue);
    } else if (isChecked == false && idx !== -1) {
      _checkedItems.splice(idx, 1);
    }
    handleCheckedValues(_checkedItems);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="class-title">{filterLabel}</h5>
        <div className="row form-check card-text">
          {optionValues.map((ov) => {
            return (
              <label key={ov}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={ov}
                  defaultChecked={_checkedItems.indexOf(ov) >= 0}
                  onChange={(e) => handleCheckboxEvent(e.target.checked, ov)}
                />
                {ov}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export interface SelectionCardSidePanelProps {
  filterLabel: string;
  handleSelection: (selectedValue: string) => void;
  optionValues: string[];
  selectedItem: string;
}

export const SelectionCardSidePanel = (props: SelectionCardSidePanelProps) => {
  const { filterLabel, optionValues, selectedItem, handleSelection } = props;

  const handleDropDownEvent = (selectedValue: string) => {
    handleSelection(selectedValue);
  };
  return (
    <div className="card">
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
