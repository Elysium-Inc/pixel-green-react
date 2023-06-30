import {SearchBar} from "../../components/SearchBar.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState({})
    const[res, setRes] = useState({})
    const getData = async (url) => {
        try {
            const req = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=PERFORMANCE&locale=fr`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
            const res = await req.json()
            setData(res.lighthouseResult)
            console.log(res)
        }catch (e) {
            console.log(e)
        }

    }
    return (
        <>
            <SearchBar search={search} setSearch={(q)=>setSearch(q)} action={()=>getData(search)}/>
            <h1>home</h1>
                <h2>Score total : {data.categories && `${data.categories.performance.score * 100} %`}</h2>
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