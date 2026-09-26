import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import '../models/models.dart';
import '../providers/app_providers.dart';
import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

const _categories = ['All', 'Urgent', 'Exam', 'Academic', 'Placement', 'Cultural'];

class NoticesScreen extends ConsumerWidget {
  const NoticesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedCat = ref.watch(selectedCategoryProvider);
    final notices = ref.watch(filteredNoticesProvider);

    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Notices & events', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 26)),
          const SizedBox(height: 4),
          const Text('Pushed instantly to every device via FCM.', style: TextStyle(color: AppColors.inkSoft, fontSize: 13.5)),
          const SizedBox(height: 16),

          // Filter chips + search
          Wrap(
            spacing: 8,
            runSpacing: 8,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              ..._categories.map((cat) {
                final selected = cat == selectedCat;
                return ChoiceChip(
                  label: Text(cat),
                  selected: selected,
                  onSelected: (_) => ref.read(selectedCategoryProvider.notifier).state = cat,
                );
              }),
              SizedBox(
                width: 220,
                child: TextField(
                  decoration: const InputDecoration(
                    hintText: 'Search notices…',
                    isDense: true,
                    prefixIcon: Icon(Icons.search, size: 18),
                  ),
                  onChanged: (v) => ref.read(noticeSearchProvider.notifier).state = v,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),

          Expanded(
            child: notices.isEmpty
                ? const EmptyNote(message: 'No notices match your filters')
                : ListView.builder(
                    itemCount: notices.length,
                    itemBuilder: (context, i) => _NoticeCard(notice: notices[i]),
                  ),
          ),
        ],
      ),
    );
  }
}

class _NoticeCard extends StatelessWidget {
  final Notice notice;
  const _NoticeCard({required this.notice});

  @override
  Widget build(BuildContext context) {
    final color = AppColors.forCategory(notice.category.label);
    final soft = AppColors.softForCategory(notice.category.label);
    return SpineCard(
      spineColor: color,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(notice.title, style: const TextStyle(fontFamily: 'Fraunces', fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.indigo)),
              ),
              Text(_relativeTime(notice.timestamp), style: const TextStyle(fontFamily: 'monospace', fontSize: 11, color: AppColors.inkSoft)),
            ],
          ),
          const SizedBox(height: 6),
          Text(notice.body, style: const TextStyle(fontSize: 13.5, color: AppColors.inkSoft, height: 1.5)),
          const SizedBox(height: 8),
          TagPill(text: '${notice.category.label.toUpperCase()} · ${notice.tag}', foreground: color, background: soft),
          if (notice.attachmentUrl != null) ...[
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.attach_file, size: 14, color: AppColors.indigo),
                const SizedBox(width: 4),
                Text(notice.attachmentUrl!, style: const TextStyle(fontSize: 12.5, color: AppColors.indigo, fontWeight: FontWeight.w600)),
              ],
            ),
          ],
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
