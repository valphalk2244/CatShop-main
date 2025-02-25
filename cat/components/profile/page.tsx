import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from "next/link";
// import { useRouter } from "next/navigation"
  
  

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
                <MenubarItem key="profile">
                  <Link href="/profile" className="hover:bg-gray-700 px-3 py-2 rounded-md block">
                    Profile
                  </Link>
                </MenubarItem>
                <MenubarItem key="shop">
                  <Link href="/shop" className="hover:bg-gray-700 px-3 py-2 rounded-md block">
                    Shop
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
              <div className="grid grid-cols-6 gap-4 mt-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <Card key={index} className="bg-gray-800 text-white rounded-lg shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Cat Name {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300">Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-gray-400">Card Footer</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
          
    </div>
  );
}
