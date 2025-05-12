import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chat as sendChatMessage } from '../../../store/actions/chatAction';

function Chat() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.chat);

    const [chatState, setChatState] = useState('closed');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatHidden, setIsChatHidden] = useState(false);

    const [dimensions, setDimensions] = useState({ width: 384, height: 448 }); // 384px = 24rem, 448px = 28rem
    const resizingRef = useRef(false);

    useEffect(() => {
        const savedMessages = localStorage.getItem('chat_messages');
        const savedSize = localStorage.getItem('chat_size');
        const isHidden = localStorage.getItem('chat_hidden');

        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
        if (savedSize) {
            setDimensions(JSON.parse(savedSize));
        }
        if (isHidden === 'true') {
            setIsChatHidden(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('chat_size', JSON.stringify(dimensions));
    }, [dimensions]);

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
        localStorage.setItem('chat_hidden', 'true');
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: newMessage,
            timestamp: new Date().toLocaleString('ru-RU'),
            sender: 'user',
        };
        setMessages((prev) => [...prev, userMessage]);
        setNewMessage('');

        try {
            const response = await dispatch(sendChatMessage({ message: newMessage }));
            if (response?.payload?.reply) {
                const replyMessage = {
                    id: Date.now() + 1,
                    text: response.payload.reply,
                    timestamp: new Date().toLocaleString('ru-RU'),
                    sender: 'support',
                };
                setMessages((prev) => [...prev, replyMessage]);
            }
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        resizingRef.current = true;
    };

    const handleMouseMove = (e) => {
        if (!resizingRef.current) return;

        setDimensions((prev) => ({
            width: Math.max(300, e.clientX - 16),  // 16px от правого края
            height: Math.max(300, window.innerHeight - e.clientY - 16),
        }));
    };

    const handleMouseUp = () => {
        resizingRef.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            {!isChatHidden && (
                <div>
                    <button
                        onClick={handleChatToggle}
                        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black text-white p-3 sm:p-4 rounded-full hover:bg-gray-800 transition-colors duration-200 z-50"
                    >
                        {/* Иконка чата */}
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

                    {/* Окно чата */}
                    <div
                        className={`fixed bottom-16 sm:bottom-20 right-4 sm:right-6 bg-white border rounded-lg shadow-lg transition-all duration-300 z-50 font-eastman_regular
                            ${chatState === 'closed' ? 'opacity-0 scale-0 w-0 h-0' : ''}
                            ${chatState !== 'closed' ? 'opacity-100 scale-100' : ''}`}
                        style={{
                            width: chatState === 'open' ? `${dimensions.width}px` : '16rem',
                            height: chatState === 'open' ? `${dimensions.height}px` : '3rem',
                        }}
                    >
                        {chatState !== 'closed' && (
                            <div className="flex flex-col h-full">
                                {/* Шапка */}
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

                                {/* Сообщения */}
                                {chatState === 'open' && (
                                    <>
                                        <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
                                            {messages.length === 0 ? (
                                                <p className="text-sm sm:text-base text-gray-500">Нет сообщений. Начните чат!</p>
                                            ) : (
                                                messages.map((msg) => (
                                                    <div
                                                        key={msg.id}
                                                        className={`mb-2 p-2 rounded text-sm sm:text-base ${msg.sender === 'user' ? 'bg-gray-100' : 'bg-blue-100'
                                                            }`}
                                                    >
                                                        <p>{msg.text}</p>
                                                        <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {/* Поле ввода */}
                                        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t flex flex-col gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Введите сообщение..."
                                                className="border rounded p-2 text-sm sm:text-base w-full"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm sm:text-base"
                                                disabled={loading}
                                            >
                                                {loading ? 'Отправка...' : 'Отправить'}
                                            </button>
                                        </form>

                                    </>
                                )}

                                {/* Уголок для изменения размеров */}
                                {chatState === 'open' && (
                                    <div
                                        onMouseDown={handleMouseDown}
                                        className="absolute right-0 bottom-0 w-4 h-4 cursor-nwse-resize bg-gray-300 rounded-br-lg"
                                    />
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
