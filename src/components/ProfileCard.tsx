import React from 'react';
import { User, Mail, X, CheckCheck } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface ProfileCardProps {
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const { user, updateUser, isEditingProfile, setIsEditingProfile } = useUser();
  const [formData, setFormData] = React.useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditingProfile(false);
  };

  const cancelEdit = () => {
    setFormData({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
    setIsEditingProfile(false);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out max-w-xs flex flex-col justify-between h-full ${className}`}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
        <User className="mr-2 h-5 w-5" />
        Profile Information
      </h2>
      
      {isEditingProfile ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <label htmlFor="avatarUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
            Upload Avatar
          </label>
          <input
            type="file"
            id="avatarUpload"
            name="avatarUpload"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = () => {
                  if (reader.result) {
                    setFormData({ ...formData, avatar: reader.result.toString() });
                  }
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <CheckCheck className="mr-1 h-4 w-4" />
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex-shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
            <div className="flex-grow text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</h3>
              <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mt-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-md max-w-full overflow-hidden">
                <Mail className="mr-1 h-4 w-4" />
                <span className="truncate w-full whitespace-nowrap">{user.email}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditingProfile(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileCard;