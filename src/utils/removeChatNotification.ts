export const RemoveNotification = async (chatId: string) => {
    try {
        const response = await fetch(`https://sila-backend-v2.onrender.com/v2/removeNotification/${chatId}`, {
            method: "PUT"
        });
        const data = await response.json();

        return data;
    } catch (err) {
        console.error("Error removing notification: ", err);
    }
};