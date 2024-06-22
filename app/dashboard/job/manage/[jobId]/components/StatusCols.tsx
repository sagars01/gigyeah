import { apiService } from '@/app/libs/request/apiservice';
import { Button, Divider, Modal, message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React, { ReactNode, useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
    const [showResume, setShowResume] = useState(false)
    const opacity = isDragging ? 0.5 : 1;

    return (
        <div
            ref={drag}
            style={{ opacity }}
            className="bg-white p-4 mb-2 rounded-md shadow w-64 md:w-auto lg:w-auto xl:w-auto"
        >
            <Modal
                centered={true}
                footer={false}
                open={showResume}
                onCancel={() => { setShowResume(false) }}
                width={'80%'} // Set modal width to fullscreen
                style={{ top: 0, left: 0, right: 0, bottom: 0 }} // Position the modal at the top left corner and cover the whole screen
                bodyStyle={{ height: '80vh', overflow: 'auto' }} // Set the body height to full screen height with scrolling
            >
                <iframe
                    title="Resume"
                    className='p-4'
                    width={'100%'}
                    height={'100%'}
                    src={`${item.resumeUrl}#zoom=100`} />
            </Modal>
            <Paragraph className='bold font-semibold'>{item.applicantName}</Paragraph>
            <Paragraph ellipsis={{
                rows: 1,
                expandable: true
            }}

            >{item.shortIntro}</Paragraph>
            <div className="min-h-8 mt-3 relative"> {/* Added a container to push the button down */}
                <Button
                    type="primary"
                    className="float-end" // Added ml-auto to push the button to the right
                    onClick={() => { setShowResume(true) }}
                >
                    Resume
                </Button>
            </div>

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

    const maxHeightClass = React.Children.count(children) > 5 ? 'max-h-64 overflow-y-scroll' : '';

    return (
        <div ref={drop} className={`bg-gray-200 p-4 w-1/5 min-w-64 min-h-64 mb-8 ${maxHeightClass}`}>
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
    // const [applicants, setApplicants] = useState<Record<string, Applicant[]>>({});
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

        // console.log(`Moved ${item.text} from ${item.fromColumn} to ${toColumn}`);
    };





    return (
        <>
            {
                !loading && data && <DndProvider backend={HTML5Backend}>
                    <div className="flex space-x-4 overflow-x-auto">
                        <DroppableColumn columnId="applied" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Applied</h3>
                            <Divider />
                            {data.applied.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="screen" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Screen</h3>
                            <Divider />
                            {data.screen.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="interview" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Interview</h3>
                            <Divider />
                            {data.interview.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="offer" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Offered</h3>
                            <Divider />
                            {data.offer.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="hired" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Hired</h3>
                            <Divider />
                            {data.hired.map((item) => (
                                <DraggableCard key={item.id} item={item} />
                            ))}
                        </DroppableColumn>
                        <DroppableColumn columnId="archived" onDrop={(item, columnId) => moveCard(item, columnId)}>
                            <h3 className="text-lg font-semibold">Archived</h3>
                            <Divider />
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


interface Applicant {
    resumeUrl: string | undefined;
    shortIntro: ReactNode;
    applicantName: ReactNode;
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
