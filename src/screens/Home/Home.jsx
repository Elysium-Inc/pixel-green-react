import {useState} from "react";

import { fetchFromApi } from "../../api/api.js";
import { Loading } from "../../commons/Loading.jsx";
import { ErrorPage } from "../../commons/Error.jsx";
import { SearchBar } from "../../components/SearchBar.jsx";
import {Dropdown} from '../../components/Dropdown.jsx'
import { ProgressCircle } from '../../components/ProgressCircle'

export const Home = () => {
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorContent, setErrorContent] = useState(false)
    const [globalPerformance, setGlobalPerformance] = useState({})
    const [greenAudits, setGreenAudits] = useState([])
    const [yellowAudits, setYellowAudits] = useState([])
    const [orangeAudits, setOrangeAudits] = useState([])
    const [redAudits, setRedAudits] = useState([])
    const [auditUrl, setAuditUrl] = useState('')
    const [isValidUrl, setIsValidUrl] = useState(true);

    const validateUrl = (string) => {
        return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(string);
      };

      const handleSearch = (url) => {
        const withHttps = (url) =>
          url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schema, nonSchemaUrl) =>
            schema ? match : `https://${nonSchemaUrl}`
          );
        const cleanedUrl = withHttps(url)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        if (validateUrl(cleanedUrl)) {
            setIsValidUrl(true);
            setGlobalPerformance({})
            setGreenAudits([])
            setYellowAudits([])
            setOrangeAudits([])
            setRedAudits([])
            setIsLoading(true)
            setTimeout(() => {
                getData(cleanedUrl)
          }, 300);
        } else {  
            setIsValidUrl(false);
        }
      };

    const getData = async search => {
        const data = await fetchFromApi(search)
        if(data.code !== 200) {
            console.log(data)
            setIsError(true);
            setErrorContent(data.message);
        }
        
        const {categories, audits, finalUrl} = data
        const {performance} = categories
        setGlobalPerformance(performance)
        setAuditUrl(finalUrl)
        setIsError(false)

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

        mappedAudits.map(audit => {
            const {score, description, title, key} = audit
            if(score >= 0.9) setGreenAudits(prev => [...prev, {score, description, title, key}])
            if(score >= 0.85 && score < 0.9) setYellowAudits(prev => [...prev, {score, description, title, key}])
            if(score >= 0.80 && score < 0.85) setOrangeAudits(prev => [...prev, {score, description, title, key}])
            if(score < 0.8) setRedAudits(prev => [...prev, {score, description, title, key}])
        })
        setIsLoading(false)
    }

    return (
        <>
            <SearchBar search={search} setSearch={(q)=>setSearch(q)} action={()=>handleSearch(search)} isValid={isValidUrl} loading={isLoading} />
            {isError && <ErrorPage  error={errorContent}/>}
            {isLoading && !isError? <Loading /> : globalPerformance.score &&
            <div className="text-center font-medium text-lg">
                <h2>Note Eco-Responsable pour {auditUrl}</h2>
                <ProgressCircle score={(globalPerformance.score * 100)}/>
            </div>
            }
            {
            !isLoading &&
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                {
                    greenAudits.length > 0 &&
                    <Dropdown
                    color="text-[#369a49] border-slate-200"
                    titleSection='Notes 90->100%'
                    content={
                        greenAudits.map(item => (
                            <div className="p-3 w-auto bg-slate-50 border-b-2" key={item.key}>
                                <p className="my-1">{item.key}</p>
                                <p className="my-2">{item.score * 100}%</p>
                            </div>
                        ))
                    }
                    quantity={greenAudits.length}
                    />
                }
                {
                    yellowAudits.length > 0 &&
                    <Dropdown
                    color="text-[#FFC300] border-slate-200"
                    titleSection='Notes 85->90%'
                    content={
                        yellowAudits.map(item => (
                            <div className="p-3 w-auto bg-slate-50 border-b-2" key={item.key}>
                                <p className="my-1">{item.key}</p>
                                <p className="my-2">{item.score * 100}%</p>
                                <p className="my-1">{item.description}</p>
                            </div>
                        ))
                    }
                    quantity={yellowAudits.length}
                    />
                }
                {
                    orangeAudits.length > 0 &&
                    <Dropdown
                    color="text-orange-400 border-slate-200"
                    titleSection='Notes 80->85%'
                    content={
                        orangeAudits.map(item => (
                            <div className="p-3 w-auto bg-slate-50 border-b-2" key={item.key}>
                                <p className="my-1">{item.key}</p>
                                <p className="my-2">{item.score * 100}%</p>
                                <p className="my-1">{item.description}</p>
                            </div>
                        ))
                    }
                    quantity={orangeAudits.length}
                    />
                }
                {
                    redAudits.length > 0 && 
                    <Dropdown
                    color="text-red-500 border-slate-200"
                    titleSection='Notes critiques < 80%'
                    content={
                        redAudits.map(item => (
                            <div className="p-3 w-auto bg-slate-50 border-b-2" key={item.key}>
                                <p className="my-1">{item.key}</p>
                                <p className="my-2">{item.score * 100}%</p>
                                <p className="my-1">{item.description}</p>
                            </div>
                        ))
                    }
                    quantity={redAudits.length}
                    />
                }
            </div>
        }
        </>
    )
}