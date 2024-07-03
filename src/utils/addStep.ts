export const AddStep = async (goalId: string, stepNum: number, title: string, stepType: string, content: string, note: string) => {
    try {
        const response = await fetch('https://sila-agency-backend.onrender.com/addGoalStep', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                goal_id: goalId,
                step_num: stepNum,
                title: title,
                step_type: stepType,
                content: content,
                note: note
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error happened, please make sure you filled everything, feel free to try again!");
    }
};