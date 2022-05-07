import axios from "axios";
import { MagicCardItem } from "../../dataTypes/MagicCardItem";

/**
 * Fetches a list of cards from the API.
 * @returns A promise with list of cards.
 */
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

/**
 * Returns the magic card details object to be rendered on magic card details page.
 * @param id : selected card id.
 * @returns the magic card data object.
 */
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
