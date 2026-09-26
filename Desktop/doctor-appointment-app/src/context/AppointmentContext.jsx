// doctor-appointment-app/src/context/AppointmentContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => storageService.getAppointments());
  const [currentBooking, setCurrentBooking] = useState(null); // active pass/receipt modal

  useEffect(() => {
    storageService.saveAppointments(appointments);
  }, [appointments]);

  const bookAppointment = ({
    doctor,
    date,
    timeSlot,
    mode,
    patientName,
    patientPhone,
    patientEmail,
    patientAge,
    patientGender,
    reason
  }) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAppointment = {
      id: `APT-2026-${randomSuffix}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      patientName,
      patientPhone,
      patientEmail,
      patientAge: Number(patientAge),
      patientGender,
      date,
      timeSlot,
      mode: mode || 'In-Clinic',
      fee: doctor.consultationFee,
      status: 'Confirmed',
      reason: reason || 'General medical consultation',
      consultationNotes: '',
      prescription: '',
      createdAt: new Date().toISOString()
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setCurrentBooking(newAppointment);
    return newAppointment;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const addConsultationNotes = (id, notes, prescriptionText) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: 'Completed',
              consultationNotes: notes,
              prescription: prescriptionText
            }
          : apt
      )
    );
  };

  const rescheduleAppointment = (id, newDate, newTimeSlot) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              date: newDate,
              timeSlot: newTimeSlot,
              status: 'Confirmed'
            }
          : apt
      )
    );
  };

  const cancelAppointment = (id, cancelReason) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              status: 'Cancelled',
              cancellationReason: cancelReason || 'Cancelled by patient/clinic'
            }
          : apt
      )
    );
  };

  // Helper to check if a specific doctor's slot on a date is already booked
  const isSlotBooked = (doctorId, date, slot) => {
    return appointments.some(
      (apt) =>
        apt.doctorId === doctorId &&
        apt.date === date &&
        apt.timeSlot === slot &&
        apt.status !== 'Cancelled'
    );
  };

  // Metric computations
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = getTodayDateString();

  const getDoctorStats = (doctorId) => {
    const docApts = doctorId
      ? appointments.filter((a) => a.doctorId === doctorId)
      : appointments;

    const todayApts = docApts.filter((a) => a.date === todayStr && a.status !== 'Cancelled');
    const pendingApts = docApts.filter((a) => a.status === 'Pending');
    const completedApts = docApts.filter((a) => a.status === 'Completed');
    const totalRevenue = completedApts.reduce((sum, a) => sum + (a.fee || 0), 0);

    return {
      todayCount: todayApts.length,
      pendingCount: pendingApts.length,
      completedCount: completedApts.length,
      totalCount: docApts.length,
      totalRevenue
    };
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        currentBooking,
        setCurrentBooking,
        bookAppointment,
        updateAppointmentStatus,
        addConsultationNotes,
        rescheduleAppointment,
        cancelAppointment,
        isSlotBooked,
        getDoctorStats,
        todayStr
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
