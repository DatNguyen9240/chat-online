import React from "react";
import { UserId } from "@/types/User";

const UserID = ({ params }: { params: UserId }) => {
  const { userID } = params;

  return <div>User ID: {userID}</div>;
};

export default UserID;
