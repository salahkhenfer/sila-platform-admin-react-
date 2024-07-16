export const GetMessages = async (chatId: string) => {
    try {
        const response = await fetch(`https://sila-backend-v2.onrender.com/v2/messages/${chatId}`);
        const data = await response.json();

        return data;
    } catch (err) {
        console.error("Error getting messages: ", err);
    }
};