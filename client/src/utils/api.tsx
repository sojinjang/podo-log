import { Token } from "src/recoil/token/atom";

async function get(endpointInput: string, params = "", token: Token = undefined) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === "" ? endpoint : `${endpoint}/${params}`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  return result;
}

async function post(endpointInput: string, data = {}, token: Token = undefined) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = endpoint;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function postFormData(
  endpointInput: string,
  formData: BodyInit,
  token: Token = undefined
) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = endpoint;
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  return result;
}

async function patch(endpointInput: string, params = "", data = {}, token: Token = undefined) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === "" ? endpoint : `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function del(endpointInput: string, params = "", token: Token = undefined) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === "" ? endpoint : `${endpoint}/${params}`;

  const res = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const result = await res.json();
  return result;
}

export { get, post, postFormData, patch, del };
