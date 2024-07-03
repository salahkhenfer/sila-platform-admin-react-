export const DeleteStory = async (storyId: string) => {
    try {
        const response = await fetch(`https://sila-agency-backend.onrender.com/removeStory/${storyId}`, {
            method: "DELETE"
        });

        const data = await response.json()
        return data;
    } catch (err) {
        alert("Error deleting story")
    }
};