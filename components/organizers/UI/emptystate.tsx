import React from "react";

interface EmptyStateProps {
  onAddUser: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddUser }) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">👥</div>
      <p className="text-gray-500 text-lg mb-2">No users found</p>
      <p className="text-gray-400 text-sm mb-6">
        Get started by adding your first user to the organization
      </p>
      <button
        onClick={onAddUser}
        className="px-6 py-2 bg-mainColor text-white rounded-md hover:opacity-90 transition-opacity"
      >
        Add Your First User
      </button>
    </div>
  );
};

export default EmptyState;