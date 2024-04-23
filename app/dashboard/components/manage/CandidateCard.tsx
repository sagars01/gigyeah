import { apiService } from "@/app/libs/request/apiservice";
import { message } from "antd";
import { useState } from "react";

const CandidateApplicantCard: React.FC<CandidateCardProps> = ({ jobDesc, applicants }) => {
    const [summarizeState, setSummarizeState] = useState<'loading' | 'error' | 'complete' | null>(null)
    const [summaryApplicationId, setSummarizeApplicationId] = useState<string>('')

    const updateApplicationStatus = async (applicantId: string, status: 'shortlisted' | 'rejected') => {
        const updateResponse = await apiService.put(`/application/update`, {
            applicantId,
            status
        })
        return updateResponse;
    };

    const handleSummarize = async (applicantId: string, resumeUrl: string) => {
        const url = `/ai/summarize`;
        const body = {
            resumeUrl,
            jobDescription: jobDesc
        }
        try {
            setSummarizeApplicationId(applicantId)
            setSummarizeState('loading')
            const response: any = await apiService.post(url, body)
            const { summary: { text } } = response;
            setSummarizeState('complete')

        } catch (error: any) {
            setSummarizeState('error')
        } finally {
            setSummarizeState(null)
        }
    }

    const handleShortlist = async (applicant: Applicant) => {
        try {
            await updateApplicationStatus(applicant._id, 'shortlisted');

            message.success(`${applicant.applicantName} has been shortlisted.`);
        } catch (error) {
            message.error('Failed to shortlist applicant.');
        }
    };

    const handleReject = async (applicant: Applicant) => {
        try {
            await updateApplicationStatus(applicant._id, 'rejected');

            message.success(`${applicant.applicantName} has been rejected.`);
        } catch (error) {
            message.error('Failed to reject applicant.');
        }
    };

    return (
        <>
        </>
    )
}

export default CandidateApplicantCard

interface CandidateCardProps {
    jobDesc: string;
    applicants: Applicant[]
}

interface Applicant {
    _id: string;
    jobId: string;
    ownerId: string;
    email: string;
    name: string;
    applicantName: string;
    shortIntro: string;
    resumeUrl: string;
    status: keyof typeof nextStatus;
}


const nextStatus = {
    applied: 'shortlisted',
    shortlisted: 'interview',
    interview: 'hired'
};