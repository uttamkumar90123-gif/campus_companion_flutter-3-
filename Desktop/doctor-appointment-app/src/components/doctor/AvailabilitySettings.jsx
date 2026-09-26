// doctor-appointment-app/src/components/doctor/AvailabilitySettings.jsx
import React, { useState } from 'react';
import { useDoctors } from '../../context/DoctorContext.jsx';

export const AvailabilitySettings = () => {
  const { activeDoctor, activeDoctorId, updateDoctorSchedule } = useDoctors();

  const [availableDays, setAvailableDays] = useState(activeDoctor.availableDays || []);
  const [slotDuration, setSlotDuration] = useState(activeDoctor.slotDurationMinutes || 30);
  const [fee, setFee] = useState(activeDoctor.consultationFee || 800);
  const [morningStart, setMorningStart] = useState(activeDoctor.workingHours?.morning?.start || '09:00');
  const [morningEnd, setMorningEnd] = useState(activeDoctor.workingHours?.morning?.end || '13:00');
  const [eveningStart, setEveningStart] = useState(activeDoctor.workingHours?.evening?.start || '17:00');
  const [eveningEnd, setEveningEnd] = useState(activeDoctor.workingHours?.evening?.end || '20:30');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter((d) => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateDoctorSchedule(activeDoctorId, {
      availableDays,
      slotDurationMinutes: Number(slotDuration),
      consultationFee: Number(fee),
      workingHours: {
        morning: { start: morningStart, end: morningEnd },
        evening: { start: eveningStart, end: eveningEnd }
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Clinic Availability &amp; Slot Configuration</h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure working days, consultation shift timings, slot intervals, and pricing for {activeDoctor.name}
            </p>
          </div>
          <span className="text-xs px-3 py-1 bg-teal-50 text-teal-700 font-bold rounded-full border border-teal-200">
            {activeDoctor.specialty}
          </span>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
            <span>✓</span>
            <span>Availability settings updated and saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="mt-6 space-y-6 text-xs">
          {/* Working Days */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Working Consultation Days
            </label>
            <div className="flex flex-wrap gap-2">
              {allDays.map((day) => {
                const isActive = availableDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`w-14 h-12 rounded-xl text-center font-bold text-xs border transition-all ${
                      isActive
                        ? 'bg-teal-600 text-white border-transparent shadow-sm ring-2 ring-teal-500/20'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div>{day}</div>
                    <div className="text-[10px] font-normal opacity-80">{isActive ? 'Open' : 'Off'}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shift Hours Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-2">🌅 Morning Shift</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">START TIME</span>
                  <input
                    type="time"
                    value={morningStart}
                    onChange={(e) => setMorningStart(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">END TIME</span>
                  <input
                    type="time"
                    value={morningEnd}
                    onChange={(e) => setMorningEnd(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 block mb-2">🌆 Evening Shift</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500">START TIME</span>
                  <input
                    type="time"
                    value={eveningStart}
                    onChange={(e) => setEveningStart(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">END TIME</span>
                  <input
                    type="time"
                    value={eveningEnd}
                    onChange={(e) => setEveningEnd(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slot Duration & Fee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Appointment Slot Duration
              </label>
              <select
                value={slotDuration}
                onChange={(e) => setSlotDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value={15}>15 Minutes per patient (Express consultation)</option>
                <option value={20}>20 Minutes per patient (Standard follow-up)</option>
                <option value={30}>30 Minutes per patient (Comprehensive checkup)</option>
                <option value={45}>45 Minutes per patient (Detailed / Psychiatric)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Standard Consultation Fee (₹)
              </label>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                min={0}
                step={50}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-600/20 transition-all transform active:scale-95"
            >
              Save Schedule Settings ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
