import { Routes, Route } from "react-router-dom"

import SharedLayout from "./SharedLayout";
import Overview from "./Pages/Overview";
import Policies from "./Pages/Policies";
import Claims from "./Pages/Claims";

function App() {

  return (
    <div className="min-h-screen">
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="policies" element={<Policies />} />
        <Route path="claims" element={<Claims />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
