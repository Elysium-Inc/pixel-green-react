export const SearchBar = ({search, setSearch, action, isValid}) => {


    const handleChange = e => {
        setSearch(e)
    }

    const confirmEnter = e => {
        if(e.key === 'Enter') {
            action()
        }
        return
    }

    return (
        <>
            <div className="h-32 box-content">
                <div className="flex justify-center py-5 gap-6 drop-shadow-lg">
                    <div className="relative">
                        <input onKeyDown={(e) => confirmEnter(e)} type="text" id="floating_filled" className={`w-[100%] py-3 pt-5 px-5 border ${isValid && search ? "border-green-50 rounded focus:outline-2 focus:outline-green-50" : "border-red-500 rounded focus:outline-2 focus:outline-red-500"}`}
                        value={search}
                        onChange={e => handleChange(e.target.value)}
                        />
                        <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Tapez votre URL</label>
                    </div>
                    <button className="bg-green-50 px-3 rounded  h-auto hover:bg-green-600 hover:transition-colors hover:duration-500" onClick={action}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
                { !isValid && search && 
                    <div>
                        <p className="mb-3 text-center text-red-500">Url invalide, merci de bien vouloir réessayer</p>
                    </div>
                }
            </div>
        </>
    )
}