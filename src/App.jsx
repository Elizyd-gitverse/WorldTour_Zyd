import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react"; //FOR OPTIMIZATION (Slit the code bundle)

import { CitiesContextProvider } from "./Context/CitiesContext";
import { AuthContextProvider } from "./Context/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import CityList from "./Component/CityList";
import CountryList from "./Component/CountryList";
import City from "./Component/City"
import Form from "./Component/Form"
import SpinnerFullPage from "./Component/SpinnerFullPage"

// import HomePage from "./Pages/HomePage";
// import ProductPage from "./Pages/ProductPage";
// import PricePage from "./Pages/PricePage";
// import LoginPage from "./Pages/LoginPage";
// import PageNotFound from "./Pages/PageNotFound";
// import MapPage from "./Pages/MapPage";

const HomePage = lazy(() => import("./Pages/HomePage"))
const ProductPage = lazy(() => import("./Pages/ProductPage"))
const PricePage = lazy(() => import("./Pages/PricePage"))
const LoginPage = lazy(() => import("./Pages/LoginPage"))
const PageNotFound = lazy(() => import("./Pages/PageNotFound"))
const MapPage = lazy(() => import("./Pages/MapPage"))

export default function App() {

 return (
  <AuthContextProvider>
   <CitiesContextProvider>
    <BrowserRouter>
      {/* suspend the spinner will load until the page complete load */}
     <Suspense fallback={<SpinnerFullPage />}>
      <Routes>
        {/* HomePage set has default Route as when 1st time PageLoad*/}
        <Route index element={<HomePage />}/>
        <Route path="product" element={<ProductPage />}/>
        <Route path="pricing" element={<PricePage />} />
        <Route path="login" element={<LoginPage />}/> 
        <Route path="map" element={<ProtectedRoute> <MapPage /> </ProtectedRoute>}>
           {/* Nested Route👇 */}
          <Route index element={<Navigate replace to="city"/>}/>
          <Route path="city" element={<CityList />} />
          {/* 👇going route into route through ID not through NESTED ROUTE */}
          <Route path="city/:id" element={<City />}/>
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
     </Suspense>
    </BrowserRouter>
   </CitiesContextProvider> 
  </AuthContextProvider>  
  )
}