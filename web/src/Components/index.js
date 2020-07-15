import axios from "axios";

const apiUrl =
  "https://ld48eii9kk.execute-api.eu-central-1.amazonaws.com/dev";

export const fetchFellows = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/fellows`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchFellow = async (username, accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/fellows/${username}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const fetchStandups = async (username, accessToken, limit = 10) => {
  try {
    const response = await axios.get(`${apiUrl}/standups?user=${username}&limit=${limit}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const fetchEvents = async (accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/events`, {
      headers: {
        Authorization: accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
