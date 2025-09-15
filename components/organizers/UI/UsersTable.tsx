import React from "react";
import StatusBadge from "./StatusBadge";
import UserAvatar from "./UserAvatar";
import { IOrganizationUser } from "types/interfaces/organization.interface";

interface User {
  user?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
  };
  role?: {
    name: string;
  };
  status?: string;
  created_at: string;
}

interface UsersTableProps {
  users: IOrganizationUser[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <UserAvatar user={user} />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {user.user?.firstName} {user.user?.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {user.user?.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.user?.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">@{user.user?.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {user.role?.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={user.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
                <br />
                <span className="text-xs text-gray-400">
                  {new Date(user.created_at).toLocaleTimeString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;