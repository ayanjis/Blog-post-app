// import { useState } from "react";

// export default function Notification() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   return (
//     <div className="z-50 inline-block">
//       {/* Dropdown Button with Tooltip on Hover */}
//       <button
//         id="dropdownUsersButton"
//         onClick={toggleDropdown}
//         className="size-4 fill-purple-600 cursor-pointer transition ease-in-out hover:scale-[1.5] max-[425px]:active:scale-[1.5]"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="size-4"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
//           />
//         </svg>
//       </button>

//       {/* Dropdown menu */}
//       {isDropdownOpen && (
//         <div
//           id="dropdownUsers"
//           className="z-10 absolute right-0 bg-white rounded-lg shadow w-60 dark:bg-gray-700 m-2"
//         >
//           <ul
//             className="py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
//             aria-labelledby="dropdownUsersButton"
//           >
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//               >
//                 <img
//                   className="w-6 h-6 mr-2 rounded-full"
//                   src="/docs/images/people/profile-picture-1.jpg"
//                   alt="Jese image"
//                 />
//                 Jese Leos
//               </a>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import useLikeListener from "../../hooks/useLikeListener.js";
import { NavLink } from "react-router-dom";

export default function Notification() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { notifications } = useLikeListener();

  if (!notifications) {
    return null;
  }

  console.log(notifications);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="z-50 inline-block">
      {/* Dropdown Button with Tooltip on Hover */}
      <button
        id="dropdownUsersButton"
        onClick={toggleDropdown}
        className="size-4 cursor-pointer transition ease-in-out hover:scale-[1.5] max-[425px]:active:scale-[1.5]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 stroke-red-500 animate-shake"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownUsers"
          className="z-10 items-center justify-center absolute right-0 bg-white rounded-lg shadow w-40 dark:bg-gray-700 m-2"
        >
          <ul
            className="divide-y w-fit py-2 overflow-y-auto text-gray-700 dark:text-gray-200 flax items-center justify-center"
            aria-labelledby="dropdownUsersButton"
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="flex w-full items-center justify-center py-2"
                >
                  {notification ? (
                    <>
                      {notification.likerId && (
                        <NavLink to={`/user/userinfo/${notification.likerId}`}>
                          <img
                            className="w-6 h-6 mr-2 rounded-full"
                            src={`${notification.likerAvatar.avatar}`}
                            alt="User avatar"
                          />
                        </NavLink>
                      )}
                      {notification.likerName && notification.postId ? (
                        <NavLink
                          to={`/post/${notification.postId}`}
                          className=" text-teal-300 text-[10px] font-normal"
                        >
                          {`${notification.likerName} liked your post!`}
                        </NavLink>
                      ) : (
                        <span>No notification details</span>
                      )}
                    </>
                  ) : (
                    <span>No notifications</span>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
