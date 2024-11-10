import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ShareButton({ post_ID }) {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleMouseEnter = () => {
    setPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setPopoverVisible(false);
    setIsCopied(false); // Reset the copied state on mouse leave
  };

  const handleCopy = () => {
    // Select and copy the text to the clipboard
    const textToCopy = `http://localhost:5173/post/${post_ID}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
    });
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4 fill-purple-600 cursor-pointer transition ease-in-out hover:scale-[1.5] max-[425px]:active:scale-[1.5]"
        >
          <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
        </svg>
      </button>

      <div
        role="tooltip"
        className={`absolute z-10 w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-purple-950 transition-opacity duration-300 ease-out transform ${
          isPopoverVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ right: "100%", marginLeft: "10px", top: "-50%" }}
      >
        <div className="flex justify-center items-center gap-2 px-3 py-2 bg-gray-100 rounded-t-lg dark:bg-purple-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 stroke-purple-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>

          <h3 className="font-normal text-[12px] text-gray-900 dark:text-purple-300">
            Share others
          </h3>
        </div>
        <div className="px-3 py-2 flex gap-2 justify-center items-center">
          <input
            type="text"
            readOnly
            value={`http://localhost:5173/post/${post_ID}`}
            className="w-full p-2 text-gray-900 bg-gray-100 rounded dark:bg-[#7d017d99] dark:text-white"
          />
          <button
            onClick={handleCopy}
            className="transition-all duration-300 ease-out p-1.5 text-white bg-purple-800 rounded hover:bg-purple-600 tr"
          >
            {isCopied ? (
              <span className="flex items-start justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            ) : (
              <span className="flex items-start justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </span>
  );
}
