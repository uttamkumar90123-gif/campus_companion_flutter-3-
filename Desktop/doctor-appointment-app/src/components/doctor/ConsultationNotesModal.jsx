// doctor-appointment-app/src/components/doctor/ConsultationNotesModal.jsx
import React, { useState } from 'react';
import { useAppointments } from '../../context/AppointmentContext.jsx';

export const ConsultationNotesModal = ({ appointment, onClose }) => {
  const { addConsultationNotes } = useAppointments();

  const [notes, setNotes] = useState(appointment.consultationNotes || '');
  const [prescription, setPrescription] = useState(appointment.prescription || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      alert('Please enter clinical consultation notes or diagnosis.');
      return;
    }
    addConsultationNotes(appointment.id, notes, prescription);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Clinical Consultation Record</span>
            <h2 className="text-lg font-bold text-white mt-1">Complete Consultation & Prescribe</h2>
            <p className="text-xs text-slate-300">
              Patient: <span className="font-semibold text-white">{appointment.patientName}</span> ({appointment.patientAge}y, {appointment.patientGender})
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 text-base">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 block mb-0.5">Patient's Stated Reason / Symptoms:</span>
            <p className="text-slate-600 italic">{appointment.reason}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Diagnosis & Clinical Observations *
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Diagnosed with Acute Viral Pharyngitis. Vitals stable. Advised 3 days warm saline gargles and rest."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Prescription & Dosage Guidelines (Optional)
            </label>
            <textarea
              rows={4}
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="1. Tab Paracetamol 650mg TDS x 3 days&#10;2. Tab Cetirizine 10mg HS x 5 days&#10;3. Syp TusQ-D 10ml TDS x 5 days"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              * Submitting marks the appointment as Completed.
            </span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition-all"
              >
                Save & Mark Completed ✓
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
