import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [taskType, setTaskType] = useState("");
  const [createMessage, setCreateMessage] = useState(null);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Request canceled because component is unmounting.');
      }
    };
  }, []);

  const createAPIData = () => {
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    axios.post(
      `https://65c9c1cc3b05d29307deeb3c.mockapi.io/fakeData`,
      {
        firstName,
        lastName,
        checkbox,
        taskType,
        createdAt: new Date().toISOString(),
      },
      { cancelToken: source.token }
    )
      .then(() => {
        setCreateMessage({ type: 'success', content: '✅ Data created successfully!' });
        setTimeout(() => {
          setCreateMessage(null);
          navigate('/read');
        }, 2500);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setCreateMessage({ type: 'error', content: '❌ Failed to create data. Please try again later.' });
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createAPIData();
  };

  return (
    <>
      {/* Header */}
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Listify</h1>
          <nav>
            <ul className="flex space-x-6 font-medium !text-white">
              <li><Link to="/" className="hover:text-blue-200 text-2xl !text-white">Home</Link></li>
              <li><Link to="/create" className="hover:text-blue-200 !text-white text-2xl">Create</Link></li>
              <li><Link to="/read" className="!hover:text-blue-200 text-2xl !text-white">Tasks</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Create New Entry</h2>

          {createMessage && (
            <div
              className={`mb-6 px-4 py-3 rounded ${
                createMessage.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {createMessage.content}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="urgent">Urgent</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            {/* <div className="flex items-center space-x-3">
              <input
                id="done"
                type="checkbox"
                checked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="done" className="text-sm text-gray-700">
                Done
              </label>
            </div> */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
