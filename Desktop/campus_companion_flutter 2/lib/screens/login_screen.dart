import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/models.dart';
import '../providers/app_providers.dart';
import '../theme/app_theme.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _rollController = TextEditingController(text: '21CS1042');
  final _passController = TextEditingController(text: '••••••••');
  UserRole _selectedRole = UserRole.student;

  @override
  void dispose() {
    _rollController.dispose();
    _passController.dispose();
    super.dispose();
  }

  void _signIn() {
    // Demo sign-in. Replace with:
    //   final cred = await FirebaseAuth.instance.signInWithEmailAndPassword(...)
    //   final role = await lookupRoleFromFirestore(cred.user!.uid)
    final roll = _rollController.text.trim().isEmpty ? 'Student' : _rollController.text.trim();
    ref.read(currentUserProvider.notifier).state = AppUser(rollOrId: roll, role: _selectedRole);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.paper,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 400),
            child: Container(
              padding: const EdgeInsets.fromLTRB(32, 36, 32, 32),
              decoration: BoxDecoration(
                color: AppColors.paperRaised,
                border: Border.all(color: AppColors.line),
                boxShadow: [
                  BoxShadow(color: AppColors.indigo.withOpacity(0.08), blurRadius: 30, offset: const Offset(0, 8)),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'CAMPUS COMPANION',
                    style: TextStyle(
                      fontFamily: 'Fraunces',
                      fontWeight: FontWeight.w700,
                      fontSize: 12.5,
                      letterSpacing: 1.2,
                      color: AppColors.gold,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text('Sign in', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 28)),
                  const SizedBox(height: 6),
                  const Text(
                    'Use your institutional roll number to reach your timetable, notices, and assignments in one place.',
                    style: TextStyle(color: AppColors.inkSoft, fontSize: 14.5, height: 1.5),
                  ),
                  const SizedBox(height: 26),

                  const _FieldLabel('Roll number or staff ID'),
                  TextField(controller: _rollController),
                  const SizedBox(height: 16),

                  const _FieldLabel('Password'),
                  TextField(controller: _passController, obscureText: true),
                  const SizedBox(height: 16),

                  const _FieldLabel('Signing in as'),
                  const SizedBox(height: 6),
                  Row(
                    children: UserRole.values.map((role) {
                      final selected = role == _selectedRole;
                      return Expanded(
                        child: Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: OutlinedButton(
                            onPressed: () => setState(() => _selectedRole = role),
                            style: OutlinedButton.styleFrom(
                              backgroundColor: selected ? AppColors.indigo : AppColors.paper,
                              foregroundColor: selected ? Colors.white : AppColors.inkSoft,
                              side: BorderSide(color: selected ? AppColors.indigo : AppColors.line),
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                            ),
                            child: Text(role.label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                          ),
                        ),
                      );
                    }).toList(),
                  ),

                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(onPressed: _signIn, child: const Text('Sign in')),
                  ),
                  const SizedBox(height: 14),
                  const Text(
                    'Demo build — sign-in accepts any values and loads sample data for the selected role. '
                    'Wire this up to Firebase Auth to go live.',
                    style: TextStyle(color: AppColors.inkSoft, fontSize: 12, height: 1.5),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _FieldLabel extends StatelessWidget {
  final String text;
  const _FieldLabel(this.text);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text(
        text,
        style: const TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600, color: AppColors.indigo),
      ),
    );
  }
}
