import {creatcContext , useState} from 'react'

export let counterContext = creatcContext();

export default function counterContextprovider (props){
    const [counter, setcounter] = useState(0)
    
    return <counterContext.Provider value={{counter, setcounter}}>

    {props.children}
    </counterContext.Provider>
}