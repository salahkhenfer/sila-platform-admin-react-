export const RemoveMessage = async (messageId: string) => {
    try {
        const response = await fetch(`https://sila-backend-v2.onrender.com/v2/message/${messageId}`, {
            method: "DELETE"
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error removing message: ", err);
    }
};