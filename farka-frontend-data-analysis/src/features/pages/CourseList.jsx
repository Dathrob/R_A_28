import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../elearning/elearningSlice";
import { loginUser, registerUser, logout } from "../auth/authSlice";

export default function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, status } = useSelector((state) => state.onlineCourses);
  const { user, status: authStatus, error: authError } = useSelector((state) => state.auth);
  const loading = status === "loading";

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authData, setAuthData] = useState({ name: '', email: '', password: '' });
  const [pendingCourseId, setPendingCourseId] = useState(null);

  useEffect(() => {
    if (status === "idle" || courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, status, courses.length]);

  const handleEnrollClick = (courseId) => {
    if (user) {
      navigate(`/enroll/${courseId}`);
    } else {
      setPendingCourseId(courseId);
      setShowAuthModal(true);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    let resultAction;
    if (authMode === 'login') {
      resultAction = await dispatch(loginUser({ email: authData.email, password: authData.password }));
    } else {
      resultAction = await dispatch(registerUser(authData));
    }
    
    if (resultAction.type.endsWith('fulfilled')) {
      setShowAuthModal(false);
      if (pendingCourseId) {
        navigate(`/enroll/${pendingCourseId}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-16 px-6 lg:px-8 relative overflow-hidden">
    
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>

      {/* Top Bar for Auth */}
      <div className="absolute top-4 right-8 z-20 flex space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-indigo-200">Welcome, {user.name}</span>
            <button onClick={() => dispatch(logout())} className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition">Logout</button>
          </div>
        ) : (
          <button onClick={() => { setPendingCourseId(null); setShowAuthModal(true); }} className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition">Login / Register</button>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Programs</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Choose from our highly requested industry-standard courses. Master new skills with our guided curriculum.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(79,70,229,0.2)] hover:border-indigo-500/30 flex flex-col">
                <div className="h-48 bg-gradient-to-br from-slate-800 to-indigo-900/50 relative overflow-hidden flex items-center justify-center p-6 text-center">
                   <div className="absolute top-0 right-0 p-4">
                     <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-indigo-500/20">
                       ${course.price}
                     </span>
                   </div>
                   <h3 className="text-2xl font-bold text-white z-10 leading-tight">{course.title}</h3>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-slate-400 mb-6 flex-1">{course.description}</p>
                  
                  <div className="space-y-3 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center text-sm text-slate-300">
                      <svg className="w-5 h-5 mr-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      <span className="font-medium text-slate-400 w-16">Starts:</span> 
                      <span className="text-white font-medium">{course.start_date || 'TBD'}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-300">
                      <svg className="w-5 h-5 mr-3 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span className="font-medium text-slate-400 w-16">Ends:</span> 
                      <span className="text-white font-medium">{course.end_date || 'TBD'}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleEnrollClick(course.id)}
                    className="w-full inline-flex justify-center items-center px-4 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Enroll Now
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{authMode === 'login' ? 'Login' : 'Create Account'}</h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
              {authError && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                  {authError}
                </div>
              )}
              
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                  <input 
                    type="text" required
                    value={authData.name} onChange={e => setAuthData({...authData, name: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" required
                  value={authData.email} onChange={e => setAuthData({...authData, email: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                <input 
                  type="password" required minLength="6"
                  value={authData.password} onChange={e => setAuthData({...authData, password: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={authStatus === 'loading'}
                  className="w-full px-4 py-3 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {authStatus === 'loading' ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                  {authMode === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
