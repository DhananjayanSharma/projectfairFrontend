import React, { createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const editResponseContext = createContext({})
export const isLoginAuthContext = createContext({})
function Contextshare({ children }) {
  const [addResponse, setAddResponse] = useState({})
  const [editResponse, setEditResponse] = useState(false)
  const [isLoginStatus, setIsLoginStatus] = useState(true)

  return (
    <>
      <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
        {/* provider tag to share that data where shared data should placed inside the value  */}
        <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
          <isLoginAuthContext.Provider value={{isLoginStatus, setIsLoginStatus}}>
            {children}
          </isLoginAuthContext.Provider>
        </editResponseContext.Provider>

      </addResponseContext.Provider>
    </>
  )
}

export default Contextshare
