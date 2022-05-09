import { useContext, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

interface SearchFormProps {
  handleSearchButtonClick: (searchTextValue: string) => void;
  isVisible: boolean;
}

/**
 * It renders a search box along with search button on click
 * of which the search operation is performed - data is fetched through
 * the API call and then filtered with the searchBoxText value later.
 * SearchBox needs to be disabled for MagicCardDetails page, thus
 * an "isVisible" property is used to toggle its visibility.
 * @param handleSearchButtonClick event and isVisible value.
 * @returns
 */
const SearchForm = ({
  handleSearchButtonClick,
  isVisible,
}: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDark } = useContext(ThemeContext);
  if (isVisible) {
    return (
      <form
        data-testid="search-form"
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
          data-testid="search-button"
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
