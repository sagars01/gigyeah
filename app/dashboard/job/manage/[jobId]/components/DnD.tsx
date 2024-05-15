import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card as AntdCard, Divider, Skeleton, message } from 'antd';
import { Applicant } from '@/app/dashboard/components/manage/ApplicantManagement';
import { apiService } from '@/app/libs/request/apiservice';

const columns: Column[] = [
    { id: 'applied', title: 'Applied' },
    { id: 'screen', title: 'Screen' },
    { id: 'interview', title: 'Interview' },
    { id: 'offer', title: 'Offer' },
    { id: 'hired', title: 'Hired' },
    { id: 'archived', title: 'Archived' },
];

const DragAndDropColumns: React.FC<Props> = ({ jobDetails, userId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [applicants, setApplicants] = useState<Record<string, Applicant[]>>({});

    const fetchApplicants = async () => {
        setLoading(true);
        try {
            const response = await apiService.get<{ applicants: Applicant[] }>(`/application/fetch?jobId=${jobDetails.jobId}`);
            const applicantMap: Record<string, Applicant[]> = {};

            if (response.applicants) {
                response.applicants.forEach((applicant: Applicant) => {
                    if (!applicantMap[applicant.status]) {
                        applicantMap[applicant.status] = [];
                    }
                    applicantMap[applicant.status].push(applicant);
                });
            }
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
                    <div className="flex p-10" style={{ width: '100%', background: '#f0f0f0', borderRadius: '10px', overflowX: 'scroll' }}>
                        {columns.map((column) => (
                            <div key={column.id} className="flex-none bg-white w-80 mr-4 min-h-80 max-h-40 overflow-y-scroll border border-gray-300 rounded-lg shadow">
                                <div className="p-4 rounded relative">
                                    <h3 className="text-lg font-semibold">{column.title}</h3>
                                    <Divider />
                                    {applicants[column.id]?.map((applicant, index) => (
                                        <ApplicantCard
                                            key={applicant._id}
                                            applicant={applicant}
                                            index={index}
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

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, index, moveCard, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'card',
        drop: (item: any) => {
            if (item.id !== applicant._id) {
                moveCard(item.id, item.status, status);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const [, drag] = useDrag({
        type: 'card',
        item: { id: applicant._id, status, index },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`bg-white p-4 mb-2 rounded-md shadow ${isOver ? 'bg-green-100' : ''}`}
        >
            <AntdCard>{applicant.applicantName}</AntdCard>
        </div>
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
    index: number;
    moveCard: (cardId: string, sourceStatus: string, destStatus: string) => void;
    status: string;
}