import { useState } from "react";
import useLikeListener from "../../hooks/useLikeListener.js";
import { NavLink } from "react-router-dom";

export default function Notification() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { notifications } = useLikeListener();

  if (!notifications) {
    return null;
  }

  // console.log(notifications);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="z-50 inline-block">
      {/* Dropdown Button with Tooltip on Hover */}
      <button
        id="dropdownUsersButton"
        onClick={toggleDropdown}
        className={`relative size-4 cursor-pointer transition ease-in-out hover:scale-[1.2] max-[425px]:active:scale-[1.2]
        ${
          notifications.length > 0
            ? `before:z-10 before:text-center before:absolute before:-top-1 before:left-6 before:w-2 before:h-2 before:rounded-full before:bg-red-500
            before:content-[''] before:text-white befoure:text-center before:text-[10px] before:flex before:items-center before:justify-center`
            : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-6 ${
            notifications.length > 0 ? "stroke-red-500 animate-bellSwing" : ""
          } `}
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
          className="backdrop-blur-sm backdrop-saturate-150 z-10 flex flex-col items-end justify-center absolute right-0 bg-white rounded-lg shadow  dark:bg-gray-700/80 m-2 "
        >
          {notifications.length > 0 && (
            <span className="flex items-center justify-center gap-2 m-2 mb-0 bg-green-500/40 p-2 rounded-lg text-green-400 text-xs">
              <svg
                fill="#4ade80"
                width="13px"
                height="13px"
                viewBox="0 0 52.00 52.00"
                enableBackground="new 0 0 52 52"
                xmlSpace="preserve"
                stroke="#4ade80"
                strokeWidth="0.0005200000000000001"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="0.624"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M24,7l-1.7-1.7c-0.5-0.5-1.2-0.5-1.7,0L10,15.8l-4.3-4.2c-0.5-0.5-1.2-0.5-1.7,0l-1.7,1.7 c-0.5,0.5-0.5,1.2,0,1.7l5.9,5.9c0.5,0.5,1.1,0.7,1.7,0.7c0.6,0,1.2-0.2,1.7-0.7L24,8.7C24.4,8.3,24.4,7.5,24,7z"></path>{" "}
                  <path d="M48.4,18.4H27.5c-0.9,0-1.6-0.7-1.6-1.6v-3.2c0-0.9,0.7-1.6,1.6-1.6h20.9c0.9,0,1.6,0.7,1.6,1.6v3.2 C50,17.7,49.3,18.4,48.4,18.4z"></path>{" "}
                  <path d="M48.4,32.7H9.8c-0.9,0-1.6-0.7-1.6-1.6v-3.2c0-0.9,0.7-1.6,1.6-1.6h38.6c0.9,0,1.6,0.7,1.6,1.6v3.2 C50,32,49.3,32.7,48.4,32.7z"></path>{" "}
                  <path d="M48.4,47H9.8c-0.9,0-1.6-0.7-1.6-1.6v-3.2c0-0.9,0.7-1.6,1.6-1.6h38.6c0.9,0,1.6,0.7,1.6,1.6v3.2 C50,46.3,49.3,47,48.4,47z"></path>{" "}
                </g>
              </svg>
              <p>Mark all as read</p>
            </span>
          )}
          <ul
            className="divide-y divide-zinc-300/20 w-max p-2 overflow-y-auto text-gray-700 dark:text-gray-200 flax items-center justify-center"
            aria-labelledby="dropdownUsersButton"
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="flex w-full items-center justify-center py-2 pl-3"
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
                          className="text-zinc-300 text-[15px] font-normal"
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

// import { useState } from "react";
// import useLikeListener from "../../hooks/useLikeListener.js";
// import { NavLink } from "react-router-dom";

// export default function Notification() {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { notifications } = useLikeListener();

//   if (!notifications) {
//     return null;
//   }

//   // console.log(notifications);

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   return (
//     <div className="z-50 inline-block">
//       {/* Dropdown Button with Tooltip on Hover */}
//       <button
//         id="dropdownUsersButton"
//         onClick={toggleDropdown}
//         className={`relative size-4 cursor-pointer transition ease-in-out hover:scale-[1.2] max-[425px]:active:scale-[1.2]
//         ${
//           notifications.length > 0
//             ? `before:z-10 before:text-center before:absolute before:-top-1 before:left-6 before:w-4 before:h-4 before:rounded-full before:bg-red-500
//             before:content-['${
//               notifications.length > 9 ? "9+" : notifications.length
//             }'] before:text-white befoure:text-center before:text-[10px] before:flex before:items-center before:justify-center`
//             : ""
//         }`}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className={`size-6 ${
//             notifications.length > 0 ? "stroke-red-500 animate-bellSwing" : ""
//           } `}
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
//           className="z-10 flex items-center justify-center absolute right-0 bg-white rounded-lg shadow  dark:bg-gray-700 m-2"
//         >
//           <ul
//             className="divide-y w-max p-2 overflow-y-auto text-gray-700 dark:text-gray-200 flax items-center justify-center"
//             aria-labelledby="dropdownUsersButton"
//           >
//             {notifications.length > 0 ? (
//               notifications.map((notification, index) => (
//                 <li
//                   key={index}
//                   className="flex w-full items-center justify-center py-2"
//                 >
//                   {notification ? (
//                     <>
//                       {notification.likerId && (
//                         <NavLink to={`/user/userinfo/${notification.likerId}`}>
//                           <img
//                             className="w-6 h-6 mr-2 rounded-full"
//                             src={`${notification.likerAvatar.avatar}`}
//                             alt="User avatar"
//                           />
//                         </NavLink>
//                       )}
//                       {notification.likerName && notification.postId ? (
//                         <NavLink
//                           to={`/post/${notification.postId}`}
//                           className=" text-teal-300 text-[15px] font-normal"
//                         >
//                           {`${notification.likerName} liked your post!`}
//                         </NavLink>
//                       ) : (
//                         <span>No notification details</span>
//                       )}
//                     </>
//                   ) : (
//                     <span>No notifications</span>
//                   )}
//                 </li>
//               ))
//             ) : (
//               <li className="px-4 py-2 text-gray-500">No notifications</li>
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
