import { DashboardFilters } from "../dataTypes/DashboardFilters";

const DropDownData = {
  languagesList: [
    "English",
    "French",
    "Chinese Simplified",
    "Japanese",
    "German",
  ],
  superTypes: ["All", "Basic", "Host", "Legendary", "Ongoing", "Snow", "World", "None"],

  colors: ["White", "Blue"],

  rarityOptions: [
    "All",
    "Common",
    "Uncommon",
    "Rare",
    "Mythic Rare",
    "Special",
    "Basic Land",
  ],
  pageSizes: ["10", "25", "50"],
};

export const intialFilterState: DashboardFilters = {
  language: "English",
  pageSize: 50,
  colors: [],
  rarity: "All",
  superType: "All",
  searchText: "",
};

export default DropDownData;
