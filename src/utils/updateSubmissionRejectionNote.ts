export const UpdateRejectionNote = async (submissionId: string, note: string) => {
    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/updateRejectionNote", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                submission_id: submissionId,
                note: note
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        alert("Error updating rejection note!");
    }
};