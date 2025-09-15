import React from "react";
import ContentBox from "../parents/UI/ContentBox";

interface Props {
  users: any[];
  onViewAll: () => void;
  loading?: boolean;
}

const OrganizationUsers: React.FC<Props> = ({ users, onViewAll, loading }) => {
  const hasUsers = users && users.length > 0;

  if (loading) {
    return (
      <ContentBox
        title="Users"
        padding="small"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "400px",
          overflowY: "auto",
        }}
        size="large"
      >
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </ContentBox>
    );
  }

  return (
    <ContentBox
      title="Users"
      padding="small"
      style={{
        minWidth: "100%",
        maxWidth: "100%",
        height: "400px",
        overflowY: "auto",
      }}
      size="large"
    >
      <div className="max-h-[250px] overflow-y-scroll">
        <h1 className="mb-3 font-bold text-mainColor">Newest Accounts</h1>

        {hasUsers ? (
          users.map((user, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between gap-[1rem]"
            >
              <p className="font-bold capitalize">
                {user?.user
                  ? `${user.user.firstName ?? ""} ${user.user.lastName ?? ""}`
                  : "Unknown User"}
              </p>
              <p className="text-mainColor">{user?.role?.name ?? "No Role"}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No recent users found</p>
        )}
      </div>

      {hasUsers && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onViewAll}
            className="rounded-lg bg-mainColor px-8 py-4 text-sm text-white hover:opacity-90"
          >
            View All
          </button>
        </div>
      )}
    </ContentBox>
  );
};

export default OrganizationUsers;