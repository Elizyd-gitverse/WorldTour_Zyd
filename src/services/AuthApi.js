const BASE_URL = import.meta.env.VITE_API_URL

export async function LoginApi(email, password) {
        const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
                    method: 'POST',
                    body: JSON.stringify({email, password}),
                    credentials: "include", //mention in auth
                    headers: {
                        'Content-Type': "application/json"
                    }
        })
    
        const data = await res.json()
        if(data.status === 'fail') throw new Error(data.message)
                    
        return {...data.data.user, avatar: "/iconzydd.webp"}
}