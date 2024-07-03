export const UpdateStatus = async (submissionId: string, status: string) => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/updateSubmissionStatus", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                submission_id: submissionId,
                situation: status
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error updating status");
    }
};