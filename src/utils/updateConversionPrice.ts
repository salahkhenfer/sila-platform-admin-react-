export const UpdateConversion = async (price: number) => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/updateConversion", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price: price
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error updating conversion");
    }
};