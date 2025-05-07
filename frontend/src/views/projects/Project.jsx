import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { IoCopy } from "react-icons/io5";
import { io as SocketIo } from "socket.io-client";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

const Project = () => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("// Write your code here...\n");
  const [review, setReview] = useState(
    "# Code Review\n\nClick 'Get Review' to analyze your code."
  );

  function handleEditorChange(value) {
    setCode(value);
    if (socket) {
      socket.emit("code-change", value);
    }
  }

  function handleUserMessage() {
    setMessages((prev) => [...prev, input]);
    socket.emit("chat-message", input);
    setInput("");
  }

  function getReview() {
    socket.emit("get-review", code);
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(code);
  }

  useEffect(() => {
    const io = SocketIo("http://localhost:3000", {
      query: {
        project: params.id,
      },
    });

    io.emit("chat-history");
    io.emit("get-project-code");

    io.on("chat-history", (messages) => {
      setMessages(messages.map((message) => message.text));
    });

    io.on("chat-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    io.on("code-change", (code) => {
      setCode(code);
    });

    io.on("project-code", (code) => {
      setCode(code);
    });

    io.on("code-review", (review) => {
      setReview(review);
    });

    setSocket(io);
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row gap-4 p-4 bg-gray-100 overflow-hidden">
      {/* Chat Section */}
      <div className="bg-emerald-100 rounded-lg shadow-lg flex flex-col justify-between flex-1 h-full overflow-hidden">
        <div className="bg-emerald-500 px-4 py-3.5 border-b border-emerald-600 flex items-center justify-between">
          <div className="text-white font-medium">Project Chat</div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-2 flex flex-col custom-scroll">
          {messages.map((message, idx) => (
            <span
              key={idx}
              className="bg-white text-gray-800 px-4 py-2 rounded-xl shadow-sm max-w-xs w-fit"
            >
              {message}
            </span>
          ))}
        </div>

        <div className="sticky bottom-0 bg-emerald-100 px-4 py-2 border-t border-emerald-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Message to project"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={handleUserMessage}
              className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Code Section */}
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col flex-1 h-full">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
          <div className="text-white font-medium">Code Editor</div>
          <div className="flex space-x-2">
            <select
              className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="javascript"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
            <button
              onClick={handleCopyCode}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <IoCopy size={20} />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <Editor
            height="100%"
            language="javascript"
            value={code}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              fontSize: 14,
              lineNumbersMinChars: 3,
              folding: true,
              automaticLayout: true,
              wordWrap: "on",
              suggestOnTriggerCharacters: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-indigo-100 rounded-lg shadow-lg overflow-hidden flex flex-col flex-1 h-full">
        <div className="bg-indigo-600 px-4 py-3 border-b border-indigo-700 flex items-center justify-between">
          <div className="text-white font-medium">Code Review</div>
          <button
            onClick={getReview}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Get Review
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto bg-white">
          <div className="prose max-w-none">
            <ReactMarkdown>{review}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
