import React from "react";
import { Link, Outlet } from "react-router-dom";
function Root(props) {
  let accounts = props.accounts;
  // const primaryAccount=accounts[0];
  const web3loading = props.web3loading;
  return (
    <>
      <div>
        <nav
          className="relative flex w-full flex-nowrap items-center justify-between  py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4 h-full  bg-purple-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100"
          data-te-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="ml-2">
              <Link
                className="text-xl text-neutral-800 dark:text-neutral-200"
                to={"/"}
              >
                Home
              </Link>
            </div>

            <div
              className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
              id="navbarSupportedContent3"
              data-te-collapse-item
            >
              <ul
                className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
                data-te-navbar-nav-ref
              >
                <li
                  className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <Link
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    to={"new"}
                    data-te-nav-link-ref
                  >
                    Fundraise
                  </Link>
                </li>

              </ul>
              <span className="ml-2 text-neutral-500 dark:text-neutral-200">
                {accounts}
              </span>
            </div>
          </div>
        </nav>
      </div>
      <div>
        {web3loading ? (
          <div className="flex justify-center content-center h-full">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default Root;
