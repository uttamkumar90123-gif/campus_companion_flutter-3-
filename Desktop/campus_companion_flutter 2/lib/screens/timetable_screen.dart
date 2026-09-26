import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/mock_data.dart';
import '../models/models.dart';
import '../providers/app_providers.dart';
import '../theme/app_theme.dart';
import '../widgets/common_widgets.dart';

const _days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class TimetableScreen extends ConsumerWidget {
  const TimetableScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedDay = ref.watch(selectedDayProvider);
    final slots = ref.watch(timetableViewProvider);
    final isSearching = ref.watch(isTimetableSearchingProvider);

    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Timetable', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontSize: 26)),
          const SizedBox(height: 4),
          const Text('Cached on-device for instant, offline access.', style: TextStyle(color: AppColors.inkSoft, fontSize: 13.5)),
          const SizedBox(height: 16),

          // --- Search & filter ---
          const _TimetableSearchBar(),
          const SizedBox(height: 14),

          // Day tabs stay visible but are visually de-emphasized while a
          // search is active, since results span the whole week.
          IgnorePointer(
            ignoring: isSearching,
            child: Opacity(
              opacity: isSearching ? 0.35 : 1,
              child: SizedBox(
                height: 40,
                child: Row(
                  children: _days.map((day) {
                    final selected = day == selectedDay;
                    return Padding(
                      padding: const EdgeInsets.only(right: 4),
                      child: InkWell(
                        onTap: () => ref.read(selectedDayProvider.notifier).state = day,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          decoration: BoxDecoration(
                            border: Border(bottom: BorderSide(color: selected ? AppColors.gold : Colors.transparent, width: 2)),
                          ),
                          child: Text(
                            day,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 13.5,
                              color: selected ? AppColors.indigo : AppColors.inkSoft,
                            ),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
          ),
          const Divider(height: 1),
          const SizedBox(height: 16),

          if (isSearching)
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Text(
                '${slots.length} result${slots.length == 1 ? '' : 's'} across the week',
                style: const TextStyle(fontSize: 12.5, color: AppColors.inkSoft, fontWeight: FontWeight.w600),
              ),
            ),

          Expanded(
            child: slots.isEmpty
                ? EmptyNote(message: isSearching ? 'No classes match your search' : 'No classes scheduled for $selectedDay')
                : ListView.builder(
                    itemCount: slots.length,
                    itemBuilder: (context, i) {
                      final s = slots[i];
                      final isNow = !isSearching && selectedDay == 'Mon' && i == 0; // demo "now" marker
                      final showDayLabel = isSearching && (i == 0 || slots[i - 1].day != s.day);
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          if (showDayLabel)
                            Padding(
                              padding: EdgeInsets.only(top: i == 0 ? 0 : 6, bottom: 8),
                              child: Text(
                                s.day,
                                style: const TextStyle(fontFamily: 'Fraunces', fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.gold, letterSpacing: 0.4),
                              ),
                            ),
                          _TimetableSlotCard(slot: s, isNow: isNow),
                        ],
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

/// --- Search bar ---
/// Same visual language as the search fields on Notices/Faculty screens
/// (rounded pill, inline icon), plus a clear button that only appears
/// once there's text to clear.
class _TimetableSearchBar extends ConsumerStatefulWidget {
  const _TimetableSearchBar();

  @override
  ConsumerState<_TimetableSearchBar> createState() => _TimetableSearchBarState();
}

class _TimetableSearchBarState extends ConsumerState<_TimetableSearchBar> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: ref.read(timetableSearchProvider));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _clear() {
    _controller.clear();
    ref.read(timetableSearchProvider.notifier).state = '';
  }

  @override
  Widget build(BuildContext context) {
    final hasText = ref.watch(timetableSearchProvider).isNotEmpty;
    return TextField(
      controller: _controller,
      decoration: InputDecoration(
        hintText: 'Search by subject, faculty, or room…',
        prefixIcon: const Icon(Icons.search, size: 18),
        suffixIcon: hasText
            ? IconButton(
                icon: const Icon(Icons.close, size: 18),
                tooltip: 'Clear search',
                onPressed: _clear,
              )
            : null,
        isDense: true,
      ),
      onChanged: (v) => ref.read(timetableSearchProvider.notifier).state = v,
    );
  }
}

/// --- Slot card ---
/// Same SpineCard shell as before; adds a "View Location" action next to
/// the room, and turns the old static "REMINDER SET" tag into a live
/// button that opens the reminder-picker sheet.
class _TimetableSlotCard extends ConsumerWidget {
  final TimetableSlot slot;
  final bool isNow;

  const _TimetableSlotCard({required this.slot, required this.isNow});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reminderMap = ref.watch(reminderMapProvider);
    final reminder = reminderMap[slot.slotKey];
    final hasReminder = reminder != null;
    final spineColor = isNow ? AppColors.gold : (hasReminder ? AppColors.gold : AppColors.teal);

    return SpineCard(
      spineColor: spineColor,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 78,
            child: Text(
              '${slot.startTime}\n–${slot.endTime}',
              style: const TextStyle(fontFamily: 'monospace', fontSize: 12, color: AppColors.inkSoft, height: 1.3),
            ),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(slot.courseName, style: const TextStyle(fontFamily: 'Fraunces', fontSize: 16, color: AppColors.indigo, fontWeight: FontWeight.w600)),
                const SizedBox(height: 2),
                Wrap(
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    Text('${slot.room} · ${slot.instructor}', style: const TextStyle(fontSize: 12.5, color: AppColors.inkSoft)),
                    const SizedBox(width: 6),
                    _ViewLocationButton(room: slot.room),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              TagPill(text: slot.courseCode, foreground: AppColors.teal, background: AppColors.tealSoft),
              const SizedBox(height: 6),
              _ReminderButton(slot: slot, current: reminder),
            ],
          ),
        ],
      ),
    );
  }
}

/// --- "View Location" ---
class _ViewLocationButton extends StatelessWidget {
  final String room;
  const _ViewLocationButton({required this.room});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => _showLocationCard(context, room),
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.place_outlined, size: 13, color: AppColors.indigo),
            const SizedBox(width: 3),
            Text('View location', style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.w600, color: AppColors.indigo, decoration: TextDecoration.underline, decorationColor: AppColors.indigo.withOpacity(0.4))),
          ],
        ),
      ),
    );
  }

  void _showLocationCard(BuildContext context, String room) {
    // MockData.locationForRoom() is the single seam to swap for a real
    // campus-map / indoor-navigation lookup later.
    final location = MockData.locationForRoom(room);
    showDialog(
      context: context,
      barrierColor: AppColors.indigo.withOpacity(0.25),
      builder: (context) => Dialog(
        backgroundColor: Colors.transparent,
        insetPadding: const EdgeInsets.all(24),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 340),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.paperRaised,
              border: Border.all(color: AppColors.line),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.place, color: AppColors.gold, size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(room, style: const TextStyle(fontFamily: 'Fraunces', fontSize: 18, fontWeight: FontWeight.w600, color: AppColors.indigo)),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, size: 18),
                      onPressed: () => Navigator.of(context).pop(),
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                if (location == null)
                  const Text('Location details coming soon for this room.', style: TextStyle(color: AppColors.inkSoft, fontSize: 13.5))
                else ...[
                  _LocationRow(label: 'Building / Block', value: location.building),
                  const SizedBox(height: 10),
                  _LocationRow(label: 'Floor', value: location.floor),
                  const SizedBox(height: 10),
                  _LocationRow(label: 'Room', value: location.roomNumber),
                  const SizedBox(height: 16),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: AppColors.paper, border: Border.all(color: AppColors.line), borderRadius: BorderRadius.circular(3)),
                    child: Row(
                      children: [
                        const Icon(Icons.map_outlined, size: 16, color: AppColors.inkSoft),
                        const SizedBox(width: 8),
                        const Expanded(
                          child: Text('Campus map view coming soon', style: TextStyle(fontSize: 12, color: AppColors.inkSoft)),
                        ),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _LocationRow extends StatelessWidget {
  final String label;
  final String value;
  const _LocationRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 120,
          child: Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.inkSoft)),
        ),
        Expanded(
          child: Text(value, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600, color: AppColors.indigo)),
        ),
      ],
    );
  }
}

