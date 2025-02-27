import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function Home() {
  return (
    <div>
      <header>
        <Menubar className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-gray-700 px-3 py-2 rounded-md">
              Menu
            </MenubarTrigger>
            <MenubarContent className="bg-gray-800 text-white rounded-md mt-2 shadow-lg">
              <MenubarItem key="login">
                <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md block">
                  login
                </Link>
              </MenubarItem>
              <MenubarItem key="register">
                <Link href="/register" className="hover:bg-gray-700 px-3 py-2 rounded-md block">
                  regiter
                </Link> 
              </MenubarItem>
              <MenubarSeparator className="border-gray-700" />
              <MenubarItem key="post">
                <Link href="/post" className="hover:bg-gray-700 px-3 py-2 rounded-md block">
                  Post
                </Link>
              </MenubarItem>
              <MenubarSeparator className="border-gray-700" />
              <MenubarItem key="about">
                <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md block">
                  Logout
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </header>
      <div>
        <h1 className="text-4xl text-center">Welcome</h1>
        <p className="text-center">The best place to play games with friends</p>
      </div>
    </div>
  );
}
