export const DeleteStory = async (StoryId: string) => {
  try {
    const response = await fetch(
      `https://sila-agency-backend.onrender.com/removeStory/${StoryId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    alert("Error deleting Story");
  }
};
