// Google Gemini API configuration
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const getAIResponse = async (message) => {
  try {
    console.log("Sending request to Gemini API...");
    const response = await fetch(
      `${API_URL}?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.warn("No generated text in response:", data);
      return "I'm sorry, I couldn't generate a response. Please try again.";
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error getting AI response:", error);
    if (error.message.includes("401")) {
      return "Authentication error: Please check your API key.";
    } else if (error.message.includes("429")) {
      return "Rate limit exceeded: Please try again in a few moments.";
    } else if (error.message.includes("403")) {
      return "Access denied: Please check your API key and permissions.";
    } else if (error.message.includes("404")) {
      return "API endpoint not found. Please check your API configuration.";
    } else if (error.message.includes("400")) {
      return "Bad request: The request was invalid. Please check your input and try again.";
    } else {
      return `Error: ${error.message}. Please try again.`;
    }
  }
};
