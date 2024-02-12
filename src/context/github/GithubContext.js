import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import { apiConfig } from "../../apiConfig";

const GithubContext = createContext();

const GITHUB_URL = apiConfig.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = apiConfig.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  // Clear users from state
  const clearUsers = () => dispach({ type: "CLEAR_USERS" });

  // SET LOADING
  const setLoading = () => dispach({ type: "SET_LOADING" });

  const [state, dispach] = useReducer(githubReducer, initialState);
  console.log(state);
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
          Authorization: `token ${GITHUB_TOKEN}`,
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

  //Get single user
  const getUser = async (login) => {
    setLoading();

    try {
      const response = await fetch(`${GITHUB_URL}/users/${login}`, {
        method: "GET",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      console.log(response);
      if (!response.status === 404) {
        window.location = "/notFound";
      } else {
        const data = await response.json();
        dispach({
          type: "GET_USER",
          payload: data,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //Get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    try {
      const response = await fetch(
        `${GITHUB_URL}/users/${login}/repos?${params}`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispach({
        type: "GET_REPOS",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching repos:", error);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
