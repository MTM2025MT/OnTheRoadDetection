import React from 'react'
import useAuth from './useAuth.jsx'
import PrivateAxios from '../../Api/PrivateAxios.jsx'
const  useRefreshToken=()=> {

   const {setAuth} = useAuth();
    const  refresh = async () => {
      try {
         const responed = await PrivateAxios.get('/Account/Refresh-Token', {
            withCredentials: true
         });
         const token = responed?.data?.token;
         if (!token) {
            return null;
         }
         setAuth(prev => {
            if(!prev){
               return prev;
            }
            return {...prev, accessToken: token}
         });
         return token;
      } catch (error) {
            console.error('Failed to refresh token', error);
         return null;
      }
    }
  return refresh;
}

export default useRefreshToken