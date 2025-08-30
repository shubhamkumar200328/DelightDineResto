import { UserProfile } from '@clerk/nextjs';
import Image from 'next/image';
import image from '@/assets/user.png';

export default function UserProfilePage() {
  return (
    <div className="flex flex-col items-center py-8 w-[100%] bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center my-6">
        <Image
          className="w-20 h-20 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={image}
          alt="User avatar"
          width={80}
          height={80}
        />
        <h1 className="text-3xl font-bold mt-4 text-black">User Profile</h1>
      </div>

      <div className="w-full max-w-4xl">
        <UserProfile path="/user-profile" />
      </div>
    </div>
  );
}
