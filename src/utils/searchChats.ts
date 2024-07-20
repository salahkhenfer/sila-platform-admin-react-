export const SearchChats = async (query: string) => {
    try {
        const response = await fetch(`https://sila-backend-v2.onrender.com/v2/chats/${query}`);
        const data = await response.json();

        return data;
    } catch (err) {
        console.error("Error searching chats: ", err);
    }
};