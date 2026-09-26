// doctor-appointment-app/src/context/DoctorContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState(() => storageService.getDoctors());
  const [activeDoctorId, setActiveDoctorIdState] = useState(() => storageService.getActiveDoctorId());
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    storageService.saveDoctors(doctors);
  }, [doctors]);

  const setActiveDoctorId = (id) => {
    setActiveDoctorIdState(id);
    storageService.setActiveDoctorId(id);
  };

  const activeDoctor = doctors.find((d) => d.id === activeDoctorId) || doctors[0];

  const updateDoctorSchedule = (doctorId, updatedFields) => {
    setDoctors((prev) =>
      prev.map((doc) => {
        if (doc.id === doctorId) {
          return { ...doc, ...updatedFields };
        }
        return doc;
      })
    );
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === 'all' || doc.specialtyId === selectedSpecialty;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.specialty.toLowerCase().includes(q) ||
      doc.hospital.toLowerCase().includes(q) ||
      doc.clinicAddress.toLowerCase().includes(q);

    return matchesSpecialty && matchesQuery;
  });

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        activeDoctor,
        activeDoctorId,
        setActiveDoctorId,
        updateDoctorSchedule,
        filteredDoctors,
        selectedSpecialty,
        setSelectedSpecialty,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
};
