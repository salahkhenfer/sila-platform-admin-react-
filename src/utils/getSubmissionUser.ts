export const GetUserInfo = async (submissionId: string) => {
    try {
        const response = await fetch(`https://sila-agency-backend.onrender.com/getSubmissionUserInfo/${submissionId}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};