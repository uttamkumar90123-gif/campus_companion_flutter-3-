import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import '../providers/app_providers.dart';
import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

class DashboardScreen extends ConsumerWidget {
  final VoidCallback onSeeTimetable;
  final VoidCallback onSeeNotices;

  const DashboardScreen({super.key, required this.onSeeTimetable, required this.onSeeNotices});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final today = DateFormat('EEEE, d MMMM').format(DateTime.now());

    // For the dashboard's "today" card, pull Monday's slots as a stand-in
    // for "today" since the mock data always represents a fixed week.
    final todaySlots = ref.watch(timetableProvider).where((s) => s.day == 'Mon').toList();
    final notices = ref.watch(noticesProvider);
    final assignments = ref.watch(assignmentsProvider);
    final dueSoonCount = assignments.length;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Good to see you, ${user?.rollOrId ?? 'there'}',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 26)),
          const SizedBox(height: 4),
          Text(today, style: const TextStyle(color: AppColors.inkSoft, fontSize: 13.5)),
          const SizedBox(height: 20),

          // Stat row
          Row(
            children: [
              _StatBox(number: '${todaySlots.length}', label: 'Classes today'),
              const SizedBox(width: 12),
              _StatBox(number: '${notices.length}', label: 'New notices'),
              const SizedBox(width: 12),
              _StatBox(number: '$dueSoonCount', label: 'Due this week'),
            ],
          ),
          const SizedBox(height: 24),

          SectionHeader(title: 'Next up', actionLabel: 'Full timetable', onAction: onSeeTimetable),
          if (todaySlots.isEmpty)
            const EmptyNote(message: 'No more classes today')
          else
            _NextClassCard(courseName: todaySlots.first.courseName, code: todaySlots.first.courseCode, room: todaySlots.first.room, instructor: todaySlots.first.instructor, startTime: todaySlots.first.startTime),

          const SizedBox(height: 24),
          SectionHeader(title: 'Latest notices', actionLabel: 'See all', onAction: onSeeNotices),
          ...notices.take(3).map((n) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      margin: const EdgeInsets.only(top: 5, right: 10),
                      decoration: BoxDecoration(color: AppColors.forCategory(n.category.label), shape: BoxShape.circle),
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(n.title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13.5)),
                          const SizedBox(height: 2),
                          Text('${n.tag} · ${_relativeTime(n.timestamp)}', style: const TextStyle(fontSize: 12.5, color: AppColors.inkSoft)),
                        ],
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }

  static String _relativeTime(DateTime t) {
    final diff = DateTime.now().difference(t);
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    return '${diff.inDays}d ago';
  }
}

class _StatBox extends StatelessWidget {
  final String number;
  final String label;
  const _StatBox({required this.number, required this.label});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          color: AppColors.paperRaised,
          border: Border.all(color: AppColors.line),
          borderRadius: BorderRadius.circular(2),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(height: 3, width: 28, color: AppColors.gold, margin: const EdgeInsets.only(bottom: 8)),
            Text(number, style: const TextStyle(fontFamily: 'Fraunces', fontSize: 24, fontWeight: FontWeight.w600, color: AppColors.indigo)),
            const SizedBox(height: 2),
            Text(label, style: const TextStyle(fontSize: 11.5, color: AppColors.inkSoft)),
          ],
        ),
      ),
    );
  }
}

class _NextClassCard extends StatelessWidget {
  final String courseName, code, room, instructor, startTime;
  const _NextClassCard({required this.courseName, required this.code, required this.room, required this.instructor, required this.startTime});

  @override
  Widget build(BuildContext context) {
    return SpineCard(
      spineColor: AppColors.gold,
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            color: AppColors.indigo,
            child: Column(
              children: [
                Text(startTime, style: const TextStyle(color: Colors.white, fontFamily: 'monospace', fontSize: 13)),
                const Text('START', style: TextStyle(color: AppColors.gold, fontSize: 9, letterSpacing: 0.4)),
              ],
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(courseName, style: const TextStyle(fontFamily: 'Fraunces', fontSize: 16, color: AppColors.indigo, fontWeight: FontWeight.w600)),
                const SizedBox(height: 2),
                Text('$code · $room · $instructor', style: const TextStyle(fontSize: 12.5, color: AppColors.inkSoft)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
