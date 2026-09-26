// doctor-appointment-app/src/App.jsx
import React, { useState } from 'react';
import { DoctorProvider, useDoctors } from './context/DoctorContext.jsx';
import { AppointmentProvider, useAppointments } from './context/AppointmentContext.jsx';
import { storageService } from './services/storageService.js';
import { Navbar } from './components/layout/Navbar.jsx';
import { DoctorFilter } from './components/patient/DoctorFilter.jsx';
import { DoctorCard } from './components/patient/DoctorCard.jsx';
import { BookingModal } from './components/patient/BookingModal.jsx';
import { BookingPass } from './components/patient/BookingPass.jsx';
import { DoctorProfileModal } from './components/patient/DoctorProfileModal.jsx';
import { MyAppointments } from './components/patient/MyAppointments.jsx';
import { DashboardOverview } from './components/doctor/DashboardOverview.jsx';
import { AvailabilitySettings } from './components/doctor/AvailabilitySettings.jsx';

const MainContent = () => {
  const [currentRole, setCurrentRole] = useState(() => storageService.getActiveRole());
  const [currentView, setCurrentView] = useState('browse');

  const { filteredDoctors, doctors } = useDoctors();
  const { currentBooking, setCurrentBooking } = useAppointments();

  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [profileDoctor, setProfileDoctor] = useState(null);
  const [showResetNotice, setShowResetNotice] = useState(false);

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    storageService.setActiveRole(role);
  };

  const handleBookingSuccess = (newAppointment) => {
    setBookingDoctor(null);
    setCurrentBooking(newAppointment);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo doctors and appointments to default seed state?')) {
      storageService.resetAllData();
      setShowResetNotice(true);
      setTimeout(() => {
        window.location.reload();
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Navbar with role switcher */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
      />

      {/* Reset notification alert */}
      {showResetNotice && (
        <div className="bg-emerald-600 text-white text-center py-2 text-xs font-bold animate-in slide-in-from-top">
          ✓ Sample data reset! Reloading application...
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PATIENT VIEW: BROWSE DOCTORS */}
        {currentRole === 'patient' && currentView === 'browse' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-teal-900 p-8 sm:p-12 text-white shadow-xl">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 mb-4 backdrop-blur-sm">
                  ✨ Instant Medical Appointments • Zero Waiting Time
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Book Consultations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">Verified Specialists</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
                  Browse top certified doctors across Cardiology, Pediatrics, Dermatology, and more. Choose flexible slots for in-clinic visits or high-definition video consultations.
                </p>

                {/* Hero Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-xs">
                  <div>
                    <div className="text-2xl font-black text-cyan-300">{doctors.length}+</div>
                    <div className="text-slate-400 text-[11px] font-medium mt-0.5">Top Specialists</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-teal-300">1,500+</div>
                    <div className="text-slate-400 text-[11px] font-medium mt-0.5">Patients Treated</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-amber-300">4.9 ★</div>
                    <div className="text-slate-400 text-[11px] font-medium mt-0.5">Patient Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Pills and Search Bar */}
            <DoctorFilter />

            {/* Doctors Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Available Doctors &amp; Specialists</h2>
                <span className="text-xs text-slate-500">{filteredDoctors.length} available for booking</span>
              </div>

              {filteredDoctors.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <div className="text-3xl mb-2">🔍</div>
                  <h3 className="text-base font-bold text-slate-800">No doctors found</h3>
                  <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different specialty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onBookAppointment={(doc) => setBookingDoctor(doc)}
                      onViewProfile={(doc) => setProfileDoctor(doc)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PATIENT VIEW: MY APPOINTMENTS */}
        {currentRole === 'patient' && currentView === 'my-appointments' && (
          <MyAppointments onFindDoctors={() => setCurrentView('browse')} />
        )}

        {/* DOCTOR VIEW: CLINIC DASHBOARD */}
        {currentRole === 'doctor' && currentView === 'doctor-dashboard' && (
          <DashboardOverview />
        )}

        {/* DOCTOR VIEW: SCHEDULE & SLOTS SETTINGS */}
        {currentRole === 'doctor' && currentView === 'doctor-schedule' && (
          <AvailabilitySettings />
        )}
      </main>

      {/* Booking Modal */}
      {bookingDoctor && (
        <BookingModal
          doctor={bookingDoctor}
          onClose={() => setBookingDoctor(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Digital Appointment Pass */}
      {currentBooking && (
        <BookingPass
          appointment={currentBooking}
          onClose={() => setCurrentBooking(null)}
          onViewAppointments={() => {
            setCurrentRole('patient');
            setCurrentView('my-appointments');
          }}
        />
      )}

      {/* Doctor Profile Detail Modal */}
      {profileDoctor && (
        <DoctorProfileModal
          doctor={profileDoctor}
          onClose={() => setProfileDoctor(null)}
          onBookAppointment={(doc) => {
            setProfileDoctor(null);
            setBookingDoctor(doc);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">MediConnect</span>
            <span>• Doctor &amp; Appointment Management System in React</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetData}
              className="text-slate-500 hover:text-rose-600 transition-colors font-medium underline"
            >
              Reset Sample Data
            </button>
            <span>•</span>
            <span>MERN / React Showcase Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <DoctorProvider>
      <AppointmentProvider>
        <MainContent />
      </AppointmentProvider>
    </DoctorProvider>
  );
}
