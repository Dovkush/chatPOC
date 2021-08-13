import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
export const RequestContext = React.createContext();

function RequestProvider({ children }) {
    const history = useHistory()
    const [userId, setUserId] = useState('');
    const [socket, setSocket] = useState();
    const [username, setusername] = useState('');
    useEffect(() => {

        if (username && userId) {
            const obj = { userId, username }
            console.log(obj)
            // alert(JSON.stringify(obj,null,4))
            window.localStorage.setItem("userdata", JSON.stringify(obj, null, 4))
            history.push('/rooms')
        } else {

        }

    }, [username, userId])
    useEffect(() => {
        const userdata = JSON.parse(window.localStorage.getItem('userdata'))
        console.log(userdata)
        if (userdata) {
            setUserId(userdata.userId)
            setusername(userdata.username)
        } else
            history.push('/')
    }, [])

    let value = {
        username,
        setusername,
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
