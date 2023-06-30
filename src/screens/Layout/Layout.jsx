import {Outlet, useNavigate} from "react-router-dom"
import "./Layout.css"
export const Layout = ()=> {

    return (
        <>
            <nav className="flex justify-between  flex-col bg-white navbar p-2">
                <div className="header-banner"></div>
                <div className="header-overlay"></div>
                <div className="flex gap-12 z-40">
                    <a href="" >
                        <img src="/logo.svg" alt="" className="h-20"/>
                    </a>
                    <ul className="flex  content-center items-center gap-12 text-slate-50 font-medium text-lg">
                        <li className="hover:text-green-50 hover:transition-colors hover:duration-500"><a href="">Home</a></li>
                        <li className="hover:text-green-50 hover:transition-colors hover:duration-500"><a href="">Home</a></li>
                        <li className="hover:text-green-50 hover:transition-colors hover:duration-500"><a href="">Home</a></li>
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </>

    )
}