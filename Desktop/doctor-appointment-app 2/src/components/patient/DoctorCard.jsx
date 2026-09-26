// doctor-appointment-app/src/components/patient/DoctorCard.jsx
import React from 'react';

export const DoctorCard = ({ doctor, onBookAppointment, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Top Header & Specialty Badge */}
        <div className="p-6 pb-4">
          <div className="flex items-start space-x-4">
            <div className="relative flex-shrink-0">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-200"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200/60 uppercase tracking-wide">
                  {doctor.specialty}
                </span>
                <span className="text-xs font-semibold text-amber-500 flex items-center">
                  ★ {doctor.rating}
                  <span className="text-slate-400 font-normal ml-1">({doctor.reviewsCount})</span>
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1 truncate group-hover:text-cyan-600 transition-colors">
                {doctor.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium truncate">{doctor.degrees}</p>
              <p className="text-xs text-slate-600 mt-1 flex items-center">
                <span className="font-semibold text-slate-800">{doctor.experienceYears} Years</span>
                <span className="mx-1 text-slate-300">•</span>
                <span className="truncate">{doctor.hospital}</span>
              </p>
            </div>
          </div>

          {/* About Snippet */}
          <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
            {doctor.about}
          </p>

          {/* Meta Details: Consultation Modes & Availability */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-1.5">
              {doctor.consultationModes.map((mode) => (
                <span
                  key={mode}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                >
                  {mode === 'In-Clinic' ? '🏥 In-Clinic' : '💻 Video Call'}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
              ● Next Slot: Today
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer with Fee & CTA */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Consultation Fee</span>
          <div className="text-base font-extrabold text-slate-900">
            ₹{doctor.consultationFee}
            <span className="text-xs font-normal text-slate-500 ml-1">/ visit</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewProfile(doctor)}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => onBookAppointment(doctor)}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 rounded-xl shadow-sm shadow-cyan-600/25 transition-all transform active:scale-95"
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
};
