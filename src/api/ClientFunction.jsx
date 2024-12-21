import axios from "axios";
import { toast } from "react-toastify";
// Create an Axios instance with a base URL
export const baseURL = process.env.REACT_APP_API_URL;

if (!baseURL) {
  console.log(
    ">BaseURL error,please check your env file or visit api/ClientFunction.jsx file to see more details...,Thanks!..."
  );
}
const api = axios.create({
  baseURL: baseURL, // Add the protocol (http or https) before the hostname
});

const handleUserRequest = async (
  method,
  url,
  data = null,
  customHeaders = {}
) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        // Add your custom headers here
        // For example, you can add an authorization header like this:
        // 'Authorization': 'Bearer your_token'
        ...customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    // toast.error(
    //   error?.response?.data?.message
    //     ? error?.response?.data?.message
    //     : "Something went wrong!..."
    // );
    return { success: false, err: error.message };
  }
};
const handleRequest = async (method, url, data = null, customHeaders = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        // Add your custom headers here
        // For example, you can add an authorization header like this:
        // 'Authorization': 'Bearer your_token'
        ...customHeaders,
      },
    });
    // toast.success(
    //   response.data.message ? response.data.message : "Success!..."
    // );
    return response.data;
  } catch (error) {
    // error?.response?.data?.message &&
    //   toast.error(error?.response?.data?.message);
    return { success: false, err: error.message };
  }
};
export const fetchUserData = (url, customHeaders) =>
  handleUserRequest("get", url, null, customHeaders);

export const fetchData = (url) => handleRequest("get", url);
export const postData = (url, data) => handleRequest("post", url, data);

export const updateData = (url, data) => handleRequest("put", url, data);

export const deleteData = (url, data) => handleRequest("delete", url, data);

export const requestData = (method, url, data) => {
  return handleRequest(method, url, data);
};

export function generateTransactionId(phoneNumber) {
  phoneNumber = String(phoneNumber);

  const seed = Date.now();

  const combinedString = phoneNumber + seed;

  const hashCode = combinedString.split("").reduce((hash, char) => {
    const charCode = char.charCodeAt(0);
    return (hash << 5) - hash + charCode;
  }, 0);

  const positiveHashCode = Math.abs(hashCode) % 100000000;

  const transactionId = positiveHashCode.toString().padStart(8, "0");

  return transactionId;
}
export function formatTime(dateString) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };

  const formattedTime = new Date(dateString).toLocaleTimeString([], options);

  return formattedTime;
}

export function generateRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com', 'domain.com'];
  const usernameLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14
  const username = Array.from({ length: usernameLength }, () => getRandomChar()).join('');
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
}

function getRandomChar() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}
