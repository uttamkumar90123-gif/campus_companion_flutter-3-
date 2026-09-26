import '../models/models.dart';

/// Stand-in for the repository layer described in Phase 3 of the roadmap:
/// `Repository.getTimetable()` would check Hive first, then fall back to
/// Firestore's `timetables/` collection and write the result back to cache.
/// Swap the bodies of these functions for real Firestore/Hive calls when
/// you wire up the backend — the models and screens don't need to change.
class MockData {
  MockData._();

  static final List<TimetableSlot> timetable = [
    const TimetableSlot(day: 'Mon', startTime: '09:00', endTime: '10:00', courseCode: 'CS301', courseName: 'Data Structures', room: 'Room 214', instructor: 'Dr. A. Mehta'),
    const TimetableSlot(day: 'Mon', startTime: '10:00', endTime: '11:00', courseCode: 'CS305', courseName: 'Operating Systems', room: 'Room 214', instructor: 'Prof. R. Iyer'),
    const TimetableSlot(day: 'Mon', startTime: '11:15', endTime: '12:15', courseCode: 'CS310', courseName: 'DBMS Lab', room: 'Lab 3', instructor: 'Dr. S. Nair'),
    const TimetableSlot(day: 'Mon', startTime: '14:00', endTime: '15:00', courseCode: 'HS201', courseName: 'Technical Communication', room: 'Room 108', instructor: 'Ms. K. Bose'),

    const TimetableSlot(day: 'Tue', startTime: '09:00', endTime: '10:00', courseCode: 'CS302', courseName: 'Computer Networks', room: 'Room 214', instructor: 'Dr. P. Rao'),
    const TimetableSlot(day: 'Tue', startTime: '10:00', endTime: '11:00', courseCode: 'CS305', courseName: 'Operating Systems', room: 'Room 214', instructor: 'Prof. R. Iyer'),
    const TimetableSlot(day: 'Tue', startTime: '13:00', endTime: '15:00', courseCode: 'CS308', courseName: 'Networks Lab', room: 'Lab 2', instructor: 'Dr. P. Rao'),

    const TimetableSlot(day: 'Wed', startTime: '09:00', endTime: '10:00', courseCode: 'CS301', courseName: 'Data Structures', room: 'Room 214', instructor: 'Dr. A. Mehta'),
    const TimetableSlot(day: 'Wed', startTime: '11:15', endTime: '12:15', courseCode: 'MA204', courseName: 'Discrete Mathematics', room: 'Room 210', instructor: 'Dr. V. Shah'),
    const TimetableSlot(day: 'Wed', startTime: '14:00', endTime: '15:00', courseCode: 'CS303', courseName: 'Software Engineering', room: 'Room 214', instructor: 'Prof. N. Kulkarni'),

    const TimetableSlot(day: 'Thu', startTime: '09:00', endTime: '10:00', courseCode: 'CS302', courseName: 'Computer Networks', room: 'Room 214', instructor: 'Dr. P. Rao'),
    const TimetableSlot(day: 'Thu', startTime: '10:00', endTime: '11:00', courseCode: 'MA204', courseName: 'Discrete Mathematics', room: 'Room 210', instructor: 'Dr. V. Shah'),
    const TimetableSlot(day: 'Thu', startTime: '11:15', endTime: '13:15', courseCode: 'CS312', courseName: 'OS Lab', room: 'Lab 1', instructor: 'Prof. R. Iyer'),

    const TimetableSlot(day: 'Fri', startTime: '09:00', endTime: '10:00', courseCode: 'CS303', courseName: 'Software Engineering', room: 'Room 214', instructor: 'Prof. N. Kulkarni'),
    const TimetableSlot(day: 'Fri', startTime: '10:00', endTime: '11:00', courseCode: 'CS301', courseName: 'Data Structures', room: 'Room 214', instructor: 'Dr. A. Mehta'),
    const TimetableSlot(day: 'Fri', startTime: '14:00', endTime: '15:00', courseCode: 'HS201', courseName: 'Technical Communication', room: 'Room 108', instructor: 'Ms. K. Bose'),

    const TimetableSlot(day: 'Sat', startTime: '09:00', endTime: '11:00', courseCode: 'CS399', courseName: 'Mini Project Review', room: 'Seminar Hall', instructor: 'Committee'),
  ];

