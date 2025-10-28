import React from "react";

interface User {
  user?: {
    firstName?: string;
    lastName?: string;
  };
}

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div className="flex-shrink-0 h-10 w-10 bg-mainColor rounded-full flex items-center justify-center">
      <span className="text-white font-semibold text-sm">
        {user.user?.firstName?.charAt(0)}{user.user?.lastName?.charAt(0)}
      </span>
    </div>
  );
};

export default UserAvatar;