export const GetSubmissions = async () => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/sponsorSubmittions");
        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error getting submissions!")
    }
};