import { useQuery } from "@tanstack/react-query"
import { CityFetchApi } from "../../services/CityApi"

export default function useCityFetchQuery() {
   const {data: citiesArr=[], isFetching, error} = useQuery({
    queryKey: ['cities'],
    queryFn: CityFetchApi
   })

   return {citiesArr, isFetching, error}
}