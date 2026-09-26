// doctor-appointment-app/src/components/doctor/DashboardOverview.jsx
import React, { useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext.jsx';
import { useDoctors } from '../../context/DoctorContext.jsx';
import { ConsultationNotesModal } from './ConsultationNotesModal.jsx';

export const DashboardOverview = () => {
  const { appointments, updateAppointmentStatus, getDoctorStats, todayStr } = useAppointments();
  const { activeDoctor, activeDoctorId } = useDoctors();

  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedForNotes, setSelectedForNotes] = useState(null);

  const stats = getDoctorStats(activeDoctorId);

  // Filter appointments for this doctor
  const docAppointments = appointments.filter((a) => a.doctorId === activeDoctorId);

  const filtered = docAppointments.filter((a) => {
    if (statusFilter === 'Today') return a.date === todayStr && a.status !== 'Cancelled';
    if (statusFilter === 'All') return true;
    return a.status === statusFilter;
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

  return (
    <div className="space-y-6">
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-slate-700">
        <div className="flex items-center space-x-4">
          <img
            src={activeDoctor.avatar}
            alt={activeDoctor.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-400 shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                {activeDoctor.specialty}
              </span>
              <span className="text-xs text-slate-400">● Clinic Active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">{activeDoctor.name}</h1>
            <p className="text-xs text-slate-300">{activeDoctor.hospital} • Fee: ₹{activeDoctor.consultationFee}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm border border-white/10 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Shift Timings</span>
            <span className="font-semibold text-white">
              {activeDoctor.workingHours.morning.start} - {activeDoctor.workingHours.morning.end} &amp; {activeDoctor.workingHours.evening.start} - {activeDoctor.workingHours.evening.end}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Schedule</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.todayCount}</div>
            <span className="text-[11px] text-teal-600 font-semibold mt-0.5 block">Active consultations</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl font-bold">
            📅
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Approvals</span>
            <div className="text-2xl font-black text-amber-500 mt-1">{stats.pendingCount}</div>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">Awaiting confirmation</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
            ⏳
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Visits</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{stats.completedCount}</div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Treated & Prescribed</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
            ✓
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Earned</span>
            <div className="text-2xl font-black text-slate-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</div>
            <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">From completed visits</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl font-bold">
            ₹
          </div>
        </div>
      </div>

      {/* Appointment Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table Top Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Appointment Management Queue</h2>
            <p className="text-xs text-slate-500">Manage patient bookings, confirm slots, and issue prescriptions</p>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {['All', 'Today', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No appointments found in this view.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200/80 font-bold text-[10px]">
                  <th className="py-3.5 px-4">ID & Date</th>
                  <th className="py-3.5 px-4">Patient Information</th>
                  <th className="py-3.5 px-4">Slot & Mode</th>
                  <th className="py-3.5 px-4">Reason / Notes</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-900">{apt.id}</div>
                      <div className="text-slate-500 text-[11px]">{apt.date}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{apt.patientName}</div>
                      <div className="text-slate-500 text-[11px]">
                        {apt.patientPhone} • {apt.patientAge}y, {apt.patientGender}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{apt.timeSlot}</div>
                      <div className="text-cyan-700 font-medium text-[11px]">{apt.mode}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="truncate text-slate-600" title={apt.reason}>{apt.reason}</p>
                      {apt.consultationNotes && (
                        <span className="text-[10px] text-teal-600 font-semibold block truncate">
                          ✓ Notes Recorded
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(apt.status)}`}>
                        ● {apt.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {apt.status === 'Pending' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                        >
                          Confirm Slot
                        </button>
                      )}

                      {apt.status === 'Confirmed' && (
                        <button
                          onClick={() => setSelectedForNotes(apt)}
                          className="px-2.5 py-1 text-[11px] font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
                        >
                          Complete &amp; Prescribe
                        </button>
                      )}

                      {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                          className="px-2 py-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg"
                        >
                          Cancel
                        </button>
                      )}

                      {apt.status === 'Completed' && (
                        <button
                          onClick={() => setSelectedForNotes(apt)}
                          className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                        >
                          View Notes
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Consultation Notes Modal */}
      {selectedForNotes && (
        <ConsultationNotesModal
          appointment={selectedForNotes}
          onClose={() => setSelectedForNotes(null)}
        />
      )}
    </div>
  );
};
