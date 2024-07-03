export const AddPost = async (post: string) => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/addPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                post_text: post
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error sending post, please try again later!");
    }
};