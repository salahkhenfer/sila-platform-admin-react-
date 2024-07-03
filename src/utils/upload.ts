export const UploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("https://sila-agency-backend.onrender.com/uploadFile", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error uploading file, please try again later!");
    }
};