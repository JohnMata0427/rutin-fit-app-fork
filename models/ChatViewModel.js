import { chat } from "../services/AuthService";
export function ChatViewModel() {
    const handleChat = async (token) => {
        try {
            const datos = await chat(token);
            console.log(datos);
            return { success: true , datos }
        } catch (error) {
            console.error(error);
            return { success: false , error}
        }
    }
    return { handleChat }
}