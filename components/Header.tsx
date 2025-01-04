import { BasketIcon, LoginIcon, SearchIcon } from "@/icons"
import { NavListType } from "@/types/NavListType"
import Image from "next/image"
import Link from "next/link"
import CustomButton from "./CustomButton"

const Header = () => {
    const navList: NavListType[] = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "Shop",
            path: "/shop"
        },
        {
            title: "Plant Care",
            path: "/plant-care"
        },
        {
            title: "Blogs",
            path: "/blogs"
        },
    ]

  return (
    <header className="pt-[25px]">
        <div className="w-[1200px] mx-auto px-[10px] flex items-center justify-between">
            <Image style={{ width: "150px", height: "34px" }} priority src={"/logo.svg"} alt="Site Logo" width={150} height={34}/>
        
        <nav className="space-x-[50px]">
            {navList.map((item: NavListType, index: number) => (
                <Link className="font-normal text-[16px] leading-[20px]" key={index} href={`${item.path}`} >
                    {item.title}
                </Link>
            ))}
        </nav>
        <div className="flex items-center space-x-[30px]">
            <button><SearchIcon/></button>
            <button><BasketIcon/></button>
            <CustomButton leftIcon={<LoginIcon/>} title="Login" />
        </div>
        </div>
    </header>
  )
}

export default Header