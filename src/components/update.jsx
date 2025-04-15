import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Update() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [id, setID] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [taskType, setTaskType] = useState("");

  useEffect(() => {
    setID(localStorage.getItem('ID'));
    setFirstName(localStorage.getItem('First Name') || '');
    setLastName(localStorage.getItem('Last Name') || '');
    // setCheckbox(localStorage.getItem('Checkbox Value') === 'true');
  }, []);

  const updateAPIData = () => {
    axios.put(`https://65c9c1cc3b05d29307deeb3c.mockapi.io/fakeData/${id}`, {
      firstName,
      lastName,
      checkbox,
      taskType,
      updatedAt: new Date().toISOString(),
    })
      .then(() => {
        setUpdateMessage({ type: 'success', content: '✅ Data updated successfully!' });
        setTimeout(() => {
          setUpdateMessage(null);
          navigate('/read');
        }, 2500);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        setUpdateMessage({ type: 'error', content: '❌ Failed to update data. Please try again later.' });
      });
  };

  return (
    <>
      {/* Header */}
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Listify</h1>
          <nav>
            <ul className="flex space-x-6 font-medium">
              <li><Link to="/" className="hover:text-blue-200 text-2xl !text-white">Home</Link></li>
              <li><Link to="/create" className="hover:text-blue-200 text-2xl !text-white">Create</Link></li>
              <li><Link to="/read" className="hover:text-blue-200 text-2xl !text-white">Tasks</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Update Entry</h2>

          {updateMessage && (
            <div
              className={`mb-6 px-4 py-3 rounded ${
                updateMessage.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {updateMessage.content}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateAPIData();
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Task</label>
              <input
                type="text"
                placeholder="Task"
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
                placeholder="Description"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
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

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
