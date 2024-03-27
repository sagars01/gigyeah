import axios from "axios";
import pdfParse from "pdf-parse";

type Summary = {
    summary: string;
};

async function extractTextFromPDF(pdfUrl: string): Promise<string> {

}

class AISummarize {
    static async getSummary(applicantionId: string): Promise<Summary> {
        try {
            const extractedTextFromPDF = await extractTextFromPDF(applicantionId);
            return {
                summary: extractedTextFromPDF // Placeholder: return the full text for now
            }
        } catch (error) {
            console.error('Error summarizing PDF:', error);
            throw new Error('Failed to summarize PDF');
        }
    }
}

export default AISummarize;
