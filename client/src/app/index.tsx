import { Routes, Route } from "react-router-dom";

import Login from "@/app/pages/login";
import Logs from "@/app/pages/timesheets";
import Bills from "@/app/pages/bills";
import Cheques from "@/app/pages/cheques";
import Users from "@/app/pages/users";
import Payee from "@/app/pages/payees";
import Settings from "@/app/pages/settings";

import Layout from "@/components/navbar/layout";
import NotFound from "./not-found";
import Unauthorized from "./unauthorized";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/worksheets" element={<Logs />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/cheques" element={<Cheques />} />
        <Route path="/users" element={<Users />} />
        <Route path="/payees" element={<Payee />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
