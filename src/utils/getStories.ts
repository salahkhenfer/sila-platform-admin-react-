export const GetStories = async () => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/stories");
        const data = await response.json();

        return data;
    } catch (err) {
        alert("Error getting stories!");
    }
};