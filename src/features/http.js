const http = {
    async get(url) {
        try {
            const response = await fetch(`https://nexuscrm-bot-8jmi7.ondigitalocean.app/api/v1${url}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    // You can add more methods like post, put, delete if needed
};

export default http;
