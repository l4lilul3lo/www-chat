async function fetcher(endpoint, options = {}) {
  try {
    const baseUrl = "http://localhost:9000/";
    const url = baseUrl + endpoint;
    const response = await fetch(url, { ...options, credentials: "include" });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("ha!");
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
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("ha");
  }
}

async function get(endpoint) {
  const data = await fetcher(endpoint, {
    credentials: "include",
  });
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

async function fetchIsBlocked(roomId) {
  try {
    const { isBlocked } = await post("roomsUsers/getIsBlocked", {
      name: "roomId",
      data: roomId,
    });
    return isBlocked;
  } catch (err) {
    console.log(err);
  }
}

async function fetchRooms() {
  const { rooms } = await get("rooms/getRooms");

  return rooms;
}

async function fetchMessages(roomId) {
  const { messages } = await post("messages/getMessages", {
    name: "roomId",
    data: roomId,
  });

  return messages;
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

async function updateUserImage(url) {}

export {
  fetchMessages,
  fetchRooms,
  fetchCafeInfo,
  fetchUser,
  fetchIsBlocked,
  checkAuth,
  login,
  register,
};
