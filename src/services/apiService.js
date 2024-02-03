import http from "../features/http.js";


export async function fetchQuestions() {
    try {
        const response = await http.get(
            "/test?testCode=test1"
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}