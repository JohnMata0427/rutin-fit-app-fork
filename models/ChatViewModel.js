import { chat } from "../services/AuthService";
export function ChatViewModel() {
    const handleChat = async (token, client_id, coach_id) => {
        try {
            const datos = await chat(token, client_id, coach_id);
            return { success: true , datos }
        } catch (error) {
            console.error(error);
            return { success: false , error}
        }
    }
    return { handleChat }
}