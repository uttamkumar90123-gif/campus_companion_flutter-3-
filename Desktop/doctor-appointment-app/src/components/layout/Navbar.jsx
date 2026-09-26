// doctor-appointment-app/src/components/layout/Navbar.jsx
import React from 'react';
import { useAppointments } from '../../context/AppointmentContext.jsx';
import { useDoctors } from '../../context/DoctorContext.jsx';

export const Navbar = ({ currentView, setCurrentView, currentRole, setCurrentRole }) => {
  const { appointments } = useAppointments();
  const { doctors, activeDoctor, activeDoctorId, setActiveDoctorId } = useDoctors();

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const myBookingsCount = appointments.filter((a) => a.status !== 'Cancelled').length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('browse')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">MediConnect</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                  Rx Care
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Doctor & Appointment Management System</p>
            </div>
          </div>

          {/* Navigation Views */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {currentRole === 'patient' ? (
              <>
                <button
                  onClick={() => setCurrentView('browse')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'browse'
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Find Doctors
                </button>
                <button
                  onClick={() => setCurrentView('my-appointments')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    currentView === 'my-appointments'
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  My Appointments
                  {myBookingsCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-teal-600 text-white rounded-full text-xs font-bold">
                      {myBookingsCount}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentView('doctor-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    currentView === 'doctor-dashboard'
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Clinic Dashboard
                  {pendingCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-xs font-bold">
                      {pendingCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentView('doctor-schedule')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'doctor-schedule'
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Schedule & Slots
                </button>
              </>
            )}
          </nav>

          {/* Role Switcher & Doctor Selector */}
          <div className="flex items-center space-x-3">
            {currentRole === 'doctor' && (
              <div className="hidden md:flex items-center space-x-2 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-xs">
                <span className="text-slate-500 font-medium">Logged in as:</span>
                <select
                  value={activeDoctorId}
                  onChange={(e) => setActiveDoctorId(e.target.value)}
                  className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialty})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Role Toggle Switch */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => {
                  setCurrentRole('patient');
                  setCurrentView('browse');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentRole === 'patient'
                    ? 'bg-white text-cyan-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Patient View
              </button>
              <button
                onClick={() => {
                  setCurrentRole('doctor');
                  setCurrentView('doctor-dashboard');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentRole === 'doctor'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Doctor Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
