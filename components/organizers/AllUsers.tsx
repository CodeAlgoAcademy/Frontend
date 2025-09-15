import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";
import { getOrganizationUsers } from "services/organizersService";
import EmptyState from "./UI/emptystate";
import LoadingSkeleton from "./UI/LoadingSkeleton";
import UsersTable from "./UI/UsersTable";

interface AllUsersProps {
  onAddUser: () => void;
}

const AllUsers: React.FC<AllUsersProps> = ({ onAddUser }) => {
  const dispatch = useDispatch();
  const { 
    users, 
    loading, 
    selectedOrganization, 
  } = useSelector((state: RootState) => state.organizer);
  
  const hasUsers = users && users.length > 0;

  useEffect(() => {
    if (selectedOrganization?.id) {
      dispatch(getOrganizationUsers());
    }
  }, [dispatch, selectedOrganization?.id]);

  return (
    <ContentBox title="All Users" size="large" padding="large">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Organization Users</h2>
            <button
              onClick={onAddUser}
              className="px-4 py-2 bg-mainColor text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Add User
            </button>
          </div>

          {hasUsers ? (
            <>
              <UsersTable users={users} />
              <div className="mt-4 text-sm text-gray-500">
                Showing {users.length} user{users.length !== 1 ? 's' : ''}
              </div>
            </>
          ) : (
            <EmptyState onAddUser={onAddUser} />
          )}
        </>
      )}
    </ContentBox>
  );
};

export default AllUsers;