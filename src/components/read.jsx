import React, { useEffect, useState } from 'react';
import { Table, Progress, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`https://65c9c1cc3b05d29307deeb3c.mockapi.io/fakeData`)
      .then((response) => {
        setAPIData(response.data);
      });
  };

  const setData = (data) => {
    const { id, firstName, lastName, checkbox, taskType } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Checkbox Value', checkbox);
    localStorage.setItem('Task Type', taskType); // ✅ Save for update page
  };

  const onDelete = (id) => {
    axios.delete(`https://65c9c1cc3b05d29307deeb3c.mockapi.io/fakeData/${id}`)
      .then(() => {
        getData();
        setDeleteMessage({ type: 'success', content: 'Item deleted successfully' });
        setTimeout(() => setDeleteMessage(null), 3000);
      })
      .catch(() => {
        setDeleteMessage({ type: 'error', content: 'Error deleting item. Please try again later.' });
        setTimeout(() => setDeleteMessage(null), 3000);
      });
  };

  const handleMarkDone = (item) => {
    axios.put(`https://65c9c1cc3b05d29307deeb3c.mockapi.io/fakeData/${item.id}`, {
      ...item,
      done: !item.done,
    }).then(getData);
  };

  const total = APIData.length;
  const doneCount = APIData.filter(item => item.done).length;
  const percentComplete = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  return (
    <div className="p-4">
      {deleteMessage && (
        <Message
          success={deleteMessage.type === 'success'}
          error={deleteMessage.type === 'error'}
          content={deleteMessage.content}
        />
      )}

      <header className="bg-black text-white shadow-md">
              <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Listify</h1>
                <nav>
                  <ul className="flex space-x-6 font-medium">
                    <li><Link to="/" className="hover:text-blue-200 text-2xl !text-white">Home</Link></li>
                    <li><Link to="/create" className="hover:text-blue-200 !text-white text-2xl">Create</Link></li>
                    <li><Link to="/read" className="hover:text-blue-200 text-2xl !text-white">Tasks</Link></li>
                  </ul>
                </nav>
              </div>
            </header>

      <h2 className="text-2xl font-semibold mb-4">Task Progress</h2>
      <Progress percent={percentComplete} progress color="green" />

      <Table celled className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Done</Table.HeaderCell>
            <Table.HeaderCell>Task</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell> {/* ✅ New Column */}
            <Table.HeaderCell>Created/Updated</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => (
            <Table.Row
              key={data.id}
              style={{
                backgroundColor: data.done ? '#d4edda' : '#f8d7da',
                fontStyle: data.done ? 'italic' : 'normal',
                textDecoration: data.done ? 'line-through' : 'none',
                color: data.done ? '#155724' : '#721c24',
              }}
            >
              <Table.Cell>
                <input
                  type="checkbox"
                  checked={data.done || false}
                  onChange={() => handleMarkDone(data)}
                />
              </Table.Cell>
              <Table.Cell>{data.firstName}</Table.Cell>
              <Table.Cell>{data.lastName}</Table.Cell>
              <Table.Cell>{data.done ? '✅ Completed' : '🕗 In Progress'}</Table.Cell>
              <Table.Cell>
                {data.taskType === 'urgent' ? (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Urgent</span>
                ) : (
                  <span style={{ color: 'gray' }}>Casual</span>
                )}
              </Table.Cell>
              <Table.Cell>
                {data.updatedAt
                  ? new Date(data.updatedAt).toLocaleString()
                  : new Date(data.createdAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <Link to="/update" onClick={() => setData(data)}>
                  <button className="update-button">Update</button>
                </Link>
              </Table.Cell>
              <Table.Cell>
                <button className="delete-button" onClick={() => onDelete(data.id)}>
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
