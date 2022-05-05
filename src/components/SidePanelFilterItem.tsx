interface SidePanelFilterPropType {
  filterLabel: string;
  handleSelection: (items: string[]) => void;
  selectionItems: string[];
  inputType: string;
}

const SidePanelFilterItem = ({
  filterLabel,
  handleSelection,
  selectionItems,
  inputType,
}: SidePanelFilterPropType) => {




  return (
    <div className="card">
      <div className="card-body">
        <h5 className="class-title">{filterLabel}</h5>
        <div className="row form-check card-text">
          {(inputType === "checkbox" &&
            selectionItems.map((si) => {
              return (
                <label key={si}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={si}
                    defaultChecked={true}
                  />
                  {si}
                </label>
              );
            })) ||
            (inputType === "select" && (
              <div className="card-body p-0">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {selectionItems[0]}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {
                    selectionItems.map(item => <li key={item} className="dropdown-item">{item}</li>)
                  }
                </ul>
              </div>

            ))}
        </div>
      </div>
    </div>
  );
};

interface CheckboxCardSidePanelProps {
  filterLabel: string;
  handleSelection: (items: string[]) => void;
  selectionItems: string[];
}

export const CheckboxCardSidePanel = (props: CheckboxCardSidePanelProps) => {
  const passThruProps = { ...props, inputType: "checkbox" };
  return <SidePanelFilterItem {...passThruProps} />;
};

export const SelectionCardSidePanel = (props: CheckboxCardSidePanelProps) => {
  const passThruProps = { ...props, inputType: "select" };
  return <SidePanelFilterItem {...passThruProps} />;
};
