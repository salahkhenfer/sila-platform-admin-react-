export const AddStory = async (highlight: string, Story: string) => {
  try {
    const response = await fetch(
      "https://sila-agency-backend.onrender.com/addStory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: highlight,
          Story: Story,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    alert("Error creating Story, please try again later!");
  }
};
