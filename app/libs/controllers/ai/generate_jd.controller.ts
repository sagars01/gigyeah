import ApiService from "@/app/libs/request/apiservice";
import URL from "@/app/utils/constants/url/url";
import logger, { LogLevel } from "@/app/utils/logging/logger";
import { AxiosRequestConfig } from "axios";

type Summary = {
    summary: string;
};

const AI_Service_URL = process.env.AI_ENGINE_API_BASE_URL;
const api = new ApiService(AI_Service_URL)

async function generateJobDesc(
    job_title: string,
    mandatory_skills: string[],
    config: any): Promise<any> {
    const url = `${URL.api.private.ai.engine.generateJD}`
    const response = await api.post(url, {
        job_title,
        mandatory_skills
    }, config)

    return response;
}

class AIGenerateJD {

    static async getJobDescription(job_title: string, mandatory_skills: string[], config: AxiosRequestConfig): Promise<Summary> {
        try {
            logger.log(LogLevel.INFO, "Summarize Controller : Request Recieved")
            const extractedTextFromPDF = await generateJobDesc(job_title, mandatory_skills, config);
            return extractedTextFromPDF;
        } catch (error) {
            logger.log(LogLevel.ERROR, "Generate JD Controller Failed: Error Processing Request: " + error)
            throw new Error('Failed to Generate PDF');
        }
    }
}

export default AIGenerateJD;
