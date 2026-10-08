import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CityDeleteApi } from "../../services/CityApi";
import toast from "react-hot-toast";

export default function useDeleteCityQuery() {

    const queryClient = useQueryClient()
    const {mutate: DeleteCity, isPending} = useMutation({
        mutationFn: CityDeleteApi,

        onSuccess: () => {
            toast.success("City Deleted Successfully")
            queryClient.invalidateQueries({
                queryKey: ['cities']
            })
        },

        onError: (err) => toast.error(err.message)
    })

    return {DeleteCity, isPending}
}