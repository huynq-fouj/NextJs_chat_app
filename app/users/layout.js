import Sidebar from "../components/sidebar/SideBar"
import getUsers from "../actions/getUsers"
import UserList from "./components/UserList"
/**
 * Sử dụng không đồng bộ để tìm nạp người dùng trực tiếp từ cơ sở dữ liệu
 *  
 */
export default async function UsersLayout({children}){
    const users = await getUsers()
    return (
        <Sidebar>
            <div className="h-full">
                <UserList items={users}/>
                {children}
            </div>
        </Sidebar>
    )
}