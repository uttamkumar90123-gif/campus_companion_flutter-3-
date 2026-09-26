# MediConnect — Doctor & Appointment Management System (React)

MediConnect is a modern, responsive, and full-featured **Doctor & Appointment Management** platform developed in **React 18** and styled with **Tailwind CSS**. It bridges patients and healthcare providers by combining frictionless specialist discovery and real-time slot scheduling with an empowered doctor clinical dashboard.

---

## 🚀 Key Features

### 1. Patient Portal (Doctor Discovery & Booking)
- **Specialist Directory & Search**:
  - Filter doctors across medical specialties (Cardiology, Dermatology, Pediatrics, Orthopedics, Neurology, General Medicine, Psychiatry, ENT).
  - Real-time search across doctor names, qualifications, clinic locations, and specialties.
  - Doctor preview cards displaying verified ratings, review counts, experience years, clinic address, and consultation fees.
- **Detailed Doctor Profile**:
  - Comprehensive clinical background, hospital affiliations, verified patient ratings, and consultation mode tags (`In-Clinic` and `Video Call`).
- **Dynamic Slot Booking Flow**:
  - **Step 1: Date & Slot Selection**: Interactive 7-day calendar picker and time slots divided into Morning, Afternoon, and Evening sessions.
  - **Conflict Prevention**: Already-booked slots are automatically detected, grayed out, and disabled to prevent double-booking.
  - **Step 2: Patient Intake Form**: Captures patient name, contact phone, email, age, gender, and clinical symptoms/reason for consultation with validation.
  - **Step 3: Digital Booking Pass**: Instantly generates an appointment ticket with unique ID (e.g. `APT-2026-8942`), status badge (`Confirmed`), doctor information, schedule, fee, and print capability.
- **My Appointments Tracker**:
  - Patients can monitor their scheduled consultations, check real-time status (`Confirmed`, `Completed`, `Pending`, `Cancelled`), cancel upcoming appointments, and view doctors' diagnostic notes and prescriptions.

### 2. Doctor & Clinic Management Dashboard
- **Executive Analytics & KPI Metrics**:
  - Today's Appointments Count
  - Pending Approvals Queue
  - Completed & Treated Visits
  - Total Consultation Fees Earned (₹)
- **Appointment Queue & Status Controls**:
  - Filter bookings by `All`, `Today`, `Confirmed`, `Pending`, `Completed`, and `Cancelled`.
  - Accept pending bookings with one click.
  - Cancel bookings with status updates.
- **Clinical Consultation Notes & E-Prescription**:
  - When marking a visit as `Completed`, the doctor can record clinical diagnoses, physical observations, and prescribed medications with dosage instructions.
  - Consultation notes are immediately synchronized with the patient's record.
- **Shift & Slot Availability Settings**:
  - Toggle active working days of the week (Monday through Sunday).
  - Configure shift hours for morning and evening sessions.
  - Adjust appointment slot duration (15 min, 20 min, 30 min, 45 min).
  - Set and update standard consultation fees.

### 3. Architecture & Persistence
- **Zero-Friction LocalStorage Sync**: All doctor profiles, appointment bookings, notes, and schedule configurations automatically persist in browser `localStorage`.
- **Reset Capability**: Includes a "Reset Sample Data" action to easily restore the default seed data for testing or live demonstrations.
- **One-Click Role Switching**: Switch seamlessly between **Patient View** and **Doctor Portal** directly from the top navigation bar.

---

## 📁 Project Structure

```
doctor-appointment-app/
├── index.html                     # Standalone ready-to-run React application
├── server.js                      # Lightweight Node.js preview server
├── package.json                   # Project metadata and configuration
├── README.md                      # Documentation & instructions
└── src/                           # Modular React source code
    ├── main.jsx                   # React root entry point
    ├── App.jsx                    # Root application component coordinating state & views
    ├── index.css                  # Tailwind styles and base font definitions
    ├── data/
    │   ├── mockDoctors.js         # Pre-seeded doctors with bios, fees, ratings, slots
    │   ├── mockAppointments.js    # Seed appointments for demoing doctor dashboard
    │   └── specialties.js         # Medical specialties metadata
    ├── context/
    │   ├── AppointmentContext.jsx # Global appointment state & booking actions
    │   └── DoctorContext.jsx      # Doctor directory, schedule, and slot configurations
    ├── services/
    │   └── storageService.js      # LocalStorage sync engine & API abstraction layer
    └── components/
        ├── layout/
        │   └── Navbar.jsx         # Role switcher (Patient / Doctor view) & notifications
        ├── patient/
        │   ├── DoctorCard.jsx     # Doctor preview card with book trigger
        │   ├── DoctorFilter.jsx   # Specialty pills & search input
        │   ├── DoctorProfileModal.jsx # Full doctor bio modal
        │   ├── SlotPicker.jsx     # Time slots grouped by Morning / Afternoon / Evening
        │   ├── BookingModal.jsx   # 3-step interactive booking modal
        │   ├── BookingPass.jsx    # Digital confirmation pass with appointment details
        │   └── MyAppointments.jsx # Patient appointment tracker
        └── doctor/
            ├── DashboardOverview.jsx # Metrics, charts, today's schedule table
            ├── AvailabilitySettings.jsx # Doctor working hours & slot generator
            └── ConsultationNotesModal.jsx # Add prescription & diagnosis notes
```

---

## 🏃 How to Run the Application

You can run the application using either of the following two methods:

### Method 1: Instant Browser View (Zero Dependencies)
Simply double-click or open `index.html` in any web browser (Chrome, Safari, Edge, Firefox):
```bash
open doctor-appointment-app/index.html
```

### Method 2: Node.js Preview Server
Run the built-in zero-dependency Node server from your terminal:
```bash
cd doctor-appointment-app
node server.js
```
Then visit `http://localhost:3000` in your browser.
