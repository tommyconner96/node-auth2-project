import React, {useEffect, useState} from 'react'
import {AxiosWithAuth} from '../util/AxiosWithAuth'

const Users = () => {
    //hook for the complete friends list from the API
      const [friends, setFriends] = useState([])
    //hook for a boolean for when data isLoading or not
      const [isLoading, setIsLoading] = useState(false)

      useEffect(() => {
        setIsLoading(true)
        AxiosWithAuth()
          .get('/api/users')
          .then(res => {
            setFriends(res.data)
            setIsLoading(false)
            console.log(friends)
            })
          .catch(err => console.log(err))
        },[setIsLoading])

      return (
        <div className='form-container'>

          {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className='friends-card-container'>
            
              {friends.map((user) =>
                  <p>{user.username}</p>
              )}
          </div>
      )}
  
        </div>
      )
  
  }
  
  export default Users