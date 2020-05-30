import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

//--bi-directional dependencies (http service requires authservice and vice versa)
//--in this case we need to identify which service is the core service for the application
//--since httpservice is core, we need to put authservice above it
//--so the call to auth.getJwt() from httpservice is reversed
//--instead httpservice will setJwt() which will be invoked from authservice
//axios.defaults.headers.common['x-auth-token'] = auth.getJwt();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  //---Expected errors (client errors) ----
  //e.g 400(Bad request), 404(Not Found), incorrect form data
  //it's best to display more specific error message for expected errors
  //in specific places, by wrapping in a try-catch block
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  //---Unexpected errors (application/network/db down errors) ---
  //e.g 500(Internal server error), network error
  //it's best to display a generic error message for unexpected errors
  //preferebly in one place, int the interceptor/httpservice
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occured"); //Unexpected error displaying
  }

  return Promise.reject(error);
});

//--avoiding bi-directional dependencies
//set jwt received from authservice
export function setJwt(jwt) {
  //include default headers for http requests
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
