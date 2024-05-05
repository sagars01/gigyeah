import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card as AntdCard, Divider } from 'antd';

const ItemTypes = {
    CARD: 'card' as const,
};

interface Column {
    id: string;
    title: string;
}

interface Card {
    id: string;
    content: string;
}

const columns: Column[] = [
    { id: 'applied', title: 'Applied' },
    { id: 'screen', title: 'Screen' },
    { id: 'interview', title: 'Interview' },
    { id: 'offer', title: 'Offer' },
    { id: 'hired', title: 'Hired' },
    { id: 'archived', title: 'Archived' },
];

interface InitialCards {
    [key: string]: Card[];
}

const initialCards: InitialCards = {
    applied: [{ id: '1', content: 'Card 1' }],
    screen: [{ id: '2', content: 'Card 2' }],
    interview: [{ id: '3', content: 'Card 3' }],
    offer: [{ id: '4', content: 'Card 4' }],
    hired: [],
    archived: [],
};

interface CardProps {
    id: string;
    content: string;
    index: number;
    moveCard: (id: string, destColumnId: string) => void;
}

const Card: React.FC<CardProps> = ({ id, content, index, moveCard }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id, index },
        end: (item, monitor) => {
            const dropResult: any = monitor.getDropResult();
            if (item && dropResult) {
                moveCard(item.id, dropResult.id);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div ref={drag} style={{ opacity }} className="bg-white p-4 mb-2 rounded-md shadow">
            <AntdCard>{content}</AntdCard>
        </div>
    );
};

interface ColumnProps {
    id: string;
    title: string;
    cards: Card[];
    moveCard: (id: string, destColumnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, cards, moveCard }) => {
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item: { id: string; index: number }, monitor) => {
            moveCard(item.id, id);
        },
    });



    return (
        <div ref={drop} className="flex-none w-80 mr-4 min-h-80 max-h-screen overflow-y-scroll border border-gray-300 rounded-lg shadow">
            <div className="p-4 rounded">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Divider></Divider>
                {cards.map((card, index) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        content={card.content}
                        index={index}
                        moveCard={moveCard}
                    />
                ))}
            </div>
        </div>
    );
};

const DragAndDropColumns: React.FC = () => {
    const [cards, setCards] = useState<InitialCards>(initialCards);

    useEffect(() => {
        const a: any = [];
        for (let i = 0; i < 100; i++) {
            const model = { id: `${i}`, content: `Card ${i}` }
            a.push(model)
        }
        cards.applied = a;
        setCards(cards);
    }, [])

    const moveCard = (id: string, destColumnId: string) => {
        setCards((prevCards) => {
            const newCards = { ...prevCards };
            const sourceColumnId = Object.keys(newCards).find((columnId) =>
                newCards[columnId].some((card) => card.id === id)
            );
            if (sourceColumnId && newCards[destColumnId]) {
                const sourceColumnCards = newCards[sourceColumnId];
                const [card] = sourceColumnCards.splice(sourceColumnCards.findIndex((c) => c.id === id), 1);
                if (!newCards[destColumnId]) {
                    newCards[destColumnId] = []; // Initialize if not exists
                }
                newCards[destColumnId].push(card);
            }
            return newCards;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex" style={{ width: '100%', overflowX: 'scroll' }}>
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        cards={cards[column.id]}
                        moveCard={moveCard}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default DragAndDropColumns;
