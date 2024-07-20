export const GetMessages = async (chatId: string, limit: number, pageNum: number) => {
    try {
        const response = await fetch(`https://sila-backend-v2.onrender.com/v2/messages/${chatId}/${limit}/${pageNum}`);
        const data = await response.json();

        return data;
    } catch (err) {
        console.error("Error getting messages: ", err);
    }
};