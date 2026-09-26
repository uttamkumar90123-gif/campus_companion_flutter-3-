import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/mock_data.dart';
import '../models/models.dart';

/// Signed-in user; null means the login screen is shown.
/// Replace the sign-in logic in login_screen.dart with a real
/// FirebaseAuth.instance.signInWithEmailAndPassword(...) call and set
/// this provider from the resulting UserCredential + Firestore role lookup.
final currentUserProvider = StateProvider<AppUser?>((ref) => null);

/// Currently selected day tab on the Timetable screen.
final selectedDayProvider = StateProvider<String>((ref) => 'Mon');

/// Search query for the Timetable screen (subject / faculty / room).
final timetableSearchProvider = StateProvider<String>((ref) => '');

/// Per-slot reminder lead time, keyed by TimetableSlot.slotKey.
/// Absent key or null value = no reminder set for that slot.
/// This is the in-memory mock for the notification backend described in
/// the roadmap; once flutter_local_notifications + FCM are wired up, the
/// setter in the notifier below is where you'd also call
/// flutterLocalNotificationsPlugin.zonedSchedule(...).
final reminderMapProvider = StateProvider<Map<String, ReminderOption?>>((ref) => {});

/// Currently selected notice category filter chip.
final selectedCategoryProvider = StateProvider<String>((ref) => 'All');

/// Notice search query.
final noticeSearchProvider = StateProvider<String>((ref) => '');

/// Faculty directory search query.
final facultySearchProvider = StateProvider<String>((ref) => '');

/// Bottom nav / rail index shared by the app shell.
final navIndexProvider = StateProvider<int>((ref) => 0);

/// Theme mode toggle for Phase 1's dark/light requirement.
final themeModeProvider = StateProvider((ref) => ThemeModeOption.system);

enum ThemeModeOption { light, dark, system }

/// --- Data providers ---
/// These read from MockData today. When Phase 2/3 land, change only the
/// body of these providers to read from Hive-first-then-Firestore; every
/// screen that watches them keeps working unchanged.

final timetableProvider = Provider((ref) => MockData.timetable);

final noticesProvider = Provider((ref) => MockData.notices());

final facultyProvider = Provider((ref) => MockData.faculty);

final assignmentsProvider = Provider((ref) => MockData.assignments());

/// Derived: slots for the currently selected day.
final daySlotsProvider = Provider((ref) {
  final day = ref.watch(selectedDayProvider);
  final all = ref.watch(timetableProvider);
  return all.where((s) => s.day == day).toList()
    ..sort((a, b) => a.startTime.compareTo(b.startTime));
});

/// Day ordering used to sort cross-week search results sensibly.
const _dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/// Derived: what the Timetable screen should actually render.
///
/// - Empty query -> the normal single-day view (daySlotsProvider), so the
///   existing day-tab experience is untouched.
/// - Non-empty query -> matches across the *entire* week by subject name,
///   course code, faculty, or room, sorted by day then time, so a student
///   can find "which day is DBMS lab" without knowing the tab first.
final timetableViewProvider = Provider((ref) {
  final query = ref.watch(timetableSearchProvider).trim().toLowerCase();
  if (query.isEmpty) {
    return ref.watch(daySlotsProvider);
  }
  final all = ref.watch(timetableProvider);
  final matches = all.where((s) {
    return s.courseName.toLowerCase().contains(query) ||
        s.courseCode.toLowerCase().contains(query) ||
        s.instructor.toLowerCase().contains(query) ||
        s.room.toLowerCase().contains(query);
  }).toList()
    ..sort((a, b) {
      final dayCompare = _dayOrder.indexOf(a.day).compareTo(_dayOrder.indexOf(b.day));
      if (dayCompare != 0) return dayCompare;
      return a.startTime.compareTo(b.startTime);
    });
  return matches;
});

/// True while a search query is active — screens use this to decide
/// whether to show day-grouped headers instead of the plain day-tab list.
final isTimetableSearchingProvider = Provider((ref) => ref.watch(timetableSearchProvider).trim().isNotEmpty);

/// Derived: notices filtered by category + search query.
final filteredNoticesProvider = Provider((ref) {
  final cat = ref.watch(selectedCategoryProvider);
  final query = ref.watch(noticeSearchProvider).toLowerCase();
  final all = ref.watch(noticesProvider);
  return all.where((n) {
    final matchesCat = cat == 'All' || n.category.label == cat;
    final matchesQuery = query.isEmpty ||
        n.title.toLowerCase().contains(query) ||
        n.body.toLowerCase().contains(query);
    return matchesCat && matchesQuery;
  }).toList();
});

/// Derived: faculty filtered by search query.
final filteredFacultyProvider = Provider((ref) {
  final query = ref.watch(facultySearchProvider).toLowerCase();
  final all = ref.watch(facultyProvider);
  if (query.isEmpty) return all;
  return all
      .where((f) =>
          f.name.toLowerCase().contains(query) ||
          f.department.toLowerCase().contains(query) ||
          f.courseTaught.toLowerCase().contains(query))
      .toList();
});
