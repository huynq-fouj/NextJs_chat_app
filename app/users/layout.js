import Sidebar from "../components/sidebar/SideBar"

/**
 * Sử dụng không đồng bộ để tìm nạp người dùng trực tiếp từ cơ sở dữ liệu
 *  
 */
export default async function UsersLayout({children}){

    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}