  static List<Notice> notices() {
    final now = DateTime.now();
    return [
      Notice(
        title: 'Mid-sem exam datesheet released',
        body: 'The mid-semester examination schedule for all branches is now available. Check your slot and reporting time.',
        category: NoticeCategory.exam,
        timestamp: now.subtract(const Duration(hours: 2)),
        tag: '3rd/4th Sem',
        attachmentUrl: 'datesheet.pdf',
      ),
      Notice(
        title: 'Campus shut tomorrow — heavy rain advisory',
        body: 'Following the district weather advisory, all classes and labs are suspended tomorrow. Online mode for theory classes only.',
        category: NoticeCategory.urgent,
        timestamp: now.subtract(const Duration(hours: 5)),
        tag: 'All branches',
      ),
      Notice(
        title: 'TCS campus drive — registration open',
        body: 'Pre-placement talk on Friday, 4 PM, Auditorium. Eligible: 2026 batch, CGPA 6.5+. Bring resume and ID card.',
        category: NoticeCategory.placement,
        timestamp: now.subtract(const Duration(days: 1)),
        tag: 'Final year',
      ),
      Notice(
        title: 'Annual cultural fest — Aarohan 2026',
        body: 'Registrations for dance, music, and drama events are now open. Team events allow up to 6 members.',
        category: NoticeCategory.cultural,
        timestamp: now.subtract(const Duration(days: 2)),
        tag: 'All years',
      ),
      Notice(
        title: 'Lab manuals updated for DBMS',
        body: 'Revised lab manual for Database Management Systems is uploaded under Resources, includes new ER-diagram exercises.',
        category: NoticeCategory.academic,
        timestamp: now.subtract(const Duration(days: 3)),
        tag: '3rd Sem CSE',
      ),
    ];
  }

  static const List<FacultyMember> faculty = [
    FacultyMember(name: 'Dr. A. Mehta', department: 'Computer Science', designation: 'Associate Professor', courseTaught: 'Data Structures', cabin: 'Cabin 12, Block B', email: 'a.mehta@college.edu', phone: '+911234500001'),
    FacultyMember(name: 'Prof. R. Iyer', department: 'Computer Science', designation: 'Assistant Professor', courseTaught: 'Operating Systems', cabin: 'Cabin 14, Block B', email: 'r.iyer@college.edu', phone: '+911234500002'),
    FacultyMember(name: 'Dr. P. Rao', department: 'Computer Science', designation: 'Professor', courseTaught: 'Computer Networks', cabin: 'Cabin 3, Block A', email: 'p.rao@college.edu', phone: '+911234500003'),
    FacultyMember(name: 'Dr. V. Shah', department: 'Mathematics', designation: 'Associate Professor', courseTaught: 'Discrete Mathematics', cabin: 'Cabin 6, Block A', email: 'v.shah@college.edu', phone: '+911234500004'),
    FacultyMember(name: 'Prof. N. Kulkarni', department: 'Computer Science', designation: 'Assistant Professor', courseTaught: 'Software Engineering', cabin: 'Cabin 9, Block B', email: 'n.kulkarni@college.edu', phone: '+911234500005'),
    FacultyMember(name: 'Ms. K. Bose', department: 'Humanities', designation: 'Lecturer', courseTaught: 'Technical Communication', cabin: 'Cabin 2, Block C', email: 'k.bose@college.edu', phone: '+911234500006'),
  ];

  /// Mock campus-location lookup, keyed by the exact room string used in
  /// `timetable`. Swap this for a `campus_locations/` Firestore collection
  /// (or a real indoor-maps SDK) later — `locationForRoom()` below is the
  /// only place that needs to change.
  static const Map<String, RoomLocation> roomLocations = {
    'Room 214': RoomLocation(building: 'Block B — Engineering Wing', floor: '2nd Floor', roomNumber: '214'),
    'Room 210': RoomLocation(building: 'Block B — Engineering Wing', floor: '2nd Floor', roomNumber: '210'),
    'Room 108': RoomLocation(building: 'Block C — Humanities Wing', floor: '1st Floor', roomNumber: '108'),
    'Lab 1': RoomLocation(building: 'Block A — Computer Labs', floor: 'Ground Floor', roomNumber: 'Lab 1'),
    'Lab 2': RoomLocation(building: 'Block A — Computer Labs', floor: 'Ground Floor', roomNumber: 'Lab 2'),
    'Lab 3': RoomLocation(building: 'Block A — Computer Labs', floor: 'Ground Floor', roomNumber: 'Lab 3'),
    'Seminar Hall': RoomLocation(building: 'Block D — Central Block', floor: '1st Floor', roomNumber: 'Seminar Hall'),
  };

  /// Returns a location for a given room, or null if not mapped yet —
  /// screens should show a graceful "location coming soon" state for null.
  static RoomLocation? locationForRoom(String room) => roomLocations[room];

  static List<Assignment> assignments() {
    final now = DateTime.now();
    return [
      Assignment(subjectCode: 'CS301', title: 'Binary Search Tree implementation', deadline: now.add(const Duration(hours: 20)), fileName: 'bst_assignment.pdf'),
      Assignment(subjectCode: 'CS305', title: 'Process scheduling report', deadline: now.add(const Duration(days: 3)), fileName: 'scheduling_report.pdf'),
      Assignment(subjectCode: 'CS303', title: 'SRS document — final submission', deadline: now.add(const Duration(days: 6)), fileName: 'srs_template.pdf'),
      Assignment(subjectCode: 'MA204', title: 'Problem set 4 — Graph theory', deadline: now.add(const Duration(days: 8)), fileName: 'problemset4.pdf'),
    ];
  }
}
