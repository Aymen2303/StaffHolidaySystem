import { supabase } from "./SupabaseClient";
import { useNavigate } from "react-router-dom";

const userAuthOut = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try{
            await supabase.auth.signOut();
            console.log("User logged out successfully");
            navigate("/");
        } catch(error){
            console.error("Logout error:", error.message);
        }
    };

    return { logout };
};

export default userAuthOut;