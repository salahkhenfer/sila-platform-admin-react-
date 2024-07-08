export const DirectPay = async (submissionId: string) => {
    try {
        const response = await fetch(`https://sila-backend-v2.onrender.com/v2/directPay/${submissionId}`);
        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err);
    }
};