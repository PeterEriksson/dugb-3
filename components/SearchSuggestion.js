function SearchSuggestion({ item, setSearchText }) {
  return (
    <div
      onClick={() => setSearchText(item?.displayName)}
      className="py-1 px-2 hover:bg-gray-300  cursor-pointer drop-shadow-sm rounded-full bg-grayish border border-gray-300"
    >
      <p className=" text-sm font-normal">{item?.displayName}</p>
    </div>
  );
}

export default SearchSuggestion;
