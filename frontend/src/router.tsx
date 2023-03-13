import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Instructions } from "./pages/Instructions";
import { Organisation } from "./pages/organisation";
import { Search } from "./pages/search";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Instructions />} />
      <Route path="/search" element={<Search />} />
      <Route path="/organisation/:company_name" element={<Organisation />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </>
  )
);
