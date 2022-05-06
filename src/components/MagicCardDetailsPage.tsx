import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import LanguageContext from "../contexts/LanguageContext";
import {
  getDetailsForCardAsync,
  selectCardDetails,
} from "../features/magicCards/cardDetailsSlice";

interface MagiCardDetailsPageProps {
  selectedCardId: string;
}

const MagiCardDetailsPage = (props: MagiCardDetailsPageProps) => {
  const [isFetchingComplete, setIsFetchingCompleted] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedCardId } = props;
  const { selectedLanguage } = useContext(LanguageContext);
  const cardDetails = useAppSelector(selectCardDetails);

  useEffect(() => {
    console.log("card details effect");
    if (cardDetails && cardDetails.id !== "") {
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
    return (
      <div>
        <h3>{_cardDetails.name}</h3>
        <h6>{_cardDetails.text}</h6>
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
