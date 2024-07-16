export const SendMessage = async (chatId: string, senderId: string, messageType: string, content: string) => {
    try {
        const response = await fetch("https://sila-backend-v2.onrender.com/v2/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                sender_id: senderId,
                message_type: messageType,
                content: content
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error sending message: ", err);
    }
};