// so we can say if window location is 3000, forward requests to 9000,
//otherwise forward them to window location.
const baseUrl =
  window.location.origin === "http://localhost:3000"
    ? "http://localhost:9000"
    : window.location.origin;

async function fetcher(endpoint, options = {}) {
  try {
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
    const data = await get("/auth/checkAuth");
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchCafeInfo() {
  const { cafeInfo } = await get("/rooms/getCafeInfo");

  return cafeInfo;
}

async function fetchUser() {
  const { user } = await get("/users/getUser");

  return user;
}

async function login(formData) {
  const { message } = await post("/auth/login", {
    name: "formData",
    data: formData,
  });
  return message;
}

async function register(formData) {
  const { message } = await post("/auth/register", {
    name: "formData",
    data: formData,
  });
  return message;
}

async function updateUserImage(imageUrl) {
  await post("/users/updateUserImage", {
    name: "imageUrl",
    data: imageUrl,
  });
  // refresh cache
  await fetch(imageUrl);
}

async function updateServerUserSettings(settings) {
  await post("/users/updateSettings", {
    name: "settings",
    data: settings,
  });
}

async function logout() {
  await get("/auth/logout");
}

export {
  fetchCafeInfo,
  fetchUser,
  checkAuth,
  login,
  logout,
  register,
  updateUserImage,
  updateServerUserSettings,
};
