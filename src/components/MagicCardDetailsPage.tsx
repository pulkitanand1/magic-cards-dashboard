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

const MagiCardDetailsPage = (props: MagiCardDetailsPageProps) => {
  const [isFetchingComplete, setIsFetchingCompleted] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedCardId } = props;
  const { selectedLanguage } = useContext(LanguageContext);
  const { isDark } = useContext(ThemeContext);
  const cardDetails = useAppSelector(selectCardDetails);

  useEffect(() => {
    if (cardDetails && cardDetails.id !== "" && !isFetchingComplete) {
      dispatch(getDetailsForCardAsync(selectedCardId)).then(() => {
        setIsFetchingCompleted(true);
      });
    }
  }, [selectedCardId]);

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

  return (
    <div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default MagiCardDetailsPage;
