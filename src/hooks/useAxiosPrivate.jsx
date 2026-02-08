import {useEffect} from 'react'
import useAuth from './useAuth.jsx'
import PrivateAxios from '../../Api/PrivateAxios.jsx'
import useRefreshToken from './useRefreshToken.jsx'
export default function useAxiosPrivate() {
   
    const {auth} = useAuth();

    const refresh = useRefreshToken();
      useEffect(() => {
         
         const requestIntercept = PrivateAxios.interceptors.request.use(
          config => {
              if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                console.log('Request Intercepted', config);
                return config;
            }, (error) => Promise.reject(error)
            );

            const responedIntercept = PrivateAxios.interceptors.response.use(
            respons=>respons, async (error) => {
              const prevRequest = error?.config;

              console.log('Response Intercepted', error.response);
              const status = error?.response?.status;
              if(status === 401 && !prevRequest?.sent){
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                if (!newAccessToken) {
                  return Promise.reject(error);
                }

                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return PrivateAxios(prevRequest);
              }
              return Promise.reject(error);
            }
            )
          

        return () => {
            PrivateAxios.interceptors.response.eject(responedIntercept);
            PrivateAxios.interceptors.request.eject(requestIntercept);
        }
      }, [auth, refresh]);
;
  return PrivateAxios; 
}
