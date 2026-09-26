// doctor-appointment-app/src/data/mockDoctors.js

export const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Rajesh Verma',
    title: 'Senior Interventional Cardiologist',
    degrees: 'MBBS, MD (Medicine), DM (Cardiology), FACC',
    specialty: 'Cardiology',
    specialtyId: 'cardiology',
    experienceYears: 16,
    rating: 4.9,
    reviewsCount: 184,
    consultationFee: 900,
    hospital: 'Max Super Speciality Hospital, Vaishali',
    clinicAddress: 'Suite 304, Cardio Wing, Sec-1, Vaishali, Ghaziabad',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    about: 'Dr. Rajesh Verma is an acclaimed cardiologist with over 16 years of experience in angioplasty, arrhythmia management, and preventive heart health. Dedicated to personalized, empathetic cardiac care.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    consultationModes: ['In-Clinic', 'Video Call'],
    slotDurationMinutes: 30,
    workingHours: {
      morning: { start: '09:30', end: '13:00' },
      evening: { start: '17:00', end: '20:30' }
    }
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Sharma',
    title: 'Consultant Dermatologist & Cosmetologist',
    degrees: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    specialty: 'Dermatology',
    specialtyId: 'dermatology',
    experienceYears: 11,
    rating: 4.8,
    reviewsCount: 142,
    consultationFee: 750,
    hospital: 'Skin & Aesthetics Care Clinic, Indirapuram',
    clinicAddress: 'Plot 14, Habitat Center, Ahinsa Khand 1, Indirapuram',
    avatar: 'https://images.unsplash.com/photo-1594824813583-b9df74c65dbb?auto=format&fit=crop&q=80&w=400',
    about: 'Specializes in clinical dermatology, acne therapies, allergic skin conditions, pediatric dermatology, and advanced aesthetic procedures with evidence-based treatments.',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    consultationModes: ['In-Clinic', 'Video Call'],
    slotDurationMinutes: 20,
    workingHours: {
      morning: { start: '10:00', end: '13:30' },
      evening: { start: '16:30', end: '19:30' }
    }
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikram Malhotra',
    title: 'Senior Orthopedic & Joint Replacement Surgeon',
    degrees: 'MBBS, MS (Orthopedics), MCh (Ortho - UK)',
    specialty: 'Orthopedics',
    specialtyId: 'orthopedics',
    experienceYears: 19,
    rating: 4.9,
    reviewsCount: 215,
    consultationFee: 1000,
    hospital: 'Fortis Hospital & Bone Joint Institute',
    clinicAddress: 'Orthopedic OPD, Fortis Medical Complex, Sec-62, Noida',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    about: 'Renowned joint replacement and arthroscopy surgeon with thousands of successful knee, hip, and shoulder restorations. Emphasizes modern minimally invasive surgical methods and active rehabilitation.',
    availableDays: ['Tue', 'Wed', 'Thu', 'Sat'],
    consultationModes: ['In-Clinic'],
    slotDurationMinutes: 30,
    workingHours: {
      morning: { start: '09:00', end: '12:30' },
      evening: { start: '17:30', end: '20:30' }
    }
  },
  {
    id: 'doc-4',
    name: 'Dr. Priya Nambiar',
    title: 'Lead Pediatrician & Neonatologist',
    degrees: 'MBBS, DCH, DNB (Pediatrics), Fellowship Neonatology',
    specialty: 'Pediatrics',
    specialtyId: 'pediatrics',
    experienceYears: 13,
    rating: 4.9,
    reviewsCount: 167,
    consultationFee: 700,
    hospital: 'Little Angels Child Care Center',
    clinicAddress: 'Shop 21-22, Crossings Republik, Ghaziabad',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    about: 'Compassionate pediatric specialist caring for infants, toddlers, and adolescents. Expert in child developmental milestones, immunizations, respiratory infections, and neonatal care.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    consultationModes: ['In-Clinic', 'Video Call'],
    slotDurationMinutes: 20,
    workingHours: {
      morning: { start: '09:00', end: '13:00' },
      evening: { start: '16:00', end: '19:00' }
    }
  },
  {
    id: 'doc-5',
    name: 'Dr. Arvind Saxena',
    title: 'Senior Consultant Neurologist',
    degrees: 'MBBS, MD (Medicine), DM (Neurology)',
    specialty: 'Neurology',
    specialtyId: 'neurology',
    experienceYears: 18,
    rating: 4.8,
    reviewsCount: 138,
    consultationFee: 1200,
    hospital: 'NeuroCare Institute & Brain Center',
    clinicAddress: 'Tower B, Medical District, Raj Nagar Extension, Ghaziabad',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    about: 'Leading expert in stroke prevention, chronic headache management, epilepsy, Parkinsonism, and peripheral neuropathy with advanced neuro-diagnostic approaches.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    consultationModes: ['In-Clinic', 'Video Call'],
    slotDurationMinutes: 40,
    workingHours: {
      morning: { start: '10:00', end: '13:00' },
      evening: { start: '17:00', end: '20:00' }
    }
  },
  {
    id: 'doc-6',
    name: 'Dr. Sneha Roy',
    title: 'Senior Physician & Diabetologist',
    degrees: 'MBBS, MD (Internal Medicine), PGD (Diabetology)',
    specialty: 'General Medicine',
    specialtyId: 'general',
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 196,
    consultationFee: 600,
    hospital: 'Apex Healthcare & Family Wellness',
    clinicAddress: 'First Floor, Apollo Clinic, Kavi Nagar, Ghaziabad',
    avatar: 'https://images.unsplash.com/photo-1594824813583-b9df74c65dbb?auto=format&fit=crop&q=80&w=400',
    about: 'Dedicated family physician with extensive experience in managing lifestyle diseases, Type 2 diabetes, metabolic disorders, hypertension, seasonal fevers, and preventive health screenings.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    consultationModes: ['In-Clinic', 'Video Call'],
    slotDurationMinutes: 20,
    workingHours: {
      morning: { start: '08:30', end: '12:30' },
      evening: { start: '17:00', end: '20:30' }
    }
  },
  {
    id: 'doc-7',
    name: 'Dr. Siddharth Kapoor',
    title: 'Consultant Psychiatrist & Behavioral Therapist',
    degrees: 'MBBS, MD (Psychiatry), Member Indian Psychiatric Society',
    specialty: 'Psychiatry',
    specialtyId: 'psychiatry',
    experienceYears: 10,
    rating: 4.7,
    reviewsCount: 92,
    consultationFee: 1100,
    hospital: 'MindWell Clinic for Mental Health',
    clinicAddress: 'Opposite Central Park, Sector 14, Vasundhara, Ghaziabad',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    about: 'Specialist in adult anxiety, depressive disorders, panic disorders, sleep disturbance, stress counseling, and cognitive behavioral therapy (CBT).',
    availableDays: ['Tue', 'Thu', 'Sat', 'Sun'],
    consultationModes: ['Video Call', 'In-Clinic'],
    slotDurationMinutes: 45,
    workingHours: {
      morning: { start: '11:00', end: '14:00' },
      evening: { start: '16:00', end: '19:30' }
    }
  },
  {
    id: 'doc-8',
    name: 'Dr. Meenakshi Joshi',
    title: 'Senior ENT & Head Neck Surgeon',
    degrees: 'MBBS, MS (ENT), DNB (Otorhinolaryngology)',
    specialty: 'ENT Specialist',
    specialtyId: 'ent',
    experienceYears: 14,
    rating: 4.8,
    reviewsCount: 118,
    consultationFee: 700,
    hospital: 'Voice & Hearing ENT Care Hospital',
    clinicAddress: 'Near Wave Cinema, GT Road, Ghaziabad',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    about: 'Specializes in endoscopic sinus surgery, tympanoplasty for hearing loss, allergic rhinitis, tonsillectomy, and voice disorder rehabilitations.',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    consultationModes: ['In-Clinic'],
    slotDurationMinutes: 20,
    workingHours: {
      morning: { start: '09:30', end: '13:00' },
      evening: { start: '17:00', end: '19:30' }
    }
  }
];
