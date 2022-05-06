import ForeignNamesItem from "./ForeignNamesItem";

export interface MagicCardItem {
  id: string;
  seqNo: number;
  name: string;
  text: string;
  rarity: string;
  layout: string;
  supertypes: string[];
  colors: string[];
  foreignNames: ForeignNamesItem[];
}
