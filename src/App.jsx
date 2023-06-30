import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./screens/Layout/Layout.jsx";
import {Home} from "./screens/Home/Home.jsx";

function App() {

  return (
   <BrowserRouter>
       <Routes>
           <Route path="/" element={<Layout/>}>
               <Route path="/" element={<Home/>}/>
           </Route>
       </Routes>
   </BrowserRouter>
  )
}

export default App
