interface NoUsersFoundProps {
  searchQuery: string;
}

export const NoUsersFound: React.FC<NoUsersFoundProps> = ({ searchQuery }) => {
  return (
    <div className="text-center py-8 text-gray-500">
      No users found matching "{searchQuery}"
    </div>
  );
};
