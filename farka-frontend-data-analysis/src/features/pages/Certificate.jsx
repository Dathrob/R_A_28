import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchEnrollments } from "../elearning/elearningSlice";

export default function Certificate() {
  const { enrollmentId } = useParams();
  const dispatch = useDispatch();
  const { enrollments, status } = useSelector((state) => state.onlineCourses);
  
  useEffect(() => {
    if (status === "idle" || enrollments.length === 0) {
      dispatch(fetchEnrollments());
    }
  }, [dispatch, status, enrollments.length]);

  const enrollment = enrollments.find(e => e.id.toString() === enrollmentId);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-white bg-[#0f172a]">Loading certificate...</div>;
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
        <p className="text-xl mb-4">Certificate not found.</p>
        <Link to="/" className="text-indigo-400 hover:text-indigo-300">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white border-[12px] sm:border-[20px] border-indigo-900 p-8 sm:p-16 relative text-center shadow-2xl flex flex-col justify-center aspect-[1.4/1]">
        {/* Corner Accents */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 sm:w-20 sm:h-20 border-t-4 border-l-4 border-indigo-500"></div>
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 sm:w-20 sm:h-20 border-t-4 border-r-4 border-indigo-500"></div>
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-12 h-12 sm:w-20 sm:h-20 border-b-4 border-l-4 border-indigo-500"></div>
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-20 sm:h-20 border-b-4 border-r-4 border-indigo-500"></div>
        
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-indigo-900 mb-2">Certificate of Completion</h1>
        <p className="text-sm sm:text-lg text-gray-500 mb-8 sm:mb-12 uppercase tracking-widest font-semibold">Farka Academy</p>
        
        <p className="text-base sm:text-xl text-gray-700 mb-2 sm:mb-4">This is to certify that</p>
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 border-b-2 border-gray-300 pb-2 inline-block px-4 sm:px-12">
          {enrollment.user?.name || 'Student'}
        </h2>
        
        <p className="text-base sm:text-xl text-gray-700 mb-2 sm:mb-4">has successfully completed the program</p>
        <h3 className="text-2xl sm:text-4xl font-bold text-indigo-700 mb-12 sm:mb-20">{enrollment.course?.title || 'Course'}</h3>
        
        <div className="flex justify-between items-end mt-auto px-4 sm:px-16">
          <div className="text-center">
            <div className="border-b-2 border-gray-800 w-32 sm:w-48 mb-2"></div>
            <p className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider">Date</p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">{new Date(enrollment.created_at).toLocaleDateString()}</p>
          </div>
          
          <div className="w-20 h-20 sm:w-32 sm:h-32 bg-amber-400 rounded-full border-[4px] sm:border-[6px] border-amber-500 flex items-center justify-center shadow-xl relative -top-4 sm:-top-8">
            <div className="w-[85%] h-[85%] rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center bg-amber-300">
              <span className="font-bold text-amber-900 text-xs sm:text-sm transform -rotate-12">VERIFIED</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="border-b-2 border-gray-800 w-32 sm:w-48 mb-2 text-xl sm:text-2xl text-gray-700" style={{ fontFamily: 'cursive' }}>Aman U.</div>
            <p className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider">Instructor Signature</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex space-x-4 print:hidden">
        <Link to="/" className="px-6 py-3 bg-slate-800 text-white rounded-lg shadow hover:bg-slate-700 font-semibold transition">
          Back to Dashboard
        </Link>
        <button 
          onClick={() => window.print()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 font-bold flex items-center transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
