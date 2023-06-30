import {useState} from "react";

import { fetchFromApi } from "../../api/api.js";
import {SearchBar} from "../../components/SearchBar.jsx";

export const Home = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState({})
    const [isValidUrl, setIsValidUrl] = useState(true);

    const validateUrl = (string) => {
        return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(string);
      };

      const handleSearch = (url) => {
        console.log(url)
        const withHttps = (url) =>
          url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schema, nonSchemaUrl) =>
            schema ? match : `https://${nonSchemaUrl}`
          );
        const cleanedUrl = withHttps(url)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
    
        if (validateUrl(cleanedUrl)) {
          setIsValidUrl(true);
          getData(cleanedUrl)
        } else {
          setIsValidUrl(false);
        }
      };

    const getData = search => {
        setData(fetchFromApi(search))
    }

    return (
        <>
            <SearchBar search={search} setSearch={(q)=>setSearch(q)} action={()=>handleSearch(search)} isValid={isValidUrl} />
            <h1>home</h1>
                <h2>Score total : {data.categories && `${data.categories.performance.score * 100} %`}</h2>
                {console.log(data)}
            {data.audits &&
                Object.entries(data.audits)
                    .map(([key, value]) => {
                        if (value.score !== null && value.score !== 0) {
                            return {
                                key,
                                score: value.score,
                                title: value.title,
                                description: value.description,
                            };
                        }
                        return null;
                    })
                    .filter((item) => item !== null)
                    .sort((a, b) => b.score - a.score)
                    .map((item) => (
                        <div className="p-5 bg-slate-50" key={item.key}>
                            <h1>Title: {item.title}</h1>
                            <h2>Score: {item.score * 100} %</h2>
                            <p>Desc: {item.description}</p>
                        </div>
                    ))}

        </>
    )
}