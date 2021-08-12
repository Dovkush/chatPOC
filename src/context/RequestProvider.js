import React ,{useState} from 'react'
import axios from 'axios';
export const RequestContext=React.createContext();

function RequestProvider({children}) {

    const [userId,setUserId]=useState('');
    const [socket, setSocket] = useState();
   

 
   let value={
       userId,
       setUserId,
       socket,
       setSocket,
   }
    return (
        <RequestContext.Provider value={value}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider
