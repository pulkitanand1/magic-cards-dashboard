import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import LanguageContext from "../contexts/LanguageContext";
import { selectCardDetails } from "../features/magicCards/cardDetailsSlice";

interface MagiCardDetailsPageProps {
  isDetailLoaded: boolean;
}

const MagiCardDetailsPage = ({ isDetailLoaded }: MagiCardDetailsPageProps) => {
  const cardDetails = useAppSelector(selectCardDetails);
  const { selectedLanguage } = useContext(LanguageContext);

  const foreignName = cardDetails.foreignNames.find(
    (fn) => fn.language === selectedLanguage
  );

  if (!isDetailLoaded) {
    return <h1>Loading...</h1>;
  }

  if (foreignName) {
    return (
      <div>
        <Link to="/">Dashboard</Link>
        <h3>{foreignName.name}</h3>
        <h6>{foreignName.text}</h6>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">Dashboard</Link>
      <h3>{cardDetails.name}</h3>
      <h6>{cardDetails.text}</h6>
    </div>
  );
};

export default MagiCardDetailsPage;
