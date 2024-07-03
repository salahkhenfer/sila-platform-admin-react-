export const AddItem = async (stepId: string, content: string) => {
    try {
        const response = await fetch('https://sila-agency-backend.onrender.com/addItem', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                step_id: stepId,
                content: content
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error happened, please make sure you filled everything, feel free to try again!");
    }
};