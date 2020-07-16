import axios from "axios";

const apiUrl = "https://ld48eii9kk.execute-api.eu-central-1.amazonaws.com/dev";

export const fetchActiveFellow = async (accessToken) => {
  try {
    const response = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: "bearer " + accessToken,
      },
    });
    return response.data.login; // githubId for active fellow
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const fetchSingleFellow = async (accessToken, githubId) => {
  try {
    const response = await axios.get(`${apiUrl}/fellows/${githubId}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

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
};

export const starRepo = async (repo, accessToken) => {
  try {
    const response = await fetch(`https://api.github.com/user/starred/${repo.owner}/${repo.name}`, {
      method: 'PUT',
      headers: {
        Authorization: "token " + accessToken,
        'Content-Length': 0,
      },
    });
    console.log(response.status);
    return response.status === 204;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const sendDiscordMessage = async (sender, recipient, messageType, project, accessToken) => {
  const res = await fetch('https://ld48eii9kk.execute-api.eu-central-1.amazonaws.com/dev/discord-message',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        sender,
        recipient,
        message_type: messageType,
        project,
      }),
    },
  );

  const json = await res.json();
  console.log(json);
  return json.success;
}
