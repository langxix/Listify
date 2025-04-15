import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header/Nav */}
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Listify</h1>
          <nav>
            <ul className="flex space-x-6 font-medium">
              <li><Link to="/" className="!text-white hover:text-blue-200 text-2xl  ">Home</Link></li>
              <li><Link to="/create" className="!text-white hover:text-blue-200  text-2xl">Create</Link></li>
              <li><Link to="/read" className="!text-white hover:text-blue-200 text-2xl">Tasks</Link></li>
              {/* <li><div  className= "text-white hover:text-blue-200 text-2xl">Tasks</div></li> */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
              Manage Your Tasks Effortlessly
            </h2>
            <p className="text-gray-600 mb-6">
              Create, track, and organize your to-dos with ease. ToDoPro is your smart and simple CRUD app to boost productivity.
            </p>
            <button
      onClick={() => navigate('/create')}
      className="inline-block bg-blue-600 border-2 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-sky-700 transition"
    >
      Get Started
    </button>
          </div>
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            {/* <img
              src="https://cdn.dribbble.com/users/2131993/screenshots/6233740/todo_4x.png"
              alt="ToDo Illustration"
              className="w-full"
            /> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What You Can Do
          </h3>
          <div className="grid md:grid-cols-4 gap-10 text-center">
            {[
              { title: 'Create Tasks', icon: '📝' },
              { title: 'Read Tasks', icon: '📖' },
              { title: 'Update Tasks', icon: '✏️' },
              { title: 'Delete Tasks', icon: '🗑️' },
            ].map((feature) => (
              <div key={feature.title} className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-blue-700">{feature.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-blue-600 text-white py-6 text-center">
        <p>&copy; {new Date().getFullYear()} ToDoPro. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;
