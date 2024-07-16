export const GetChats = async () => {
    try {
        const response = await fetch("https://sila-backend-v2.onrender.com/v2/chats");
        const data = await response.json();

        return data;
    } catch (err) {
        console.error("Error getting chats: ", err);
    }
};