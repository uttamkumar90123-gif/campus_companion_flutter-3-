import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'providers/app_providers.dart';
import 'screens/app_shell.dart';
import 'screens/login_screen.dart';
import 'theme/app_theme.dart';

/// Entry point.
///
/// To wire this up to a real backend (Phase 2 of the roadmap):
///   1. Add `firebase_core`, `firebase_auth`, `cloud_firestore`,
///      `firebase_messaging` to pubspec.yaml.
///   2. Run `flutterfire configure` to generate firebase_options.dart.
///   3. Call `await Firebase.initializeApp(...)` here before `runApp`.
///   4. Initialize Hive (`await Hive.initFlutter()`) here as well, so the
///      offline-first repository layer described in Phase 3 has a place
///      to read/write before the network call resolves.
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: CampusCompanionApp()));
}

class CampusCompanionApp extends ConsumerWidget {
  const CampusCompanionApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final themeOption = ref.watch(themeModeProvider);

    final themeMode = switch (themeOption) {
      ThemeModeOption.light => ThemeMode.light,
      ThemeModeOption.dark => ThemeMode.dark,
      ThemeModeOption.system => ThemeMode.system,
    };

    return MaterialApp(
      title: 'Campus Companion',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: themeMode,
      home: user == null ? const LoginScreen() : const AppShell(),
    );
  }
}
