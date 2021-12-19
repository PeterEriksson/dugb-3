function SearchSuggestion({ item, setSearchText, inputRef }) {
  const handleSuggClick = () => {
    inputRef.current.focus();
    setSearchText(item?.displayName);
  };
  return (
    <div
      onClick={handleSuggClick}
      className="py-1 px-2 hover:bg-gray-300  cursor-pointer drop-shadow-sm rounded-full bg-grayish border border-gray-300"
    >
      <p className=" text-sm font-normal">{item?.displayName}</p>
    </div>
  );
}

export default SearchSuggestion;
