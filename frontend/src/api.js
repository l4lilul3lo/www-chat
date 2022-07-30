async function fetcher(endpoint, options = {}) {
  try {
    const baseUrl = "https://www-chat.herokuapp.com/";
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

async function checkAuth() {
  try {
    const data = await get("auth/checkAuth");
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchCafeInfo() {
  const { cafeInfo } = await get("rooms/getCafeInfo");

  return cafeInfo;
}

async function fetchUser() {
  const { user } = await get("users/getUser");

  return user;
}

async function login(formData) {
  const { message } = await post("auth/login", {
    name: "formData",
    data: formData,
  });
  console.log(message);
  return message;
}

async function register(formData) {
  const { message } = await post("auth/register", {
    name: "formData",
    data: formData,
  });
  return message;
}

export { fetchCafeInfo, fetchUser, checkAuth, login, register };
