import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCourses, createEnrollment } from "../elearning/elearningSlice";

export default function CourseEnrollment() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { courses, currentCertificate, error: reduxError } = useSelector((state) => state.onlineCourses);
  const { user } = useSelector((state) => state.auth);
  
  const selectedCourse = courses.find(c => c.id.toString() === courseId);

  const [formData, setFormData] = useState({
    user_id: user?.id || '',
    phone: '',
    course_id: courseId || '',
    paymentMethod: '',
    accountNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, completed
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [createdEnrollmentId, setCreatedEnrollmentId] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
    if (!user) {
      window.location.href = '/';
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.paymentMethod) {
      setLocalError("Please select a payment method to proceed.");
      return;
    }
    if (!formData.accountNumber) {
      setLocalError("Please enter your payment account details.");
      return;
    }

    setLocalError(null);
    setIsSubmitting(true);
    setPaymentStatus('processing');
    
    // Simulate Payment Gateway Delay
    setTimeout(async () => {
      setPaymentStatus('completed');
      
      try {
        const resultAction = await dispatch(createEnrollment(formData));
        
        if (createEnrollment.fulfilled.match(resultAction)) {
          setSuccess(true);
          setCreatedEnrollmentId(resultAction.payload.enrollment.id);
          setFormData({
            user_id: user?.id || '',
            phone: '',
            course_id: courseId || '',
            paymentMethod: '',
            accountNumber: ''
          });
        } else {
          setLocalError(resultAction.payload || "Failed to submit enrollment.");
          setPaymentStatus('idle');
        }
      } catch (err) {
        console.error("Enrollment failed:", err);
        setLocalError("An unexpected error occurred.");
        setPaymentStatus('idle');
      } finally {
        setIsSubmitting(false);
      }
    }, 2500); // 2.5 second fake payment processing
  };

  const displayError = localError || reduxError;

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden flex items-center justify-center p-4 sm:p-8 font-sans pb-24">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-teal-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-5 gap-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-10 mt-8">
        
        {/* Left Panel - Branding & Info */}
        <div className="lg:col-span-2 p-10 bg-gradient-to-br from-indigo-600/90 to-purple-800/90 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-8 transition">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to Catalog
            </Link>

            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Checkout & Enroll.</h2>
            
            {selectedCourse ? (
              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 mt-6 backdrop-blur-sm shadow-xl">
                <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Selected Program</span>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedCourse.title}</h3>
                <p className="text-indigo-200 text-sm mb-6 line-clamp-2">{selectedCourse.description}</p>
                
                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-4">
                  <span className="text-indigo-200">Total Price:</span>
                  <span className="text-3xl font-extrabold text-white">${selectedCourse.price}</span>
                </div>
              </div>
            ) : (
              <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                Join thousands of students learning in-demand skills from industry experts.
              </p>
            )}
          </div>
          
          <div className="relative z-10 mt-12">
            <p className="text-sm text-indigo-300">© 2026 Farka Technology. Secure Checkout.</p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:col-span-3 p-10 lg:p-12">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">Student Details</h3>
            <p className="text-slate-400">Complete your payment and application to unlock your certificate.</p>
          </div>

          {success ? (
            <div className="mb-8 p-6 bg-green-500/20 border border-green-500/50 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 animate-fade-in-down">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Payment & Enrollment Successful!</h3>
                <p className="text-green-300 font-medium">You are now officially enrolled in this course.</p>
              </div>
              
              {currentCertificate && (
                <div className="w-full mt-4 p-4 bg-slate-800/80 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center space-x-3 text-left mb-4 sm:mb-0">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Official Certificate</p>
                      <p className="text-xs text-slate-400">Ready for download</p>
                    </div>
                  </div>
                  <Link 
                    to={`/certificate/${createdEnrollmentId}`} 
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center space-x-2"
                    target="_blank"
                  >
                    <span>View & Download PDF</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </Link>
                </div>
              )}
              
              <Link 
                to="/"
                className="mt-4 text-sm font-medium text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white"
                onClick={() => setSuccess(false)}
              >
                Browse more courses
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {displayError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center space-x-3 text-red-300 animate-fade-in-down">
                  <p className="font-medium">{displayError}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-400 rounded-xl px-4 py-3.5 outline-none shadow-inner"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-400 rounded-xl px-4 py-3.5 outline-none shadow-inner"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500 shadow-inner disabled:opacity-50"
                  placeholder="+251 911 234 567"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Telebirr', 'CBE Birr', 'Amole'].map((method) => (
                    <label key={method} className={`cursor-pointer rounded-xl border ${formData.paymentMethod === method ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700/50 bg-slate-800/30'} p-4 flex flex-col items-center justify-center transition-all hover:border-indigo-400 ${isSubmitting && 'opacity-50 pointer-events-none'}`}>
                      <input type="radio" name="payment" value={method} className="sr-only" onChange={() => setFormData({...formData, paymentMethod: method, accountNumber: ''})} disabled={isSubmitting} />
                      <span className={`text-sm font-medium ${formData.paymentMethod === method ? 'text-indigo-400' : 'text-slate-400'}`}>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.paymentMethod && (
                <div className="space-y-2 pt-2 animate-fade-in-down">
                  <label className="text-sm font-medium text-slate-300 ml-1">
                    {formData.paymentMethod} Account / Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                    className="w-full bg-slate-800/50 border border-indigo-500/50 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500 shadow-inner"
                    placeholder={`Enter your ${formData.paymentMethod} details`}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-indigo-300 ml-1 mt-1">Amount to be deducted: ${selectedCourse?.price || 0}</p>
                </div>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="relative flex items-center">
                    {paymentStatus === 'processing' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing Payment...
                      </>
                    ) : paymentStatus === 'completed' && isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Finalizing Enrollment...
                      </>
                    ) : (
                      `Pay $${selectedCourse?.price || 0} & Enroll`
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}