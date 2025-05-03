import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const MentorAIChat = ({ jobs }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm Mentor AI. I can help match your skills and interests to potential career paths. What would you like to know about career guidance?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const apiKey = 'AIzaSyCQUQ9sYtjSjasfpps4bK00hUkqdMwSDV0';
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.0-flash-exp-image-generation',
          systemInstruction:
            'You are the career guidance AI. Your job is career persona matching. Respond with a table having 4 columns: No., Career Persona, Matching %, and Suggestions to Improve.',
        });
        chatSessionRef.current = model.startChat({
          generationConfig: { temperature: 0.7, topP: 0.9, maxOutputTokens: 1024 },
          history: [],
        });
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const parseTableResponse = (response) => {
    const rows = response.split('\n').filter((row) => row.trim() !== '');
    if (rows.length < 3) return [];
    return rows.slice(2).map((row) => {
      const cells = row
        .split('|')
        .map((cell) => cell.trim())
        .filter((cell) => cell !== '');
      return { No: cells[0], CareerPersona: cells[1], MatchingPercentage: cells[2], Suggestions: cells[3] };
    });
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    const userMessage = { role: 'user', content: message.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage(message);
        const aiResponse = await result.response.text();
        const parsedTableData = parseTableResponse(aiResponse);
        setTableData(parsedTableData);
        setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger sending the message when jobs change
  useEffect(() => {
    if (jobs) handleSendMessage(jobs);
  }, [jobs]);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-blue-100">
        <table className="min-w-full divide-y divide-blue-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">No.</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Career Persona
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Matching %
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Suggestions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {tableData.length > 0 ? (
              tableData
                .filter((row) => row.CareerPersona !== '---' && parseFloat(row.MatchingPercentage) <= 1000)
                .map((row, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'
                    }`}
                  >
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      style={{
                        width: '20px',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.CareerPersona}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800">
                      {row.MatchingPercentage}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.Suggestions}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-blue-800 font-medium">
                  No career personas found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputMessage);
        }}
        className="flex gap-2 mt-4"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about career guidance..."
          className="hidden flex-grow p-2 border rounded-md"
        />
        <button
          type="submit"
          className="hidden bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'See Result'}
        </button>
      </form>
    </div>
  );
};

export default MentorAIChat;
