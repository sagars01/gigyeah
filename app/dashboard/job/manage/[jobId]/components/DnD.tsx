import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card as AntdCard, Divider, Skeleton, message } from 'antd';
import { apiService } from '@/app/libs/request/apiservice';
import { Applicant } from '@/app/dashboard/components/manage/ApplicantManagement';

const columns: Column[] = [
    { id: 'applied', title: 'Applied' },
    { id: 'screen', title: 'Screen' },
    { id: 'interview', title: 'Interview' },
    { id: 'offer', title: 'Offer' },
    { id: 'hired', title: 'Hired' },
    { id: 'archived', title: 'Archived' },
];

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, moveCard, status }) => {
    const [, drag] = useDrag({
        type: 'card',
        item: { id: applicant._id, status },
    });

    const [, drop] = useDrop({
        accept: 'card',
        drop: (item: any) => {
            if (item.id !== applicant._id) {
                moveCard(item.id, item.status, status);
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className="bg-white p-4 mb-2 rounded-md shadow">
            <AntdCard>{applicant.applicantName}</AntdCard>
        </div>
    );
};

const DragAndDropColumns: React.FC<Props> = ({ jobDetails, userId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [applicants, setApplicants] = useState<Record<string, Applicant[]>>({});

    const fetchApplicants = async () => {
        setLoading(true);
        try {
            const response = await apiService.get<{ applicants: Applicant[] }>(`/application/fetch?jobId=${jobDetails.jobId}`);
            const applicantMap: Record<string, Applicant[]> = {};

            response.applicants?.forEach((applicant: Applicant) => {
                if (!applicantMap[applicant.status]) {
                    applicantMap[applicant.status] = [];
                }
                applicantMap[applicant.status].push(applicant);
            });

            setApplicants(applicantMap);
        } catch (error) {
            setError(true);
            message.error('Failed to fetch applicants');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, [userId]);

    const moveCard = async (cardId: string, sourceStatus: string, destStatus: string) => {
        try {
            await apiService.post(`/application/update-status`, {
                applicantId: cardId,
                status: destStatus,
            });

            setApplicants((prevApplicants) => {
                const sourceColumn = prevApplicants[sourceStatus] || [];
                const targetColumn = prevApplicants[destStatus] || [];
                const movedCardIndex = sourceColumn.findIndex((card) => card._id === cardId);

                if (movedCardIndex === -1) {
                    return prevApplicants;
                }

                const [movedCard] = sourceColumn.splice(movedCardIndex, 1);
                targetColumn.push(movedCard);

                console.log(`Moved ${movedCard.applicantName} from ${sourceStatus} to ${destStatus}`);

                return {
                    ...prevApplicants,
                    [sourceStatus]: sourceColumn,
                    [destStatus]: targetColumn,
                };
            });
        } catch (error) {
            message.error('Failed to update applicant status');
        }
    };

    return (
        <>
            {!loading && !error && (
                <DndProvider backend={HTML5Backend}>
                    <div className="flex p-10 w-full bg-gray-100 rounded-lg overflow-x-scroll">
                        {columns.map((column) => (
                            <div key={column.id} className="flex-none bg-white w-80 mr-4 min-h-80 max-h-40 overflow-y-scroll border border-gray-300 rounded-lg shadow">
                                <div className="p-4 rounded relative">
                                    <h3 className="text-lg font-semibold">{column.title}</h3>
                                    <Divider />
                                    {applicants[column.id]?.map((applicant, index) => (
                                        <ApplicantCard
                                            key={applicant._id}
                                            applicant={applicant}
                                            moveCard={moveCard}
                                            status={column.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </DndProvider>
            )}

            {loading && (
                <div>
                    <Skeleton />
                </div>
            )}
        </>
    );
};

export default DragAndDropColumns;

interface Props {
    jobDetails: any;
    userId: string;
}

interface Column {
    id: string;
    title: string;
}

interface ApplicantCardProps {
    applicant: Applicant;
    moveCard: (cardId: string, sourceStatus: string, destStatus: string) => void;
    status: string;
}
