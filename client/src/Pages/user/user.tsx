import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import UserHeader from "Components/user/userHeader/userHeader";

const GET_USER_HEADER = gql`
  {
    user {
      id
      username
      name
      description
      profilPicture
      followersCount
      followsCount
      postsCount

      posts {
        id
        media
      }
    }
  }
`;

function User() {
  const { loading, error, data } = useQuery(GET_USER_HEADER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  const { user } = data;

  return (
    <div className="User">
      <UserHeader user={user} />
    </div>
  );
}

export default User;
