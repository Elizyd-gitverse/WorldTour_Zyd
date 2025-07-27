import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesContextProvider } from "./Context/CitiesContext";


import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import PricePage from "./Pages/PricePage";
import LoginPage from "./Pages/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import MapPage from "./Pages/MapPage";
import CityList from "./Component/CityList";
import CountryList from "./Component/CountryList";
import City from "./Component/City"
import Form from "./Component/Form"
import { AuthContextProvider } from "./Context/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";


export default function App() {

 return (
  <AuthContextProvider>
   <CitiesContextProvider>
    <BrowserRouter>
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
    </BrowserRouter>
   </CitiesContextProvider> 
  </AuthContextProvider>  
  )
}