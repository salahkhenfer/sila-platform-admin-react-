export const AddGoal = async (goalName: string, sponsorId: string, price: number, currency: string, priceDuration: number, durationType: string) => {
    try {
        const response = await fetch('https://sila-agency-backend.onrender.com/addGoal', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                goal_name: goalName,
                sponsor_id: sponsorId,
                price: price,
                currency: currency,
                price_duration: priceDuration,
                duration_type: durationType
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error happened, please make sure you filled everything, feel free to try again!");
    }
};