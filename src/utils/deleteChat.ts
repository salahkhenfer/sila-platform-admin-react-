export const DeleteChat = async (chatId: string) => {
    try {
        const response = await fetch(`https://sila-backend-v2.onrender.com/v2/removeChat/${chatId}`, {
            method: "DELETE"
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error deleting chat: ", err);
    }
};