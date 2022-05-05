import ForeignNamesItem from "./ForeignNamesItem";

export interface MagicCardItem {
  id: string;
  seqNo: number;
  name: string;
  rarity: string;
  layout: string;
  foreignNames: ForeignNamesItem[];
}
