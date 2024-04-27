import ApiService from "@/app/libs/request/apiservice";
import URL from "@/app/utils/constants/url/url";
import logger, { LogLevel } from "@/app/utils/logging/logger";
import { AxiosRequestConfig } from "axios";

type Summary = {
    summary: string;
};

const AI_Service_URL = process.env.AI_ENGINE_API_BASE_URL;
const api = new ApiService(AI_Service_URL)

async function extractTextFromPDF(pdfUrls: string[], jobDescription: string, config: any): Promise<any> {
    const url = `${URL.api.private.ai.engine.compare}`
    const response = await api.post(url, {
        job_desc: jobDescription,
        pdf_urls: pdfUrls
    }, config)

    return response;
}

class AICompare {
    static async getComparison(pdfUrls: string[], jobDescription: string, config: AxiosRequestConfig): Promise<Summary> {
        try {
            logger.log(LogLevel.INFO, "Comparing Controller : Request Recieved")
            const extractedTextFromPDF = await extractTextFromPDF(pdfUrls, jobDescription, config);
            return extractedTextFromPDF;
        } catch (error) {
            logger.log(LogLevel.ERROR, "Comparing Controller Failed: Error Processing Request: " + error)
            throw new Error('Failed to Compare Resume');
        }
    }
}

export default AICompare;
