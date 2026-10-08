const BASE_URL = import.meta.env.VITE_API_URL
//1. Fetch City
export async function CityFetchApi() {
                const res = await fetch(`${BASE_URL}/api/v1/cities`, {
                    credentials: "include", //mention in every fetch
                })
    
                const data = await res.json()
                if(data.status === 'fail') throw new Error(data.message)
                return data.data.cities           
}

//2. City Fetch By Id
export async function CityDetailsApi(id) {
            const res = await fetch(`${BASE_URL}/api/v1/cities/${id}`, {
                credentials: "include"
            })

            const data = await res.json()
            if(data.status === 'fail') throw new Error(data.message)
            return data.data.city
    } 

//3. City Add
export async function CityAddApi(newCity) {
         const res = await fetch(`${BASE_URL}/api/v1/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
         })

         const data = await res.json()
         if(data.status === 'fail') throw new Error(data.message)
}

//4. Delete City 
export async function CityDeleteApi(id) {
        const res = await fetch(`${BASE_URL}/api/v1/cities/${id}`, {
            method: 'DELETE',
            credentials: "include"
          })

        if(!res.ok) {
           const data = await res.json()
           throw new Error(data.message)
        }  
} 
