import http from "../features/http.js";

export async function fetchQuestions() {
    try {
        return await http.get("/test?testCode=test1"); // Assuming response is already in the desired format, adjust as needed
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
}
