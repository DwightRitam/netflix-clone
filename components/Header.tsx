import {SearchIcon,BellIcon } from "@heroicons/react/solid"
import Link from "next/link"
import {useState,useEffect} from 'react'
const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handlescroll=()=>{
      if(window.scrollY >0){
        setIsScrolled(true)
      }
      else{
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll",handlescroll)

    return()=>{
      window.removeEventListener("scroll", handlescroll)
    }
  
    
  }, [])
  
  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
        <div className="flex items-center space-x-4 md:space-x-10 ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 lg:space-x-7 pl-12 md:flex">
            <li className="headerLink">Home</li>
            <li className="headerLink">Tv Shows</li>
            <li className="headerLink">Films</li>
            <li className="headerLink">New & Popular </li>
            <li className="headerLink">My list</li>
        </ul>
        </div>


        <div>

        <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="sm hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>

            
        </div>
    </header>
  )
}

export default Header