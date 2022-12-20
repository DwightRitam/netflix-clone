import { SearchIcon, BellIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth";
const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      }
      else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handlescroll)

    return () => {
      window.removeEventListener("scroll", handlescroll)
    }


  }, [])
  const navbarbg = () => {
    setNavbar(!navbar)
    if(navbar && window.scrollY == 0){

      setIsScrolled(false)
    }
    else{
      setIsScrolled(true)
    }
  }
  const {logout}=useAuth()

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>

      <nav className="w-full  navbg  ">
        <div className="md:justify-between px-2 mx-auto lg:max-w-7xl md:items-center md:flex">
          <div>
            <div className="flex items-center md:text-center justify-between py-3 md:py-5 md:block">

              <div className="md:hidden">
                <button
                  className="mr-4 p-2 text-gray-700 rounded-md outline-none focus:border-gray-400"
                  onClick={navbarbg}
                >
                  {navbar ? (

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 navsvg text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>



                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 navsvg text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>


                  )}
                </button>
              </div>
              <Link href="/">
                <img
                  src="https://rb.gy/ulxxee"
                  width={100}
                  height={100}
                  className="cursor-pointer object-contain"
                />
              </Link>
              <ul className=" flex md:hidden text-red-600 items-center md:ml-6   md:space-x-1 md:space-y-0 ">

                {/* < li className="text-white p-3 cursor-pointer" title='log-out'>

            <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>

          </li> */}
                < li className="text-white p-3">
                  <Link href="/login">
                    <SearchIcon className="sm h-6 w-6 sm:inline" />
                  </Link>
                </li>
                <li className="text-white p-3">
                  <Link href="/contact">
                    <BellIcon className="h-6 w-6" />



                  </Link>
                </li>
                <li className="text-white p-3 relative ">
                  {/* <Link href="/account"> */}
                    <img
                    onClick={logout}
                      src="https://rb.gy/g1pwyx"
                      alt=""
                      className="cursor-pointer rounded"
                    />
                  {/* </Link> */}
                </li>

              </ul>

            </div>


          </div>
          <div>
            <div
              className={`flex-1 justify-self-center lg:mr-[19rem] md:mr-[3rem] phoneli md:block  ${navbar ? 'block' : 'hidden'
                }`}
            >
              <ul className="  items-center md:ml-2   md:justify-between md:flex md:space-x-1 md:space-y-0 ">
                <li className="text-white p-3 text-lg">
                  {/* <Link href="/tvshows"> */}
                    Tv shows
                  {/* </Link> */}
                </li>
                <li className="text-white p-3">
                  {/* <Link href="/films"> */}
                    Films
                  {/* </Link> */}
                </li>

                <li className="text-white p-3">
                  {/* <Link href="/popular"> */}
                    New & Popular 

                  {/* </Link> */}
                </li>
                <li className="text-white p-3">
                  {/* <Link href="/mylist"> */}
                   My list

                  {/* </Link> */}
                </li>



              </ul>

            </div>

          </div>
          <ul className="hidden text-red-600 items-center md:ml-6 md:justify-between md:flex md:space-x-1 md:space-y-0 ">

          < li className="text-white p-3">
                  {/* <Link href="/login"> */}
                    <SearchIcon className="sm h-6 w-6 sm:inline" />
                  {/* </Link> */}
                </li>
                <li className="text-white p-3">
                  {/* <Link href="/contact"> */}
                    <BellIcon className="h-6 w-6" />
                  {/* </Link> */}
                </li>
                <li className="text-white p-3 relative ">
                  {/* <Link href="/account"> */}
                    <img
                    onClick={logout}
                      src="https://rb.gy/g1pwyx"
                      alt=""
                      className="cursor-pointer rounded"
                    />
                  {/* </Link> */}
                </li>
          </ul>
        </div>
      </nav>


    </header>
  )
}

export default Header