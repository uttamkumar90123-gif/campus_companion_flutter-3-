// doctor-appointment-app/src/components/patient/MyAppointments.jsx
import React, { useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext.jsx';

export const MyAppointments = ({ onFindDoctors }) => {
  const { appointments, cancelAppointment, rescheduleAppointment } = useAppointments();
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const filtered = appointments.filter((apt) => {
    if (filterStatus === 'All') return true;
    return apt.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Completed':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(id, 'Cancelled by patient');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track your consultation schedules, digital passes, and clinical notes</p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['All', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === status
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
          <div className="w-16 h-16 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            📅
          </div>
          <h3 className="text-base font-bold text-slate-900">No appointments found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You don't have any appointments matching this category. Book your next consultation with top specialists.
          </p>
          <button
            onClick={onFindDoctors}
            className="mt-5 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 rounded-xl shadow-sm"
          >
            Find & Book Doctors →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{apt.id}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{apt.doctorName}</h3>
                    <p className="text-xs text-cyan-700 font-semibold">{apt.specialty}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(apt.status)}`}>
                    ● {apt.status}
                  </span>
                </div>

                {/* Details row */}
                <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">DATE & TIME</span>
                    <span className="font-bold text-slate-800">{apt.date}</span>
                    <span className="text-slate-600 block text-[11px]">{apt.timeSlot}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">CONSULTATION</span>
                    <span className="font-bold text-slate-800">{apt.mode}</span>
                    <span className="text-slate-600 block text-[11px]">Fee: ₹{apt.fee}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 mb-3">
                  <span className="text-slate-400 font-semibold text-[10px] uppercase block">Reason for visit:</span>
                  <p className="line-clamp-2 mt-0.5">{apt.reason}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {apt.status === 'Completed' && (
                  <button
                    onClick={() => setSelectedPrescription(apt)}
                    className="px-3 py-1.5 text-xs font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors"
                  >
                    View Prescription & Advice
                  </button>
                )}

                {apt.status === 'Confirmed' && (
                  <>
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="text-rose-600 hover:text-rose-800 font-semibold"
                    >
                      Cancel
                    </button>
                    <span className="text-[11px] text-emerald-600 font-semibold">
                      Pass Ready
                    </span>
                  </>
                )}

                {apt.status === 'Cancelled' && (
                  <span className="text-[11px] text-slate-400 italic">Booking cancelled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescription / Consultation Notes Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-cyan-700 to-teal-700 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-200">Official Prescription</span>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedPrescription.doctorName}</h3>
                  <p className="text-xs text-cyan-100">{selectedPrescription.specialty}</p>
                </div>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="text-cyan-200 hover:text-white text-lg p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">PATIENT</span>
                  <span className="font-bold text-slate-900">{selectedPrescription.patientName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">DATE</span>
                  <span className="font-bold text-slate-900">{selectedPrescription.date}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block text-xs uppercase text-slate-500 mb-1">Clinical Diagnosis & Notes:</span>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-line">
                  {selectedPrescription.consultationNotes || 'No notes recorded.'}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block text-xs uppercase text-slate-500 mb-1">Prescribed Medications:</span>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-mono whitespace-pre-line">
                  {selectedPrescription.prescription || 'No medicines prescribed.'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedPrescription(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
