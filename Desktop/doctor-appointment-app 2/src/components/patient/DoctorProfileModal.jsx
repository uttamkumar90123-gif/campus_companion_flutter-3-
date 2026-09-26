// doctor-appointment-app/src/components/patient/DoctorProfileModal.jsx
import React from 'react';

export const DoctorProfileModal = ({ doctor, onClose, onBookAppointment }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-cyan-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 text-lg"
          >
            ✕
          </button>
          <div className="flex items-center space-x-4">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400 shadow-md"
            />
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold border border-cyan-500/30 uppercase tracking-wide">
                {doctor.specialty}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{doctor.name}</h2>
              <p className="text-xs text-slate-300">{doctor.degrees}</p>
              <div className="flex items-center space-x-2 mt-1.5 text-xs text-amber-400">
                <span>★ {doctor.rating}</span>
                <span className="text-slate-400">({doctor.reviewsCount} verified patient ratings)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Practice & Location */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-base">🏥</span>
              <div>
                <span className="font-bold text-slate-900 block">{doctor.hospital}</span>
                <span className="text-slate-500 text-[11px]">{doctor.clinicAddress}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-2 border-t border-slate-200/60 text-slate-600">
              <span>🩺 <strong>Experience:</strong> {doctor.experienceYears} Years</span>
              <span>💰 <strong>Consultation:</strong> ₹{doctor.consultationFee}</span>
            </div>
          </div>

          {/* About Biography */}
          <div>
            <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1.5">
              Biography &amp; Clinical Background
            </h3>
            <p className="text-slate-600 leading-relaxed bg-white border border-slate-100 p-3.5 rounded-xl shadow-xs">
              {doctor.about}
            </p>
          </div>

          {/* Consultation Days & Modes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Available Days</span>
              <span className="font-bold text-slate-800 mt-1 block">
                {doctor.availableDays.join(', ')}
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Consultation Modes</span>
              <div className="flex space-x-1.5 mt-1">
                {doctor.consultationModes.map((m) => (
                  <span key={m} className="px-2 py-0.5 bg-cyan-50 text-cyan-800 rounded font-semibold text-[10px]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookAppointment(doctor);
            }}
            className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 rounded-xl shadow-md transition-all transform active:scale-95"
          >
            Book Appointment Slot →
          </button>
        </div>
      </div>
    </div>
  );
};
