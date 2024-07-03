export const AddPostVideo = async (video: string, postId: string) => {
    try {
        const response = await fetch(`https://sila-agency-backend.onrender.com/addPostVideo/${postId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                video: video
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error sending post, please try again later!");
    }
};