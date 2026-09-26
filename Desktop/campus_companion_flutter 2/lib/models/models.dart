/// User roles matching the roadmap's Auth & Role Management module.
enum UserRole { student, faculty, admin }

extension UserRoleX on UserRole {
  String get label {
    switch (this) {
      case UserRole.student:
        return 'Student';
      case UserRole.faculty:
        return 'Faculty';
      case UserRole.admin:
        return 'Admin';
    }
  }

  /// Faculty/Admin have write/post permissions; students are read + submit only.
  bool get canPost => this == UserRole.faculty || this == UserRole.admin;
}

class AppUser {
  final String rollOrId;
  final UserRole role;

  const AppUser({required this.rollOrId, required this.role});
}

/// One class period in the weekly timetable.
/// Maps to a document inside Firestore's `timetables/{branch_sem}/slots`.
class TimetableSlot {
  final String day; // Mon..Sat
  final String startTime;
  final String endTime;
  final String courseCode;
  final String courseName;
  final String room;
  final String instructor;

  const TimetableSlot({
    required this.day,
    required this.startTime,
    required this.endTime,
    required this.courseCode,
    required this.courseName,
    required this.room,
    required this.instructor,
  });

  factory TimetableSlot.fromMap(Map<String, dynamic> map) => TimetableSlot(
        day: map['day'] as String,
        startTime: map['startTime'] as String,
        endTime: map['endTime'] as String,
        courseCode: map['courseCode'] as String,
        courseName: map['courseName'] as String,
        room: map['room'] as String,
        instructor: map['instructor'] as String,
      );

  Map<String, dynamic> toMap() => {
        'day': day,
        'startTime': startTime,
        'endTime': endTime,
        'courseCode': courseCode,
        'courseName': courseName,
        'room': room,
        'instructor': instructor,
      };

  /// Stable identifier for a slot, used to key per-slot reminder state.
  /// Once slots come from Firestore with real document IDs, swap this
  /// for the document ID instead of a composite string.
  String get slotKey => '$day-$startTime-$courseCode';
}

/// Mock stand-in for a future campus-map lookup. Keyed by room name in
/// MockData.roomLocations. Replace `MockData.roomLocations` with a real
/// `campus_locations/{roomId}` Firestore read (or an indoor-maps SDK call)
/// without touching any screen code — everything reads through
/// `locationForRoom()`.
class RoomLocation {
  final String building;
  final String floor;
  final String roomNumber;

  const RoomLocation({
    required this.building,
    required this.floor,
    required this.roomNumber,
  });
}

/// The four preset reminder lead times from the roadmap's notification
/// requirement. `minutes == null` represents "no reminder set".
enum ReminderOption { fiveMin, tenMin, fifteenMin, thirtyMin }

extension ReminderOptionX on ReminderOption {
  int get minutes {
    switch (this) {
      case ReminderOption.fiveMin:
        return 5;
      case ReminderOption.tenMin:
        return 10;
      case ReminderOption.fifteenMin:
        return 15;
      case ReminderOption.thirtyMin:
        return 30;
    }
  }

  String get label => '$minutes min before';
}

/// Notice category — drives the left color-bar spine and filter chips.
enum NoticeCategory { academic, exam, cultural, placement, urgent }

extension NoticeCategoryX on NoticeCategory {
  String get label {
    switch (this) {
      case NoticeCategory.academic:
        return 'Academic';
      case NoticeCategory.exam:
        return 'Exam';
      case NoticeCategory.cultural:
        return 'Cultural';
      case NoticeCategory.placement:
        return 'Placement';
      case NoticeCategory.urgent:
        return 'Urgent';
    }
  }
}

class Notice {
  final String title;
  final String body;
  final NoticeCategory category;
  final DateTime timestamp;
  final String tag; // e.g. "3rd Sem CSE"
  final String? attachmentUrl;

  const Notice({
    required this.title,
    required this.body,
    required this.category,
    required this.timestamp,
    required this.tag,
    this.attachmentUrl,
  });

  factory Notice.fromMap(Map<String, dynamic> map) => Notice(
        title: map['title'] as String,
        body: map['content'] as String,
        category: NoticeCategory.values.firstWhere(
          (c) => c.label == map['category'],
          orElse: () => NoticeCategory.academic,
        ),
        timestamp: DateTime.fromMillisecondsSinceEpoch(map['timestamp'] as int),
        tag: map['tag'] as String? ?? '',
        attachmentUrl: map['attachmentUrl'] as String?,
      );
}

class FacultyMember {
  final String name;
  final String department;
  final String designation;
  final String courseTaught;
  final String cabin;
  final String email;
  final String phone;

  const FacultyMember({
    required this.name,
    required this.department,
    required this.designation,
    required this.courseTaught,
    required this.cabin,
    required this.email,
    required this.phone,
  });

  String get initials {
    final cleaned = name.replaceAll(RegExp(r'^(Dr\.|Prof\.|Ms\.|Mr\.)\s*'), '');
    final parts = cleaned.split(' ');
    return parts.take(2).map((p) => p.isNotEmpty ? p[0] : '').join();
  }
}

enum AssignmentUrgency { urgent, soon, ok }

class Assignment {
  final String subjectCode;
  final String title;
  final DateTime deadline;
  final String fileName;
  final String? fileUrl;

  const Assignment({
    required this.subjectCode,
    required this.title,
    required this.deadline,
    required this.fileName,
    this.fileUrl,
  });

  AssignmentUrgency get urgency {
    final daysLeft = deadline.difference(DateTime.now()).inHours / 24;
    if (daysLeft <= 1) return AssignmentUrgency.urgent;
    if (daysLeft <= 4) return AssignmentUrgency.soon;
    return AssignmentUrgency.ok;
  }

  String get dueLabel {
    final diff = deadline.difference(DateTime.now());
    if (diff.inHours < 24) {
      return diff.inHours <= 0 ? 'Due now' : 'Due in ${diff.inHours}h';
    }
    return 'Due in ${diff.inDays} day${diff.inDays == 1 ? '' : 's'}';
  }
}
