 import PrivateAxios from '../../Api/PrivateAxios';

  //const apilink='https://potholeapi20251220015420-fkaxfhgze2e6c0eh.germanywestcentral-01.azurewebsites.net/';
// const apilink='https://localhost:7099/';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
 export function useLoginFunction() {

    const axiosPrivate = useAxiosPrivate();
  const Login = async (usernameOrEmail, password, setAuth) => {
    const payload = {  password,
    ...(usernameOrEmail.includes('@')
      ? { email: usernameOrEmail }
      : { userName: usernameOrEmail })
  };
      try {
          const response = await axiosPrivate.post(`Account/Login`, payload,
             {headers: { 'Content-Type': 'application/json' }, withCredentials: true }
          );
          const accessToken = response?.data?.token;
          const roles = response?.data?.roles;
          setAuth({ user: usernameOrEmail, roles, accessToken });
          console.log('Auth state set:', { user: usernameOrEmail, roles, response });
          return response.data;
      } catch (error) {
          console.error('Error during login:', error);
          throw error;
      }
    };
        return {Login};
 
 }

 export function registerFunction(username, email, password, firstName, lastName) {
    const payload = {
        userName: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    };
     return PrivateAxios.post(`Account/Register`, payload,
        {headers: { 'Content-Type': 'application/json' }, withCredentials: true }
     )
     .then(response => {
         //console.log('Registration successful:', response.data);
         return response.data;
     })
     .catch(error => {
         console.error('Error during registration:', error);
         throw error;
     });
    }

