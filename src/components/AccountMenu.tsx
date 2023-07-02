import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';


interface AccountMenuProps {
  visible?: boolean;
  username?: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, username }) => {
  const [accessToken, setAccessToken] = useLocalStorage('access_token', '');
  const nav = useNavigate()

  if (!visible) {
    return null;
  }

  const signout = () => {
    setAccessToken('');
    nav('/', {replace:true});
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
          <p className="text-white text-sm group-hover/item:underline">{username}</p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div onClick={() => signout()} className="px-3 text-center text-white text-sm hover:underline">
        Sign out of Watchie
      </div>
    </div>
  )
}

export default AccountMenu;
