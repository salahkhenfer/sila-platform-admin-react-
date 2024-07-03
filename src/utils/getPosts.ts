export const GetPosts = async () => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/posts");
        const data = await response.json();

        return data;
    } catch (err) {
        alert("Error getting posts!");
    }
};