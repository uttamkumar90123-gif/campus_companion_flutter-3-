// doctor-appointment-app/src/components/patient/SlotPicker.jsx
import React from 'react';
import { useAppointments } from '../../context/AppointmentContext.jsx';

export const SlotPicker = ({ doctor, selectedDate, setSelectedDate, selectedSlot, setSelectedSlot }) => {
  const { isSlotBooked } = useAppointments();

  // Generate next 7 days starting today
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });

      days.push({
        dateStr,
        dayName,
        dayNum,
        monthName,
        isWeekend: d.getDay() === 0
      });
    }
    return days;
  };

  const datesList = getNext7Days();

  // Slots categorized
  const slotGroups = [
    {
      group: 'Morning Slots',
      icon: '🌅',
      slots: ['09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM']
    },
    {
      group: 'Afternoon Slots',
      icon: '☀️',
      slots: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM']
    },
    {
      group: 'Evening Slots',
      icon: '🌆',
      slots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM']
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Date Selector Pills */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Appointment Date
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {datesList.map((item) => {
            const isSelected = selectedDate === item.dateStr;
            return (
              <button
                key={item.dateStr}
                type="button"
                onClick={() => {
                  setSelectedDate(item.dateStr);
                  setSelectedSlot(''); // reset slot when date changes
                }}
                className={`p-2.5 rounded-xl text-center border transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-600 to-teal-600 text-white border-transparent shadow-md shadow-cyan-600/25 ring-2 ring-cyan-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>
                  {item.dayName}
                </div>
                <div className="text-base font-extrabold my-0.5">{item.dayNum}</div>
                <div className={`text-[10px] font-medium ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>
                  {item.monthName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Slot Selector Matrix */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Available Time Slots for {selectedDate}
        </label>

        <div className="space-y-4">
          {slotGroups.map((group) => (
            <div key={group.group} className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mb-2.5">
                <span>{group.icon}</span>
                <span>{group.group}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {group.slots.map((slot) => {
                  const booked = isSlotBooked(doctor.id, selectedDate, slot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={booked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-1 text-xs font-semibold rounded-lg text-center transition-all ${
                        booked
                          ? 'bg-slate-200/70 text-slate-400 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-cyan-600 text-white shadow-sm ring-2 ring-cyan-500/30 font-bold'
                          : 'bg-white hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 border border-slate-200 hover:border-cyan-300'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end space-x-4 mt-3 text-[11px] text-slate-500">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
};
