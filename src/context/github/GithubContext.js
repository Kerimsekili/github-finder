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

  //Get initial users(testing purposes)
  const fetchUsers = async () => {
    setLoading();
    try {
      const response = await fetch(`${GITHUB_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer  ${GITHUB_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispach({
        type: "GET_USERS",
        payload: data,
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
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
