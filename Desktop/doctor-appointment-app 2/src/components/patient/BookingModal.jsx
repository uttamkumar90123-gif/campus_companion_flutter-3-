// doctor-appointment-app/src/components/patient/BookingModal.jsx
import React, { useState } from 'react';
import { SlotPicker } from './SlotPicker.jsx';
import { useAppointments } from '../../context/AppointmentContext.jsx';

export const BookingModal = ({ doctor, onClose, onBookingSuccess }) => {
  const { bookAppointment, todayStr } = useAppointments();

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultationMode, setConsultationMode] = useState(doctor.consultationModes[0] || 'In-Clinic');

  // Patient details state
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientAge: '',
    patientGender: 'Male',
    reason: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.patientName.trim()) errs.patientName = 'Patient full name is required';
    if (!formData.patientPhone.trim() || formData.patientPhone.length < 10) {
      errs.patientPhone = 'Valid 10-digit phone number is required';
    }
    if (!formData.patientEmail.trim() || !formData.patientEmail.includes('@')) {
      errs.patientEmail = 'Valid email address is required';
    }
    if (!formData.patientAge || Number(formData.patientAge) <= 0 || Number(formData.patientAge) > 120) {
      errs.patientAge = 'Please enter a valid age (1-120)';
    }
    if (!formData.reason.trim()) {
      errs.reason = 'Please provide symptoms or reason for appointment';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedSlot) {
        alert('Please choose an available time slot before continuing.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        const appointment = bookAppointment({
          doctor,
          date: selectedDate,
          timeSlot: selectedSlot,
          mode: consultationMode,
          ...formData
        });
        onBookingSuccess(appointment);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-12 h-12 rounded-xl object-cover border border-white/20"
              />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {doctor.specialty}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">{doctor.name}</h2>
                <p className="text-xs text-slate-300">{doctor.hospital}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center space-x-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  step === 1 ? 'bg-cyan-500 text-white' : 'bg-emerald-500 text-white'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'font-bold text-white' : 'text-slate-400'}>Slot & Mode</span>
            </div>
            <div className="w-12 h-0.5 bg-white/10"></div>
            <div className="flex items-center space-x-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  step === 2 ? 'bg-cyan-500 text-white' : 'bg-white/20 text-slate-300'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'font-bold text-white' : 'text-slate-400'}>Patient Details</span>
            </div>
            <div className="w-12 h-0.5 bg-white/10"></div>
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] bg-white/20 text-slate-300">
                3
              </span>
              <span className="text-slate-400">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Consultation Mode Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {doctor.consultationModes.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setConsultationMode(mode)}
                      className={`p-3 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                        consultationMode === mode
                          ? 'border-cyan-600 bg-cyan-50/50 ring-2 ring-cyan-500/20 text-cyan-900'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{mode === 'In-Clinic' ? '🏥' : '💻'}</span>
                      <div>
                        <div className="text-xs font-bold">{mode}</div>
                        <div className="text-[11px] text-slate-500">
                          {mode === 'In-Clinic' ? 'Visit doctor at clinic' : 'Audio & HD Video consultation'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Picker */}
              <SlotPicker
                doctor={doctor}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-cyan-50/70 p-3.5 rounded-xl border border-cyan-200/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Selected Slot: </span>
                  <span className="font-bold text-cyan-900">
                    {selectedDate} at {selectedSlot} ({consultationMode})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-cyan-700 font-bold hover:underline"
                >
                  Change Slot
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                  {errors.patientName && <p className="text-[11px] text-rose-500 mt-1">{errors.patientName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    name="patientPhone"
                    value={formData.patientPhone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                  {errors.patientPhone && <p className="text-[11px] text-rose-500 mt-1">{errors.patientPhone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. patient@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                  {errors.patientEmail && <p className="text-[11px] text-rose-500 mt-1">{errors.patientEmail}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    placeholder="e.g. 34"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                  {errors.patientAge && <p className="text-[11px] text-rose-500 mt-1">{errors.patientAge}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <div className="flex space-x-3">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <label key={g} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="patientGender"
                        value={g}
                        checked={formData.patientGender === g}
                        onChange={handleInputChange}
                        className="text-cyan-600 focus:ring-cyan-500"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reason / Symptoms for Visit *</label>
                <textarea
                  name="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Describe your primary symptoms, existing conditions, or queries for the doctor..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                ></textarea>
                {errors.reason && <p className="text-[11px] text-rose-500 mt-1">{errors.reason}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-400 uppercase font-semibold text-[10px]">Consultation Fee</span>
            <div className="font-extrabold text-slate-900 text-sm">₹{doctor.consultationFee}</div>
          </div>

          <div className="flex items-center space-x-2">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 rounded-xl shadow-md shadow-cyan-600/25 transition-all transform active:scale-95"
            >
              {step === 1 ? 'Proceed to Details →' : 'Confirm & Book Slot ✓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
