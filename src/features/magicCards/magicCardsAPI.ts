import axios from "axios";
import { MagicCardItem } from "../../dataTypes/MagicCardItem";

export async function fetchCardsAsync(): Promise<MagicCardItem[]> {
  const url = `https://api.magicthegathering.io/v1/cards`;
  return await axios(url)
    .then((json) => {
      if (json) {
        return json.data.cards;
      }
      return [];
    })
    .catch((error) => console.error(error));
}

export async function getCardDetailsAsync(id: string): Promise<MagicCardItem> {
  const url = `https://api.magicthegathering.io/v1/cards/${id}`;
  return await axios(url)
    .then((json) => {
      if (json) {
        return json.data.card;
      }
      return [];
    })
    .catch((error) => console.error(error));
}
