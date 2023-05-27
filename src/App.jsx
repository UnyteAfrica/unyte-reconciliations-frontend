import { Routes, Route } from "react-router-dom";

import SharedLayout from "./SharedLayout";
import Overview from "./Pages/Overview";
import Policies from "./Pages/Policies";
import Claims from "./Pages/Claims";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignUp";

function App() {
  return (
    <div className="min-h-screen">
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/app/*" element={<SharedLayout />}>
        <Route path="" element={<Overview />} />
        <Route path="policies" element={<Policies />} />
        <Route path="claims/*" element={<Claims />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
