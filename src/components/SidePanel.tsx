import { useState } from "react";
import { DashboardFilters } from "../dataTypes/DashboardFilters";
import DropDownData from "../utils/DropdownData";

import {
  CheckboxCardSidePanel,
  CheckboxCardSidePanelProps,
  SelectionCardSidePanel,
  SelectionCardSidePanelProps,
} from "./SidePanelFilterItem";

interface SidePanelProps {
  setCurrentPage: (currentPage: number) => void;
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
}

export default function SidePanel(props: SidePanelProps) {
  const { setCurrentPage, filters, setFilters } = { ...props };
  const [isFilterModified, setisFilterModified] = useState(false);
  const currentFilters = { ...filters }; // New object
  const { superTypes, colors, rarityOptions, pageSizes } = DropDownData;

  /**
   * Applies the filters to data fetched, and brings the result.
   */
  const handleApplyClick = () => {
    setisFilterModified(false);
    setFilters(currentFilters);
    setCurrentPage(1);
  };

  const handleFilterSelection = (
    checkedItems: string[],
    selectedItem: string,
    filterOption: string
  ) => {
    switch (filterOption) {
      case "colors":
        currentFilters.colors = checkedItems;
        break;
      case "superType":
        currentFilters.superType = selectedItem;
        break;
      case "rarity":
        currentFilters.rarity = selectedItem;
        break;
      case "pageSize":
        currentFilters.pageSize = parseInt(selectedItem);
        break;
    }
    if (!isFilterModified) {
      setisFilterModified(true);
    }
    setFilters(currentFilters);
  };

  const colorFilterProps: CheckboxCardSidePanelProps = {
    handleCheckedValues: (checkedValues: string[]) => {
      handleFilterSelection(checkedValues, "", "colors");
    },
    filterLabel: "Colors",
    optionValues: colors,
    checkedItems: currentFilters.colors,
  };

  const superTypeFilterProps: SelectionCardSidePanelProps = {
    handleSelection: (selectedValue: string) => {
      handleFilterSelection([], selectedValue, "superType");
    },
    filterLabel: "SuperType",
    optionValues: superTypes,
    selectedItem: currentFilters.superType,
  };

  const rarityFilterProps: SelectionCardSidePanelProps = {
    handleSelection: (selectedValue: string) => {
      handleFilterSelection([], selectedValue, "rarity");
    },
    filterLabel: "Rarity",
    optionValues: rarityOptions,
    selectedItem: currentFilters.rarity,
  };

  const pageSizeFilterProps: SelectionCardSidePanelProps = {
    handleSelection: (selectedValue: string) => {
      handleFilterSelection([], selectedValue, "pageSize");
    },
    filterLabel: "Page Size",
    optionValues: pageSizes,
    selectedItem: currentFilters.pageSize.toString(),
  };

  return (
    <div className="col-xl-2 col-md mt-2">
      <CheckboxCardSidePanel {...colorFilterProps} />
      <SelectionCardSidePanel {...superTypeFilterProps} />
      <SelectionCardSidePanel {...rarityFilterProps} />
      <SelectionCardSidePanel {...pageSizeFilterProps} />
      <button
        className="btn btn-primary mt-3 justify-content-center"
        disabled={!isFilterModified}
        onClick={handleApplyClick}
      >
        Apply
      </button>
    </div>
  );
}
