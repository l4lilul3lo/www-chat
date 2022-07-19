async function fetcher(endpoint, options = {}) {
  try {
    const baseUrl = "http://localhost:9000/";
    const url = baseUrl + endpoint;
    const response = await fetch(url, { ...options, credentials: "include" });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function post(endpoint, content) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ [content.name]: content.data }),
    };
    const data = await fetcher(endpoint, options);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function get(endpoint) {
  const data = await fetcher(endpoint);
  return data;
}

export { get, post };
