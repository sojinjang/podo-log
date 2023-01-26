import { getCookieValue } from "./cookie.js";
import { Keys } from "../constants/Keys";

async function get(endpointInput: string, params = "") {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === "" ? endpoint : `${endpoint}/${params}`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookieValue(Keys.ACCESS_TOKEN)}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  return result;
}

async function post(endpointInput: string, data = {}) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = endpoint;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookieValue(Keys.ACCESS_TOKEN)}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  return result;
}

async function patch(endpointInput: string, params = "", data = {}) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === "" ? endpoint : `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookieValue(Keys.ACCESS_TOKEN)}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  return result;
}

async function del(endpointInput: string, params = "", data = {}) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === "" ? endpoint : `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);

  const res = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookieValue(Keys.ACCESS_TOKEN)}`,
    },
    body: bodyData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  return result;
}

export { get, post, patch, del as delete };
