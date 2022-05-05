export interface MagicCardDetail {
  // Common information
  id: string;
  layout: string;
  rarity: string;
  manacost: string;
  // Varies with language
  name: string;
  text: string;
  type: string;
  flavor: string;
  imageUrl: string;
  multiverseid: number;
}
