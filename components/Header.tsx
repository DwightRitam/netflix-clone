import { SearchIcon, BellIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth";
const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const [searchitem, setsearchitem] = useState('');
  const [showitem, setshowitem] = useState('');
  const [isScrolled, setIsScrolled] = useState(false)

  const [toggledclass, settoggledclass] = useState("hidden");


  const toggle = () => {
    if (toggledclass == "hidden") {
      settoggledclass("block")
    }
    else {
      settoggledclass("hidden")
    }

  }
  const showSubmit = (e: any): any => {
    e.preventDefault();

    router.push(`/show/${showitem}`)
    setshowitem('')
    settoggledclass("hidden")
  };
  const handleSubmit = (e: any): any => {
    e.preventDefault();

    router.push(`/search/${searchitem}`)
    setsearchitem('')
    settoggledclass("hidden")
  };
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
    if (navbar && window.scrollY == 0) {

      setIsScrolled(false)
    }
    else {
      setIsScrolled(true)
    }
  }
  const { logout } = useAuth()

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>

      <nav className="w-full  navbg  ">
        <div className="md:justify-between px-2 mx-auto lg:max-w-7xl md:items-center md:flex">
          <div>
            <div className="flex items-center md:text-center justify-between py-3 md:py-5 md:block">

              <div className="md:hidden">
                <button
                  className="mr-2 p-1 text-gray-700 rounded-md outline-none focus:border-gray-400"
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
                  className="cursor-pointer object-contain w-[5rem]"
                />
              </Link>
              <ul className=" flex md:hidden text-red-600 items-center md:ml-6   md:space-x-1 md:space-y-0 ">


                < li className="text-white p-2">
                  <div className="p-[2px]">

                    <div className=" dropdown inline-block relative">
                      <button onClick={toggle} className="  font-semibold py-2 mt-[-9px] md:m-0 ml-[-24px] md:ml-[-25px] px-4 rounded inline-flex items-center">
                        <span className="mr-1 text-[15px] font-serif">Search by </span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                      </button>
                      <ul className={`dropdown-menu absolute  ${toggledclass} text-gray-700 `}>
                        <form onSubmit={showSubmit} autoComplete="off" className="p-1 relative text-white
                  focus-within:text-gray-600">
                          <label htmlFor="search-field" className="sr-only">
                            Search all files
                          </label>
                          <div className="flex w-[140px] p-2 flex-row justify-start items-center -ml-3 border rounded-[5px] border-white">
                            <input
                              name="search-field"
                              autoComplete="off"
                              id="search-field"
                              className=" bg-transparent ml-[1px] font-serif border-white placeholder-white outline-none text-[13px] text-white "
                              placeholder="Search By Show title..."
                              type="search"
                              value={showitem}
                              onChange={(e) => setshowitem(e.target.value)}
                            />
                          </div>
                        </form>
                        <form onSubmit={handleSubmit} autoComplete="off" className="p-1 relative text-white
                  focus-within:text-gray-600">
                          <label htmlFor="search-field" className="sr-only">
                            Search all files
                          </label>
                          <div className="flex w-[140px] p-2 flex-row justify-start items-center -ml-3 border rounded-[5px] border-white">
                            <input
                              name="search-field"
                              autoComplete="off"
                              id="search-field"
                              className=" bg-transparent font-serif ml-[1px] border-white placeholder-white outline-none text-[13px] text-white "
                              placeholder="Search By Film title..."
                              type="search"
                              value={searchitem}
                              onChange={(e) => setsearchitem(e.target.value)}
                            />
                          </div>
                        </form>

                      </ul>
                    </div>

                  </div>
                </li>

                <li className="text-white p-1 relative ">
                  {/* <Link href="/account"> */}
                  <img
                    onClick={logout}
                    src="https://rb.gy/g1pwyx"
                    alt=""
                    className="cursor-pointer rounded  w-[25px]"
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
                <li className="text-white p-3 text-sm lg:text-lg">
                  {/* <Link href="/tvshows"> */}
                  Shows
                  {/* </Link> */}
                </li>
                <li className="text-white p-3 text-sm lg:text-lg">

                  {/* <Link href="/films"> */}
                  Films
                  {/* </Link> */}
                </li>

                <li className="text-white p-3 text-sm lg:text-lg">

                  {/* <Link href="/popular"> */}
                  Popular

                  {/* </Link> */}
                </li>
                <li className="text-white p-3 text-sm lg:text-lg">

                  <Link href="/mylist">
                  My list

                  </Link>
                </li>



              </ul>

            </div>

          </div>
          <ul className="hidden text-red-600 items-center md:ml-6 md:justify-between md:flex md:space-x-1 md:space-y-0 ">

            < li className="text-white p-2">
              <div className="p-[2px]">

                <div className=" dropdown inline-block relative">
                  <button onClick={toggle} className="  font-semibold py-2 mt-[-9px] md:m-0 ml-[-24px] md:ml-[-25px] px-4 rounded inline-flex items-center">
                    <span className="mr-1 text-[30px] font-serif">Search by </span>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                  </button>
                  <ul className={`dropdown-menu absolute  ${toggledclass} text-gray-700 `}>
                    <form onSubmit={showSubmit} autoComplete="off" className="p-2 relative text-white
focus-within:text-gray-600">
                      <label htmlFor="search-field" className="sr-only">
                        Search all files
                      </label>
                      <div className="flex w-[200px] p-2 flex-row justify-start items-center ml-2 border rounded-[5px] border-white">
                        <input
                          name="search-field"
                          autoComplete="off"
                          id="search-field"
                          className=" bg-transparent font-serif -ml-1 border-white placeholder-white outline-none text-[13px] text-white "
                          placeholder="Search By Show title..."
                          type="search"
                          value={showitem}
                          onChange={(e) => setshowitem(e.target.value)}
                        />
                      </div>
                    </form>
                    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 relative text-white
focus-within:text-gray-600">
                      <label htmlFor="search-field" className="sr-only">
                        Search all files
                      </label>
                      <div className="flex w-[200px] p-2 flex-row justify-start items-center ml-2 border rounded-[5px] border-white">
                        <input
                          name="search-field"
                          autoComplete="off"
                          id="search-field"
                          className=" bg-transparent font-serif -ml-1 border-white placeholder-white outline-none text-[13px] text-white "
                          placeholder="Search By Film title..."
                          type="search"
                          value={searchitem}
                          onChange={(e) => setsearchitem(e.target.value)}
                        />
                      </div>
                    </form>

                  </ul>
                </div>

              </div>
            </li>
            <li className="text-white p-3 relative ">
              {/* <Link href="/account"> */}
              <img
                onClick={logout}
                src="https://rb.gy/g1pwyx"
                alt=""
                className="cursor-pointer rounded sm:w-[30px]"

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