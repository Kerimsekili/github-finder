import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import { apiConfig } from "../../apiConfig";

const GithubContext = createContext();

const GITHUB_URL = apiConfig.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = apiConfig.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };
  // SET LOADING
  const setLoading = () => dispach({ type: "SET_LOADING" });

  const [state, dispach] = useReducer(githubReducer, initialState);

  //Get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    try {
      const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer  ${GITHUB_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { items } = await response.json();
      dispach({
        type: "GET_USERS",
        payload: items,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
