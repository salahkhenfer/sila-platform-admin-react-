export const DeletePost = async (postId: string) => {
    try {
        const response = await fetch(`https://sila-agency-backend.onrender.com/removePost/${postId}`, {
            method: "DELETE"
        });

        const data = await response.json()
        return data;
    } catch (err) {
        alert("Error deleting post")
    }
};