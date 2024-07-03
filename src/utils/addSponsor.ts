export const AddSponsor = async (sponsorName: string, platform: string, sponsorIcon: string) => {
    try {
        const response = await fetch('https://sila-agency-backend.onrender.com/addSponsor', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sponsor_name: sponsorName,
                platform: platform,
                sponsor_icon: sponsorIcon
            })
        });

        const data = await response.json();
        return data
    } catch (error) {
        alert("Error happened, please make sure you filled everything, feel free to try again!");
    }
};