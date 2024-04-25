import ApiService from "@/app/libs/request/apiservice";
import URL from "@/app/utils/constants/url/url";
import logger, { LogLevel } from "@/app/utils/logging/logger";
import { AxiosRequestConfig } from "axios";

type Summary = {
    summary: string;
};

const AI_Service_URL = process.env.AI_ENGINE_API_BASE_URL;
const api = new ApiService(AI_Service_URL)

async function extractTextFromPDF(pdfUrl: string, jobDescription: string, config: any): Promise<any> {
    const url = `${URL.api.private.ai.engine.summarize}?pdf_url=${pdfUrl}`
    const response = await api.post(url, {
        job_desc: jobDescription
    }, config)

    return response;
}

class AISummarize {
    static async getSummary(pdfUrl: string, jobDescription: string, config: AxiosRequestConfig): Promise<Summary> {
        try {
            logger.log(LogLevel.INFO, "Summarize Controller : Request Recieved")
            const extractedTextFromPDF = await extractTextFromPDF(pdfUrl, jobDescription, config);
            return {
                summary: extractedTextFromPDF
            }
        } catch (error) {
            logger.log(LogLevel.ERROR, "Summarize Controller Failed: Error Processing Request: " + error)
            console.error('Error summarizing PDF:', error);
            throw new Error('Failed to summarize PDF');
        }
    }
}

export default AISummarize;
