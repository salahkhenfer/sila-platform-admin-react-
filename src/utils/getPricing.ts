export const GetPricing = async () => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/pricing");

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error getting pricing");
    }
};