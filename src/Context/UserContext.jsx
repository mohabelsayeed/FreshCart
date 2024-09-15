import { createContext ,useEffect,useState } from "react";


 export let UserContext = createContext();

 export default function UserContextProvider(props){
const [islogin, setlogin] = useState(null)

useEffect(() => {
  if(localStorage.getItem('userToken') !== null  ){
    setlogin(localStorage.getItem('userToken') )
  }
}, [])

return <UserContext.Provider value={{islogin, setlogin}}>
{props.children}
</UserContext.Provider>

 }