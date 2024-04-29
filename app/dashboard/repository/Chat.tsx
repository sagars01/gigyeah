"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface Message {
    type: 'user' | 'ai' | 'thinking';
    text?: string;
}

const ChatInterface: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (): void => {
        if (!input.trim()) return;
        const newMessage: Message = { type: 'user', text: input };
        setMessages([...messages, newMessage]);
        setInput('');
        setMessages(msgs => [...msgs, { type: 'thinking' }]);

        // Simulate AI response after a delay
        setTimeout(() => {
            setMessages(msgs =>
                msgs.map(msg => msg.type === 'thinking' ? { type: 'ai', text: "This is a simulated response from AI." } : msg)
            );
        }, 2000);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="p-4 h-full flex flex-col">
            <div className="flex-grow overflow-auto p-3 space-y-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'ai' || msg.type === 'thinking' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-2xl text-white p-2 rounded-lg ${msg.type === 'ai' ? 'bg-blue-500' : 'bg-white-500'}`}>
                            {msg.type === 'thinking' ? <Spin /> : msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="pt-2">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    suffix={
                        <Button icon={<SendOutlined />} onClick={sendMessage} type="primary" />
                    }
                    className="rounded-full"
                />
            </div>
        </div>
    );
};

export default ChatInterface;
