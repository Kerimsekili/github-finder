import { useEffect, useState } from "react";
import { apiConfig } from "../../apiConfig";

function UserResults() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(apiConfig.REACT_APP_GITHUB_TOKEN);
  console.log(apiConfig.REACT_APP_GITHUB_URL);

  debugger;
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiConfig.REACT_APP_GITHUB_URL}/users`, {
        method: "GET",
        headers: {
          Authorizartion: `Bearer ${apiConfig.REACT_APP_GITHUB_TOKEN}`,
        },
      });
      console.log(response);
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }

    setUsers(data);
    setLoading(false);
  };
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <h3>{user.login}</h3>
      ))}
    </div>
  );
}

export default UserResults;
