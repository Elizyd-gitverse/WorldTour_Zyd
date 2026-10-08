import { useQuery } from "@tanstack/react-query";
import { CityDetailsApi } from "../../services/CityApi";

export default function useCityDetailsQuery(id) {
    const {data: currentCity, isFetching, error} = useQuery({
        queryKey: ['city', id],
        queryFn: () => CityDetailsApi(id)
    })

    return {currentCity, isFetching, error}
}