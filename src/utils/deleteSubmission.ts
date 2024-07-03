export const DeleteSubmission = async (submissionId: string) => {
    try {
        const response = await fetch(`https://sila-agency-backend.onrender.com/deleteSubmission/${submissionId}`, {
            method: "DELETE"
        });
        const data = await response.json();

        return data;
    } catch (err) {
        alert("Error deleting submission");
    }
};