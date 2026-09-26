import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/models.dart';
import '../providers/app_providers.dart';
import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

class AssignmentsScreen extends ConsumerWidget {
  const AssignmentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final assignments = ref.watch(assignmentsProvider);

    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Assignments & resources', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 26)),
          const SizedBox(height: 4),
          const Text('Deadlines, submissions, and reference material.', style: TextStyle(color: AppColors.inkSoft, fontSize: 13.5)),
          const SizedBox(height: 16),
          Expanded(
            child: assignments.isEmpty
                ? const EmptyNote(message: 'No assignments right now')
                : ListView.builder(
                    itemCount: assignments.length,
                    itemBuilder: (context, i) => _AssignmentTile(assignment: assignments[i]),
                  ),
          ),
        ],
      ),
    );
  }
}

class _AssignmentTile extends StatelessWidget {
  final Assignment assignment;
  const _AssignmentTile({required this.assignment});

  @override
  Widget build(BuildContext context) {
    final (fg, bg) = switch (assignment.urgency) {
      AssignmentUrgency.urgent => (AppColors.red, AppColors.redSoft),
      AssignmentUrgency.soon => (const Color(0xFF8A5620), AppColors.goldSoft),
      AssignmentUrgency.ok => (AppColors.teal, AppColors.tealSoft),
    };

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
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(assignment.title, style: const TextStyle(fontFamily: 'Fraunces', fontSize: 15.5, color: AppColors.indigo, fontWeight: FontWeight.w600)),
                const SizedBox(height: 2),
                Text('${assignment.subjectCode} · ${assignment.fileName}', style: const TextStyle(fontSize: 12, color: AppColors.inkSoft)),
              ],
            ),
          ),
          TagPill(text: assignment.dueLabel, foreground: fg, background: bg),
          const SizedBox(width: 10),
          OutlinedButton(
            onPressed: () {
              // Replace with a real Firebase Storage / S3 download call.
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Would download ${assignment.fileName} from Firebase Storage / S3.')),
              );
            },
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.indigo,
              side: const BorderSide(color: AppColors.indigo),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
            ),
            child: const Text('Download', style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
          ),
        ],
      ),
    );
  }
}
