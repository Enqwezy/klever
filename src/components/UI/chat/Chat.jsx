import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chat as sendChatMessage } from '../../../store/actions/chatAction';
import { Link } from 'react-router-dom'; // Для ссылок на /services/:id

function Chat() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.chat);

  const [chatState, setChatState] = useState('closed');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [dimensions, setDimensions] = useState({ width: 384, height: 448 }); // 24rem, 28rem
  const resizingRef = useRef(null);
  const messagesEndRef = useRef(null); // Для автоскролла

  useEffect(() => {
    // Загрузка сохраненных данных
    const savedMessages = localStorage.getItem('chat_messages');
    const savedSize = localStorage.getItem('chat_size');
    const isHidden = localStorage.getItem('chat_hidden');

    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedSize) setDimensions(JSON.parse(savedSize));
    if (isHidden === 'true') setChatState('closed');
  }, []);

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    // Автоскролл к последнему сообщению
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chat_size', JSON.stringify(dimensions));
  }, [dimensions]);

  const handleChatToggle = () => {
    setChatState((prev) =>
      prev === 'closed' ? 'open' : prev === 'open' ? 'minimized' : 'open'
    );
  };

  const handleChatClose = () => {
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
          services: response.payload.services || [],
        };
        setMessages((prev) => [...prev, replyMessage]);
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Ошибка при получении ответа. Попробуйте снова.',
          timestamp: new Date().toLocaleString('ru-RU'),
          sender: 'support',
        },
      ]);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    resizingRef.current = { x: e.clientX, y: e.clientY };
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!resizingRef.current) return;

    const deltaX = e.clientX - resizingRef.current.x;
    const deltaY = resizingRef.current.y - e.clientY;

    setDimensions((prev) => ({
      width: Math.max(300, prev.width + deltaX),
      height: Math.max(300, prev.height + deltaY),
    }));

    resizingRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    resizingRef.current = null;
    document.body.style.userSelect = 'auto';
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-eastman_regular">
      {/* Кнопка открытия чата */}
      <button
        onClick={handleChatToggle}
        className="bg-black text-white p-3 sm:p-4 rounded-full hover:bg-gray-800 transition-colors duration-200"
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

      {/* Окно чата */}
      {chatState !== 'closed' && (
        <div
          className={`bg-white border rounded-lg shadow-lg transition-all duration-300 ${
            chatState === 'open' ? 'opacity-100 scale-100' : 'opacity-100 scale-y-0 h-12'
          }`}
          style={{
            width: chatState === 'open' ? `${dimensions.width}px` : '16rem',
            height: chatState === 'open' ? `${dimensions.height}px` : '3rem',
            transformOrigin: 'bottom right',
          }}
        >
          <div className="flex flex-col h-full">
            {/* Шапка */}
            <div className="flex justify-between items-center bg-black text-white p-3 rounded-t-lg">
              <span className="text-sm sm:text-base">Чат с поддержкой</span>
              <div className="flex gap-2">
                <button onClick={handleChatToggle} className="text-white hover:text-gray-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

            {/* Сообщения и лоадер */}
            {chatState === 'open' && (
              <>
                <div className="flex-1 p-4 overflow-y-auto relative">
                  {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
                      <svg
                        className="animate-spin h-8 w-8 text-black"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  )}
                  {messages.length === 0 && !loading ? (
                    <p className="text-sm text-gray-500 text-center">Нет сообщений. Начните чат!</p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-3 p-3 rounded-lg text-sm ${
                          msg.sender === 'user' ? 'bg-gray-100 ml-auto max-w-[80%]' : 'bg-blue-100 mr-auto max-w-[80%]'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {msg.services?.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-semibold">Предложенные услуги:</p>
                            <ul className="list-disc pl-4 text-xs">
                              {msg.services.map((service) => (
                                <li key={service.id}>
                                  <Link
                                    to={`/${service.id}`}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {service.name} ({service.city.name}, {service.price}, рейтинг: {service.rating})
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <span className="text-xs text-gray-500 block mt-1">{msg.timestamp}</span>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Поле ввода */}
                <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="border rounded p-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm disabled:opacity-50"
                    disabled={loading}
                  >
                    Отправить
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
        </div>
      )}
    </div>
  );
}

export default Chat;