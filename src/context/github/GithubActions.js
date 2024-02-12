const GITHUB_URL = apiConfig.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = apiConfig.REACT_APP_GITHUB_TOKEN;

//Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  try {
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: "GET",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { items } = await response.json();
    return items;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
