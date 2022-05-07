import { useContext, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface SearchFormProps {
  handleSearchButtonClick: (searchTextValue: string) => void;
  isVisible: boolean;
}

const SearchForm = ({
  handleSearchButtonClick,
  isVisible,
}: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDark } = useContext(ThemeContext);
  if (isVisible) {
    return (
      <form
        className="d-flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchButtonClick(inputRef.current?.value as string);
        }}
      >
        <input
          className="form-control me-2"
          ref={inputRef}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className={isDark ? `btn btn-light` : `btn btn-dark`}
          type="submit"
        >
          Search
        </button>
      </form>
    );
  } else {
    return <></>;
  }
};

export default SearchForm;
