// doctor-appointment-app/src/services/storageService.js
import { INITIAL_DOCTORS } from '../data/mockDoctors.js';
import { INITIAL_APPOINTMENTS } from '../data/mockAppointments.js';

const STORAGE_KEYS = {
  DOCTORS: 'mediconnect_doctors',
  APPOINTMENTS: 'mediconnect_appointments',
  ACTIVE_ROLE: 'mediconnect_role',
  ACTIVE_DOCTOR_ID: 'mediconnect_active_doc'
};

export const storageService = {
  getDoctors: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
        return INITIAL_DOCTORS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading doctors from localStorage:', e);
      return INITIAL_DOCTORS;
    }
  },

  saveDoctors: (doctors) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
    } catch (e) {
      console.error('Error saving doctors to localStorage:', e);
    }
  },

  getAppointments: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
        return INITIAL_APPOINTMENTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading appointments from localStorage:', e);
      return INITIAL_APPOINTMENTS;
    }
  },

  saveAppointments: (appointments) => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments to localStorage:', e);
    }
  },

  resetAllData: () => {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    return { doctors: INITIAL_DOCTORS, appointments: INITIAL_APPOINTMENTS };
  },

  getActiveRole: () => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_ROLE) || 'patient';
  },

  setActiveRole: (role) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROLE, role);
  },

  getActiveDoctorId: () => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_DOCTOR_ID) || 'doc-1';
  },

  setActiveDoctorId: (id) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DOCTOR_ID, id);
  }
};
