const defaultType = "application/json;charset=utf-8"

const fetchHelper = ( url, method, data, type = defaultType ) => {
    console.log(data)
  const POST = {
    method: "POST",
    headers: {
      "Content-Type": type,
    },
    mode: "cors",
    body: JSON.stringify(data),
  };
  const PUT = {
    method: "PUT",
    headers: {
      "Content-Type": type,
    },
    mode: "cors",
    body: JSON.stringify(data),
  };
  if (method == 'POST') {
    let body = POST;
    return fetch(url, body);
  }
  if (method == 'PUT') {
    let body = PUT;
    return fetch(url, body);
  }
};

export default fetchHelper;