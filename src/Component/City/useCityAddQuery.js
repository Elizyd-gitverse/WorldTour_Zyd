import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CityAddApi } from "../../services/CityApi";
import toast from "react-hot-toast";

export default function useCityAddQuery() {
    
    const queryClient = useQueryClient()

    const {mutate: CreateCity} = useMutation({
        mutationFn: CityAddApi,
        onSuccess: () => {
            toast.success("City Added SuccessFully")
            queryClient.invalidateQueries({
                queryKey: ['cities']
            })
        },

        onError: (err) => toast.error(err.message)
    })

    return {CreateCity}
}