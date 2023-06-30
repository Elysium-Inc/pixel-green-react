export const SearchBar = ({search, setSearch, action}) => {
    return(
        <>
            <div className="flex justify-center py-5 gap-6 drop-shadow-lg">
                <input type="text"
                       className=" w-[50%] py-3 px-5 border border-green-50 rounded  focus:outline-2 focus:outline-green-50 "
                       placeholder="Entrez un url"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-green-50 px-3 rounded  h-auto hover:bg-green-600 hover:transition-colors hover:duration-500" onClick={action}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
        </>
    )
}