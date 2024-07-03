export const AddStory = async (highlight: string, story: string) => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/addStory", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: highlight,
                story: story
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error creating story, please try again later!");
    }
};