import ApiService from "@/app/libs/request/apiservice";

type Summary = {
    summary: string;
};

const AI_Service_URL = process.env.AI_ENGINE_API_BASE_URL;
const api = new ApiService(AI_Service_URL)

async function extractTextFromPDF(pdfUrl: string, jobDescription: string): Promise<any> {
    const url = `/api/v1/summarize?pdf_url=${pdfUrl}`
    const response = await api.post(url, {
        job_desc: jobDescription
    })

    return response;
}

class AISummarize {
    static async getSummary(pdfUrl: string, jobDescription: string): Promise<Summary> {
        try {
            const extractedTextFromPDF = await extractTextFromPDF(pdfUrl, jobDescription);
            return {
                summary: extractedTextFromPDF
            }
        } catch (error) {
            console.error('Error summarizing PDF:', error);
            throw new Error('Failed to summarize PDF');
        }
    }
}

export default AISummarize;
