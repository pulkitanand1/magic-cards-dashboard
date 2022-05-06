import { DashboardFilters } from "../dataTypes/DashboardFilters";
import { MagicCardItem } from "../dataTypes/MagicCardItem";

export const applyFilterOnMagicCards = (
  cards: MagicCardItem[],
  selectedLanguage: string,
  filters: DashboardFilters
) => {
  // Pure function, no data is being modified. A new array will be returned.
  let _cards = [...cards].filter((card) => validateWithFilters(card, filters));

  _cards = _cards.map((card, idx) => {
    const _card = { ...card };

    if (selectedLanguage !== "English") {
      const foreignNameByLanguage = card.foreignNames.find(
        (fn) => fn.language === selectedLanguage
      );
      if (foreignNameByLanguage) {
        _card.name = foreignNameByLanguage.name;
      }
    }
    _card.seqNo = idx + 1;
    return _card;
  });
  _cards.sort((a, b) => a.layout.localeCompare(b.layout));
  return _cards;
};

const validateWithFilters = (
  card: MagicCardItem,
  filters: DashboardFilters
): boolean => {
  let isValid = true;
  isValid =
    card.foreignNames !== undefined &&
    (filters.rarity === "All" || card.rarity === filters.rarity) &&
    (filters.superType === "All" ||
      card.supertypes?.some((superType) => filters.superType === superType)) &&
    (filters.colors.length === 0 ||
      card.colors.some((color) => filters.colors.indexOf(color) >= 0));
  return isValid;
};

/**
 * Slices the result according to page size in filter.
 * @param cards Filtered cards to be paginated
 * @returns paginated cards
 */
export const getPaginatedResult = (
  filteredCards: MagicCardItem[],
  filters: DashboardFilters,
  currentPage: number
): MagicCardItem[] => {
  const startIndex = filters.pageSize * (currentPage - 1);
  const endIndex = startIndex + filters.pageSize;

  if (endIndex > filteredCards.length) {
    return filteredCards.slice(startIndex, filteredCards.length);
  }
  return filteredCards.slice(startIndex, endIndex);
};
