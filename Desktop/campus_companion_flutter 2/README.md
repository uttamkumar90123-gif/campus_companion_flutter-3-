# Campus Companion — Flutter App

A working Flutter scaffold for the Campus Companion app, visually matched to
the web reference build (same color tokens, same Fraunces + IBM Plex Sans
type pairing, same left-color-bar "spine" card pattern for notices and
timetable slots).

## What's included

- **Login screen** — roll number / staff ID + role picker (Student / Faculty / Admin)
- **Dashboard** — today's stats, next class, latest notices
- **Timetable** — Mon–Sat tabs, one card per class period
- **Notices** — category filter chips + search
- **Faculty directory** — search, `tel:` / `mailto:` launch via `url_launcher`
- **Assignments** — deadline countdown tags, mock download action
- Responsive shell: **NavigationRail** on wide screens (≥820px), **NavigationBar** (bottom tabs) on phones
- Light **and** dark Material 3 themes (`lib/theme/app_theme.dart`)
- State managed with **Riverpod** (`lib/providers/app_providers.dart`)

All screen data currently comes from `lib/data/mock_data.dart`. Every
provider that exposes data (`timetableProvider`, `noticesProvider`,
`facultyProvider`, `assignmentsProvider`) is a single, small function —
swap its body for a Firestore/Hive read and no screen code needs to change.

## Run it

```bash
flutter pub get
flutter run
```

Requires Flutter 3.19+ / Dart 3.3+ (uses Dart 3 pattern-matching syntax and
Material 3 `WidgetStateProperty`).

## Wiring up the real backend (Phase 2 & 3 of the roadmap)

1. **Firebase**
   ```bash
   flutterfire configure
   ```
   Add `firebase_core`, `firebase_auth`, `cloud_firestore`, and
   `firebase_messaging` to `pubspec.yaml`, then call
   `await Firebase.initializeApp(...)` at the top of `main()`.

2. **Auth** — replace the `_signIn()` body in `lib/screens/login_screen.dart`
   with a real `FirebaseAuth.instance.signInWithEmailAndPassword(...)` call,
   then look up the user's role from the `users/` Firestore collection
   before setting `currentUserProvider`.

3. **Firestore collections** — match the schema from the roadmap:
   - `users/` — name, rollNo, branch, semester, role
   - `timetables/` — branch, semester, day, slots
   - `notices/` — title, content, category, timestamp, attachmentUrl
   - `faculty/` — name, department, email, cabin, designation
   - `assignments/` — subject, title, deadline, fileUrl

   `TimetableSlot.fromMap()` and `Notice.fromMap()` in `lib/models/models.dart`
   already expect this shape.

4. **Offline cache** — add `hive_flutter` initialization
   (`await Hive.initFlutter()`) in `main()`, then update the data providers
   in `lib/providers/app_providers.dart` to check the local Hive box first
   and fall back to Firestore, writing results back to Hive as they arrive.

5. **Push notifications** — add a top-level
   `Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message)`
   function and register it with
   `FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler)`
   before `runApp()`. Pair with `flutter_local_notifications` for the
   10-minutes-before-class reminders (schedule these when the timetable is
   first cached, using `zonedSchedule` with `exactAllowWhileIdle` — remember
   Android 12+ requires the `SCHEDULE_EXACT_ALARM` permission).

## Security rules reminder

Don't ship this without Firestore security rules that check the user's
`role` field server-side — e.g.:

```
match /notices/{noticeId} {
  allow read: if request.auth != null;
  allow write: if request.auth.token.role in ['faculty', 'admin'];
}
```

Client-side role checks (like the picker on the login screen) are for UX
only and must never be trusted for authorization.
