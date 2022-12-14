import { useParams } from "react-router-dom";

const SearchResults = ({ type }) => {
  const { query } = useParams();

  return (
    <div>
      <h3>{type}</h3>
    </div>
  );
};

export default SearchResults;
