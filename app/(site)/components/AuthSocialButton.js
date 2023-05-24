/**
 * 
 * @param {*} props : {icon: react-icons element, onClick: () => { ... }} 
 * @returns 
 */
export default function AuthSocialButton({icon, onClick}){
    return (
        <button type="button"
            onMouseMove={() => {}}
            onClick={onClick}
            className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 hover:text-black"
        >
            {icon}
        </button>
    )
}