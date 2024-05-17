import { apiService } from '@/app/libs/request/apiservice';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Applicant {
    status: any;
    id: number;
    text: string;
    fromColumn: string;
}

interface ColumnData {
    [key: string]: Applicant[];
}

interface DraggableCardProps {
    item: Applicant;
}

interface DroppableColumnProps {
    columnId: string;
    onDrop: (item: Applicant, columnId: string) => void;
    children: React.ReactNode; // Explicitly type children as ReactNode
}

const ItemTypes = {
    CARD: 'card',
};



const DraggableCard: React.FC<DraggableCardProps> = ({ item }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div ref={drag} style={{ opacity }} className="bg-white p-4 mb-2 rounded-md shadow">
            {item.text}
        </div>
    );
};

const DroppableColumn: React.FC<DroppableColumnProps> = ({ children, columnId, onDrop }) => {
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item: Applicant, monitor: DropTargetMonitor) => {
            onDrop(item, columnId);
        },
    });

    return (
        <div ref={drop} className="bg-gray-200 p-4 w-1/5 min-h-64">
            {children}
        </div>
    );
};

interface Props {
    jobDetails: any;
    userId: string;
}

const DragAndDropComponent: React.FC<Props> = ({ jobDetails, userId }) => {

    const [data, setData] = useState<ColumnData>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [applicants, setApplicants] = useState<Record<string, Applicant[]>>({});
    const fetchApplicants = async () => {
        setLoading(true);
        try {
            const response: any = await apiService.get<{ columns: string[], data: Record<string, Applicant[]> }>(`/application/fetch?jobId=${jobDetails.jobId}`);

            // Massage the data to fit into the drag and drop component
            const columns = ['applied', 'screen', 'interview', 'offer', 'hired', 'archived'];
            const data = columns.reduce((acc, columnId) => {
                acc[columnId] = response.filter(applicant => applicant.status === columnId);
                return acc;
            }, {});
            setData(data)
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

    const moveCard = (item: any, toColumn: string) => {
        setData((prevData: any) => {
            const fromColumn = item.status;
            if (!fromColumn || fromColumn === toColumn || !prevData[fromColumn]) return prevData;

            const fromItems = prevData[fromColumn].filter((i) => i.id !== item.id);
            const toItems = [...(prevData[toColumn] || []), { ...item, status: toColumn }];

            const newData = {
                ...prevData,
                [fromColumn]: fromItems,
                [toColumn]: toItems,
            };

            return newData;
        });

        console.log(`Moved ${item.text} from ${item.fromColumn} to ${toColumn}`);
    };





    return (
        <>
            {
                !loading && data && <DndProvider backend={HTML5Backend}>
                    <div className="flex space-x-4">
                        <DroppableColumn columnId="applied" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Applied</h3>
                            {data.applied.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="screen" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Screen</h3>
                            {data.screen.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="interview" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Interview</h3>
                            {data.interview.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="offer" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Offered</h3>
                            {data.offer.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="hired" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Hired</h3>
                            {data.hired.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="archived" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Archived</h3>
                            {data.archived.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                    </div>
                </DndProvider>
            }

        </>
    );
};

export default DragAndDropComponent;
