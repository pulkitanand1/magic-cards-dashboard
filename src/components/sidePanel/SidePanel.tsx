import { useState } from "react";
import { DashboardFilters } from "../../dataTypes/DashboardFilters";
import DropDownData, { intialFilterState } from "../../utils/DropdownData";
import {
  CheckboxCardSidePanel,
  CheckboxCardSidePanelProps,
} from "./CheckboxCardSidePanel";
import {
  SelectionCardSidePanel,
  SelectionCardSidePanelProps,
} from "./SelectionCardSidePanel";

interface SidePanelProps {
  filters: DashboardFilters;
  handleSetFilters: (filters: DashboardFilters) => void;
}

/**
 * This components renders various cards which are used for filteration and "Apply"
 * and "Reset" button to toggle and apply filteration on "Searched" data.
 * The filters can only be applied on existing data as the API doesn't allow
 * filters to be sent within the URL.
 * @param props : setCurrentPage function, filters and a function that sets the filters.
 * @returns
 */
export default function SidePanel(props: SidePanelProps) {
  const { filters, handleSetFilters } = { ...props };
  const [localFilters, setLocalFilters] = useState(filters); // Local state to be maintained to keep changes till apply button is clicked.
  const { superTypes, colors, rarityOptions, pageSizes } = DropDownData;

  /**
   * Applies the filters to data fetched, and brings the result.
   */
  const handleApplyClick = () => {
    const newFilters = { ...localFilters };
    newFilters.searchText = filters.searchText;
    handleSetFilters(newFilters);
  };

  /**
   * Resets the filters to their initial values.
   */
  const handleResetFilters = () => {
    const newFilterState = { ...intialFilterState };
    newFilterState.searchText = filters.searchText;
    setLocalFilters(newFilterState);
    handleSetFilters(newFilterState);
  };

  /**
   *
   * @param checkedItems : The values checked on checkbox type control.
   * @param selectedItem : The value selected on dropdown.
   * @param filterOption : The data "field" for which the value was selected.
   */
  const handleFilterSelection = (
    checkedItems: string[],
    selectedItem: string,
    filterOption: string
  ) => {
    const newFilters = { ...localFilters }; // In order to issue change detection
    switch (filterOption) {
      case "colors":
        newFilters.colors = checkedItems;
        break;
      case "superType":
        newFilters.superType = selectedItem;
        break;
      case "rarity":
        newFilters.rarity = selectedItem;
        break;
      case "pageSize":
        newFilters.pageSize = parseInt(selectedItem);
        break;
    }
    setLocalFilters(newFilters);
  };

  const colorFilterProps: CheckboxCardSidePanelProps = {
    handleCheckedValues: (checkedValues: string[]) => {
      handleFilterSelection(checkedValues, "", "colors");
    },
    filterLabel: "Colors",
    optionValues: colors,
    checkedItems: localFilters.colors,
  };

  const superTypeFilterProps: SelectionCardSidePanelProps = {
    handleSelection: (selectedValue: string) => {
      handleFilterSelection([], selectedValue, "superType");
    },
    filterLabel: "SuperType",
    optionValues: superTypes,
    selectedItem: localFilters.superType,
  };

  const rarityFilterProps: SelectionCardSidePanelProps = {
    handleSelection: (selectedValue: string) => {
      handleFilterSelection([], selectedValue, "rarity");
    },
    filterLabel: "Rarity",
    optionValues: rarityOptions,
    selectedItem: localFilters.rarity,
  };

  const pageSizeFilterProps: SelectionCardSidePanelProps = {
    handleSelection: (selectedValue: string) => {
      handleFilterSelection([], selectedValue, "pageSize");
    },
    filterLabel: "Page Size",
    optionValues: pageSizes,
    selectedItem: localFilters.pageSize.toString(),
  };

  return (
    <div className="col-xl-2 col-md mt-2" data-testid="side-panel">
      <CheckboxCardSidePanel {...colorFilterProps} />
      <SelectionCardSidePanel {...superTypeFilterProps} />
      <SelectionCardSidePanel {...rarityFilterProps} />
      <SelectionCardSidePanel {...pageSizeFilterProps} />
      <button
        data-testid="apply-button"
        className="btn btn-primary m-3 justify-content-center"
        onClick={handleApplyClick}
      >
        Apply
      </button>
      <button
        data-testid="reset-button"
        className="btn btn-success m-3 justify-content-center"
        onClick={handleResetFilters}
      >
        Reset
      </button>
    </div>
  );
}
