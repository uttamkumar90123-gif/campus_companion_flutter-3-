// doctor-appointment-app/src/components/patient/DoctorFilter.jsx
import React from 'react';
import { SPECIALTIES } from '../../data/specialties.js';
import { useDoctors } from '../../context/DoctorContext.jsx';

export const DoctorFilter = () => {
  const { selectedSpecialty, setSelectedSpecialty, searchQuery, setSearchQuery, filteredDoctors } = useDoctors();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm mb-8">
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 1114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by doctor name, specialty, condition, or hospital..."
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 text-xs font-semibold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Specialty Filter Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter by Specialty</span>
          <span className="text-xs text-slate-400">
            Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'specialist' : 'specialists'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((spec) => {
            const isSelected = selectedSpecialty === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-sm shadow-cyan-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-transparent'
                }`}
              >
                <span>{spec.name}</span>
                {spec.count && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {spec.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
