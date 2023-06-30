import {useState} from "react";

import { fetchFromApi } from "../../api/api.js";
import { SearchBar } from "../../components/SearchBar.jsx";
import { ProgressCircle } from '../../components/ProgressCircle'

export const Home = () => {
    const [search, setSearch] = useState('')
    const [globalPerformance, setGlobalPerformance] = useState({})
    const [audits, setAudits] = useState({})
    const [auditUrl, setAuditUrl] = useState('')
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
          setTimeout(() => {
              getData(cleanedUrl)
          }, 300);
        } else {
          setIsValidUrl(false);
        }
      };

    const getData = async search => {
        const data = await fetchFromApi(search)
        const {categories, audits, finalUrl} = data
        const {performance} = categories
        setGlobalPerformance(performance)
        setAuditUrl(finalUrl)

        const mappedAudits = 
        Object.entries(audits)
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


        setAudits(mappedAudits)
    }

    return (
        <>
            <SearchBar search={search} setSearch={(q)=>setSearch(q)} action={()=>handleSearch(search)} isValid={isValidUrl} />
            {globalPerformance.score &&
            <div>
                <h2>Score global pour {auditUrl}</h2>
                <ProgressCircle score={(globalPerformance.score * 100)}/>
            </div>
            }
            {audits.length > 0 && audits.map(item => (
                <div className="p-5 bg-slate-50" key={item.key}>
                    {item.score >= 0.9 &&
                        <div className='text-green-700'>
                            <h1>{item.title}</h1>
                            <h2>{item.score * 100} %</h2>
                        </div>
                    }
                    {
                        
                    }
                    {item.score < 0.9 
                    ? <p>{item.description}</p>
                    : ''
                    }
                </div>
            ))}
        </>
    )
}