/// --- Reminder button ---
/// Replaces the old static "REMINDER SET" tag. Unset state shows an
/// outlined "Set reminder" pill; once a lead time is chosen it becomes a
/// filled gold pill showing the chosen offset, and can be re-tapped to
/// change or clear it.
class _ReminderButton extends ConsumerWidget {
  final TimetableSlot slot;
  final ReminderOption? current;

  const _ReminderButton({required this.slot, required this.current});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isSet = current != null;
    return InkWell(
      onTap: () => _openReminderSheet(context, ref),
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: isSet ? AppColors.gold : Colors.transparent,
          border: Border.all(color: isSet ? AppColors.gold : AppColors.line),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(isSet ? Icons.notifications_active : Icons.notifications_none, size: 12, color: isSet ? Colors.white : AppColors.inkSoft),
            const SizedBox(width: 4),
            Text(
              isSet ? current!.label.replaceAll(' before', '') : 'Set reminder',
              style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.w700, color: isSet ? Colors.white : AppColors.inkSoft, letterSpacing: 0.2),
            ),
          ],
        ),
      ),
    );
  }

  void _openReminderSheet(BuildContext context, WidgetRef ref) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: const EdgeInsets.fromLTRB(20, 12, 20, 24),
        decoration: const BoxDecoration(
          color: AppColors.paperRaised,
          borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(width: 36, height: 4, margin: const EdgeInsets.only(bottom: 16), decoration: BoxDecoration(color: AppColors.line, borderRadius: BorderRadius.circular(2))),
            ),
            Text('Remind me before ${slot.courseName}', style: const TextStyle(fontFamily: 'Fraunces', fontSize: 17, fontWeight: FontWeight.w600, color: AppColors.indigo)),
            const SizedBox(height: 2),
            Text('${slot.startTime} · ${slot.room}', style: const TextStyle(fontSize: 12.5, color: AppColors.inkSoft)),
            const SizedBox(height: 16),
            ...ReminderOption.values.map((opt) => _ReminderOptionTile(
                  slot: slot,
                  option: opt,
                  selected: current == opt,
                )),
            if (current != null) ...[
              const Divider(height: 24),
              InkWell(
                onTap: () {
                  final map = Map<String, ReminderOption?>.from(ref.read(reminderMapProvider));
                  map.remove(slot.slotKey);
                  ref.read(reminderMapProvider.notifier).state = map;
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Reminder removed for ${slot.courseName}.')),
                  );
                },
                child: const Padding(
                  padding: EdgeInsets.symmetric(vertical: 8),
                  child: Text('Remove reminder', style: TextStyle(color: AppColors.red, fontWeight: FontWeight.w600, fontSize: 13.5)),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _ReminderOptionTile extends ConsumerWidget {
  final TimetableSlot slot;
  final ReminderOption option;
  final bool selected;

  const _ReminderOptionTile({required this.slot, required this.option, required this.selected});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return InkWell(
      onTap: () {
        final map = Map<String, ReminderOption?>.from(ref.read(reminderMapProvider));
        map[slot.slotKey] = option;
        ref.read(reminderMapProvider.notifier).state = map;

        // --- Mock notification scheduling ---
        // Stand-in for a real flutter_local_notifications call, e.g.:
        //   flutterLocalNotificationsPlugin.zonedSchedule(
        //     slot.slotKey.hashCode,
        //     slot.courseName,
        //     '${slot.room} · starts in ${option.minutes} min',
        //     tz.TZDateTime.from(classStartTime.subtract(Duration(minutes: option.minutes)), tz.local),
        //     ...
        //   );
        // For now we just confirm the scheduling in a SnackBar so the
        // flow is fully demoable without a notifications backend.
        Navigator.of(context).pop();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Reminder set: ${option.label} for ${slot.courseName} (${slot.startTime}).')),
        );
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10),
        child: Row(
          children: [
            Icon(
              selected ? Icons.radio_button_checked : Icons.radio_button_off,
              size: 18,
              color: selected ? AppColors.gold : AppColors.inkSoft,
            ),
            const SizedBox(width: 12),
            Text(option.label, style: TextStyle(fontSize: 14.5, fontWeight: selected ? FontWeight.w600 : FontWeight.w400, color: AppColors.ink)),
          ],
        ),
      ),
    );
  }
}
