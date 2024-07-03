export const AddPostPhoto = async (photo: string, postId: string) => {
    try {
        const response = await fetch(`https://sila-agency-backend.onrender.com/addPostPhoto/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                photo: photo
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error sending post, please try again later!");
    }
};