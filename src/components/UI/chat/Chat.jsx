import React, { useEffect, useState } from 'react';

function Chat({ serviceId }) {
    const [chatState, setChatState] = useState('closed');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatHidden, setIsChatHidden] = useState(false);

    useEffect(() => {
        const savedMessages = localStorage.getItem(`chat_service_${serviceId}`);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
        const isHidden = localStorage.getItem(`chat_hidden_${serviceId}`);
        if (isHidden === 'true') {
            setIsChatHidden(true);
        }
    }, [serviceId]);

    useEffect(() => {
        localStorage.setItem(`chat_service_${serviceId}`, JSON.stringify(messages));
    }, [messages, serviceId]);

    const handleChatToggle = () => {
        if (chatState === 'closed') {
            setChatState('open');
        } else if (chatState === 'open') {
            setChatState('minimized');
        } else {
            setChatState('open');
        }
    };

    const handleChatClose = () => {
        setChatState('closed');
    };

    const handleChatHideForever = () => {
        setChatState('closed');
        setIsChatHidden(true);
        localStorage.setItem(`chat_hidden_${serviceId}`, 'true');
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                text: newMessage,
                timestamp: new Date().toLocaleString('ru-RU'),
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    return (
        <>
            {!isChatHidden && (
                <div>
                    <button
                        onClick={handleChatToggle}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black text-white p-3 sm:p-4 rounded-full hover:bg-gray-800 transition-colors duration-200 z-50"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
                            <path
                                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className={`fixed bottom-16 sm:bottom-20 right-4 sm:right-6 bg-white border rounded-lg shadow-lg transition-all duration-300 z-50 font-eastman_regular
            ${chatState === 'closed' ? 'opacity-0 scale-0 w-0 h-0' : ''}
            ${chatState === 'minimized' ? 'w-64 sm:w-72 h-12 opacity-100 scale-100' : ''}
            ${chatState === 'open' ? 'w-64 sm:w-80 md:w-96 h-96 sm:h-[28rem] opacity-100 scale-100' : ''}`}
                    >
                        {chatState !== 'closed' && (
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center bg-black text-white p-2 sm:p-3 rounded-t-lg">
                                    <span className="text-sm sm:text-base">Чат с поддержкой</span>
                                    <div className="flex gap-2">
                                        <button onClick={handleChatToggle} className="text-white hover:text-gray-300">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                                <path
                                                    d={chatState === 'open' ? 'M19 13H5V11H19V13Z' : 'M12 5V19M5 12H19'}
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <button onClick={handleChatClose} className="text-white hover:text-gray-300">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                                <path
                                                    d="M18 6L6 18M6 6L18 18"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {chatState === 'open' && (
                                    <>
                                        <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
                                            {messages.length === 0 ? (
                                                <p className="text-sm sm:text-base text-gray-500">Нет сообщений. Начните чат!</p>
                                            ) : (
                                                messages.map((msg) => (
                                                    <div key={msg.id} className="mb-2 p-2 bg-gray-100 rounded text-sm sm:text-base">
                                                        <p>{msg.text}</p>
                                                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t flex flex-col gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Введите сообщение..."
                                                className="border rounded p-2 text-sm sm:text-base w-full"
                                            />
                                            <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm sm:text-base">
                                                Отправить
                                            </button>
                                        </form>
                                        <button onClick={handleChatHideForever} className="w-full text-center text-xs sm:text-sm text-gray-500 hover:text-gray-700 p-2">
                                            Закрыть чат навсегда
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Chat;
