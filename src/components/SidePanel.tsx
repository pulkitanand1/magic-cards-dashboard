import { useState } from "react";
import { DashboardFilters } from "../dataTypes/DashboardFilters";
import DropDownData from "../utils/DropdownData";
import {
  CheckboxCardSidePanel,
  CheckboxCardSidePanelProps,
} from "./CheckboxCardSidePanel";
import {
  SelectionCardSidePanel,
  SelectionCardSidePanelProps,
} from "./SelectionCardSidePanel";

interface SidePanelProps {
  setCurrentPage: (currentPage: number) => void;
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
}

export default function SidePanel(props: SidePanelProps) {
  const { setCurrentPage, filters, setFilters } = { ...props };
  const [isFilterModified, setisFilterModified] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters); // Local state to be maintained to keep changes till apply button is clicked.
  const { superTypes, colors, rarityOptions, pageSizes } = DropDownData;

  /**
   * Applies the filters to data fetched, and brings the result.
   */
  const handleApplyClick = () => {
    setisFilterModified(false);
    setFilters(localFilters);
    setCurrentPage(1);
  };

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
    if (!isFilterModified) {
      setisFilterModified(true);
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
