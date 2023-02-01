async function get(endpointInput: string, params = "", token = undefined) {
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

async function post(endpointInput: string, data = {}, token = undefined) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = endpoint;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: "POST",
    credentials: "include",
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

async function patch(endpointInput: string, params = "", data = {}, token = undefined) {
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

async function del(endpointInput: string, params = "", data = {}, token = undefined) {
  const endpoint = process.env.REACT_APP_SERVER_URL + endpointInput;
  const apiUrl = params === "" ? endpoint : `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);

  const res = await fetch(apiUrl, {
    method: "DELETE",
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

export { get, post, patch, del as delete };
