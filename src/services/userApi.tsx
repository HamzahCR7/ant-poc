// useApi.js
import { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

const UserApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let responseData: any = null;

  const makePostRequest = async (url:string, requestBody: any) => {
    try {
      setLoading(true);

      const response: any = await axios.post(`http://localhost:4000/api/authenticate`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.status) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // const result = await response.json();
      console.log("datttaa", response);
      // console.log("datttaa", result);

      setData(response?.data);
      responseData = response?.data
    } catch (error: any) {
      setError(error);
      console.log("error", error);

    } finally {
      setLoading(false);
    }
  };

  // const post = async (endpoint: string, requestBody: any) => {
  //   try {
  //       await makePostRequest(endpoint, requestBody);
  //       // Additional asynchronous calls can be added here
        
  //       // Use Promise.all to wait for all asynchronous operations to complete
      
  //     } catch (error: any) {
  //       setError(error);
  //     } finally {
  //     }
  //   };
    return { data, responseData,loading, error,makePostRequest };


};

export default UserApi;
