export const DeleteFile = async (url: string) => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/removeFile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error deleting file!");
    }
};