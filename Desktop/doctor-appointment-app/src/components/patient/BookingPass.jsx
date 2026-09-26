// doctor-appointment-app/src/components/patient/BookingPass.jsx
import React from 'react';

export const BookingPass = ({ appointment, onClose, onViewAppointments }) => {
  if (!appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Pass Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center relative">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl backdrop-blur-sm border border-white/30">
            ✓
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-100">Appointment Confirmed</span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">Booking Receipt & Pass</h2>
          <p className="text-xs text-emerald-100/90 mt-1">Please arrive 10 minutes prior to your scheduled slot</p>
        </div>

        {/* Pass Content Body */}
        <div className="p-6 space-y-5">
          {/* Appointment ID & Badge */}
          <div className="flex items-center justify-between pb-4 border-b border-dashed border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Appointment ID</span>
              <div className="text-base font-black text-slate-900 tracking-wider font-mono">
                {appointment.id}
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
              ● Confirmed
            </span>
          </div>

          {/* Doctor Info */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
            <span className="text-[10px] uppercase font-bold text-slate-400">Doctor / Specialist</span>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{appointment.doctorName}</div>
            <div className="text-xs text-cyan-700 font-semibold">{appointment.specialty}</div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
              <span className="text-[10px] uppercase font-bold text-slate-400">Date</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{appointment.date}</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
              <span className="text-[10px] uppercase font-bold text-slate-400">Time Slot</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{appointment.timeSlot}</div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="text-xs space-y-1.5 pt-2">
            <div className="flex justify-between text-slate-600">
              <span>Patient Name:</span>
              <span className="font-bold text-slate-900">{appointment.patientName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Contact:</span>
              <span className="font-medium text-slate-800">{appointment.patientPhone}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Consultation Mode:</span>
              <span className="font-bold text-cyan-800">{appointment.mode}</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-900">Total Consultation Fee:</span>
              <span className="font-extrabold text-slate-900 text-sm">₹{appointment.fee}</span>
            </div>
          </div>
        </div>

        {/* Pass Actions Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center space-x-1.5"
          >
            <span>🖨️ Print Pass</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Done
            </button>
            <button
              onClick={() => {
                onClose();
                onViewAppointments();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm"
            >
              View My Bookings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
