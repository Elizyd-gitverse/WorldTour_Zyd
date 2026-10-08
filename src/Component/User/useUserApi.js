import { useMutation } from "@tanstack/react-query";
import { LoginApi } from "../../services/AuthApi";
import toast from "react-hot-toast";
import { AuthContextUse } from "../../Context/AuthContext";

export default function useLoginApi(email, password) {
       const {dispatch} = AuthContextUse()

       const {mutate: login} = useMutation({
        mutationFn: () => LoginApi(email, password),
    
        onSuccess: (data) => {
          dispatch({type: 'Login', payload: data})
          toast.success("Successfully Logged in")
        },
    
        onError: (err) => toast.error(err.message) //logged fail error
      })

      return {login}
}