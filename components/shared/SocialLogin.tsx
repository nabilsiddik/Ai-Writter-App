import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const SocialLogin = () => {
    return (
        <div className="flex items-center gap-5">
            <Button className="bg-[#e9ebec] text-gray-600 hover:bg-[#e1e3e4] cursor-pointer flex-1">
                <FcGoogle />
                Google
            </Button>
            <Button className="bg-[#e9ebec] text-gray-600 hover:bg-[#e1e3e4] cursor-pointer flex-1">
                <FaFacebook className="text-blue-600" />
                Facebook
            </Button>
        </div>
    )
}

export default SocialLogin