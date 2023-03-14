import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { FundingPage } from "./pages/fundings";
import { InstructionsPage } from "./pages/InstructionsPage";
import { OrganisationPage } from "./pages/organisation";
import { SearchPage } from "./pages/search";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<InstructionsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route
        path="/organisation/:company_name"
        element={<OrganisationPage />}
      />
      <Route path="/fundings" element={<FundingPage />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </>
  )
);
