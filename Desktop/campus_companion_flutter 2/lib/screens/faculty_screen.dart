import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/models.dart';
import '../providers/app_providers.dart';
import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

class FacultyScreen extends ConsumerWidget {
  const FacultyScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final faculty = ref.watch(filteredFacultyProvider);

    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Faculty directory', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 26)),
          const SizedBox(height: 4),
          const Text('Tap to call or email directly.', style: TextStyle(color: AppColors.inkSoft, fontSize: 13.5)),
          const SizedBox(height: 16),
          TextField(
            decoration: const InputDecoration(
              hintText: 'Search by name, department, or course…',
              prefixIcon: Icon(Icons.search, size: 18),
            ),
            onChanged: (v) => ref.read(facultySearchProvider.notifier).state = v,
          ),
          const SizedBox(height: 16),
          Expanded(
            child: faculty.isEmpty
                ? const EmptyNote(message: 'No faculty match your search')
                : ListView.builder(
                    itemCount: faculty.length,
                    itemBuilder: (context, i) => _FacultyTile(member: faculty[i]),
                  ),
          ),
        ],
      ),
    );
  }
}

class _FacultyTile extends StatelessWidget {
  final FacultyMember member;
  const _FacultyTile({required this.member});

  Future<void> _launch(Uri uri) async {
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.paperRaised,
        border: Border.all(color: AppColors.line),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 21,
            backgroundColor: AppColors.indigo,
            child: Text(member.initials, style: const TextStyle(fontFamily: 'Fraunces', color: AppColors.gold, fontWeight: FontWeight.w600)),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(member.name, style: const TextStyle(fontFamily: 'Fraunces', fontSize: 15.5, color: AppColors.indigo, fontWeight: FontWeight.w600)),
                const SizedBox(height: 2),
                Text('${member.department} · ${member.designation} · teaches ${member.courseTaught}', style: const TextStyle(fontSize: 12, color: AppColors.inkSoft)),
                Text(member.cabin, style: const TextStyle(fontSize: 12, color: AppColors.inkSoft)),
              ],
            ),
          ),
          _IconButton(icon: Icons.call_outlined, onTap: () => _launch(Uri(scheme: 'tel', path: member.phone))),
          const SizedBox(width: 8),
          _IconButton(icon: Icons.mail_outline, onTap: () => _launch(Uri(scheme: 'mailto', path: member.email))),
        ],
      ),
    );
  }
}

class _IconButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  const _IconButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      customBorder: const CircleBorder(),
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: AppColors.line)),
        child: Icon(icon, size: 17, color: AppColors.indigo),
      ),
    );
  }
}
