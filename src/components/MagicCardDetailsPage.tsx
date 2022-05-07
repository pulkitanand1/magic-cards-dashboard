import "./MagicCardDetailsPage.scss";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import LanguageContext from "../contexts/LanguageContext";
import {
  getDetailsForCardAsync,
  selectCardDetails,
} from "../features/magicCards/cardDetailsSlice";
import { ThemeContext } from "../contexts/ThemeContext";

interface MagiCardDetailsPageProps {
  selectedCardId: string;
}

/**
 * This component is rendered at location "magicCardDetails" and
 * shows the details of the card as per the language.
 * It shows the image of the card and a distinctive box shadow around it based
 * on the value of its "rarity" field. Each rarity value will render a different shadow.
 * @param props selectedCardId which is the card clicked on Dashboard.
 * @returns
 */
const MagiCardDetailsPage = (props: MagiCardDetailsPageProps) => {
  const [isFetchingComplete, setIsFetchingCompleted] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedCardId } = props;
  const { selectedLanguage } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);
  const cardDetails = useAppSelector(selectCardDetails);

  /**
   * Runs a dispatch after it receives a magic card Id through props.
   * Depends on selectedCardId as it's the only way it fetches data.
   */
  useEffect(() => {
    if (cardDetails && cardDetails.id !== "" && !isFetchingComplete) {
      dispatch(getDetailsForCardAsync(selectedCardId)).then(() => {
        setIsFetchingCompleted(true);
      });
    }
  }, [selectedCardId]);

  /**
   * Actual component to be rendered when details are received.
   * Until then, a loading icon is shown.
   */
  if (cardDetails && cardDetails.id && isFetchingComplete) {
    const _cardDetails = { ...cardDetails };
    const foreignName = _cardDetails?.foreignNames.find(
      (fn) => fn.language === selectedLanguage
    );
    if (foreignName) {
      _cardDetails.name = foreignName.name;
      _cardDetails.text = foreignName.text;
    }
    const rarityStr = _cardDetails.rarity.replace(" ", "-").toLowerCase(); // "Basic Land" becomes "basic-land"
    const rarityClass = `magicCard-${rarityStr}`;
    return (
      <div className="mw-100 row align-items-center justify-content-center text-center">
        <div className={isDark ? "detailsBox-dark" : "detailsBox-light"}>
          <div className="image-box mt-2 mb-2">
            <img
              className={`image-field ${rarityClass}`}
              src={_cardDetails.imageUrl}
            />
          </div>

          <h2>{_cardDetails.name}</h2>
          <h6>
            <i>Artist : {_cardDetails.artist}</i>
          </h6>
          <h6>Power: {_cardDetails.power}</h6>
          <h6>
            <i>Rarity: {_cardDetails.rarity}</i>
          </h6>
          <h6>Toughness: {_cardDetails.toughness}</h6>
          <h6>{_cardDetails.text}</h6>
        </div>
      </div>
    );
  }

  /**
   * Loading icon is shown by default.
   */
  return (
    <div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default MagiCardDetailsPage;
