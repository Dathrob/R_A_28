// frontend/src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Public Navbar */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CourseManager</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Turn Data into Decisions
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Manage your courses, enroll instantly, and track your learning – all in one platform.
        </p>
        <div className="space-x-4">
          <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
            Get Started as Student
          </Link>
          <Link to="/login" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50">
            Login as Admin
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="text-center">
            <div className="text-4xl mb-3">👩‍🎓</div>
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <p className="text-gray-600">Browse available courses, enroll with one click, and see your enrolled classes.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">👨‍💼</div>
            <h3 className="text-xl font-semibold mb-2">For Admins</h3>
            <p className="text-gray-600">Create, edit, or delete courses. Manage the entire catalog effortlessly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        © 2026 Addis Ababa University – SITE Training
      </footer>
    </div>
  );
};

export default LandingPage;