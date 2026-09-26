import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/app_providers.dart';
import '../theme/app_theme.dart';
import 'assignments_screen.dart';
import 'dashboard_screen.dart';
import 'faculty_screen.dart';
import 'notices_screen.dart';
import 'timetable_screen.dart';

/// Wide-vs-narrow breakpoint. Above this, a left NavigationRail is shown
/// (matching the web reference's sidebar); below it, a bottom NavigationBar
/// is used instead — mirroring the roadmap's "responsive layouts" phase.
const _wideBreakpoint = 820.0;

class AppShell extends ConsumerWidget {
  const AppShell({super.key});

  static const _destinations = [
    (icon: Icons.dashboard_outlined, selectedIcon: Icons.dashboard, label: 'Dashboard'),
    (icon: Icons.calendar_today_outlined, selectedIcon: Icons.calendar_today, label: 'Timetable'),
    (icon: Icons.campaign_outlined, selectedIcon: Icons.campaign, label: 'Notices'),
    (icon: Icons.groups_outlined, selectedIcon: Icons.groups, label: 'Faculty'),
    (icon: Icons.assignment_outlined, selectedIcon: Icons.assignment, label: 'Assignments'),
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = ref.watch(navIndexProvider);
    final user = ref.watch(currentUserProvider);

    final pages = [
      DashboardScreen(
        onSeeTimetable: () => ref.read(navIndexProvider.notifier).state = 1,
        onSeeNotices: () => ref.read(navIndexProvider.notifier).state = 2,
      ),
      const TimetableScreen(),
      const NoticesScreen(),
      const FacultyScreen(),
      const AssignmentsScreen(),
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth >= _wideBreakpoint;

        if (isWide) {
          return Scaffold(
            body: Row(
              children: [
                Container(
                  width: 220,
                  color: AppColors.indigo,
                  child: SafeArea(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(18, 12, 18, 18),
                          child: Row(
                            children: [
                              const Text('CC', style: TextStyle(fontFamily: 'Fraunces', fontWeight: FontWeight.w700, fontSize: 22, color: AppColors.gold)),
                              const SizedBox(width: 8),
                              const Expanded(
                                child: Text('Campus\nCompanion', style: TextStyle(fontFamily: 'Fraunces', fontSize: 14, color: Color(0xFFEDEBE2), height: 1.15)),
                              ),
                            ],
                          ),
                        ),
                        const Divider(color: Color(0x22FFFFFF), height: 1),
                        const SizedBox(height: 10),
                        for (var i = 0; i < _destinations.length; i++) _RailItem(index: i, selected: index == i),
                        const Spacer(),
                        const Divider(color: Color(0x22FFFFFF), height: 1),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(18, 12, 18, 18),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(user?.rollOrId ?? '—', style: const TextStyle(color: Color(0xFFEDEBE2), fontWeight: FontWeight.w600, fontSize: 13)),
                              Text(user?.role.label ?? '—', style: const TextStyle(color: Color(0xFF9497AC), fontSize: 12)),
                              const SizedBox(height: 10),
                              OutlinedButton(
                                onPressed: () => ref.read(currentUserProvider.notifier).state = null,
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: const Color(0xFFC9CADA),
                                  side: const BorderSide(color: Color(0x33FFFFFF)),
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
                                ),
                                child: const Text('Sign out', style: TextStyle(fontSize: 12.5)),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(child: pages[index]),
              ],
            ),
          );
        }

        // Narrow layout: bottom navigation bar.
        return Scaffold(
          appBar: AppBar(
            title: Row(
              children: const [
                Text('CC', style: TextStyle(fontFamily: 'Fraunces', fontWeight: FontWeight.w700, color: AppColors.gold, fontSize: 14)),
                SizedBox(width: 8),
                Text('Campus Companion', style: TextStyle(fontFamily: 'Fraunces', fontSize: 16)),
              ],
            ),
          ),
          body: pages[index],
          bottomNavigationBar: NavigationBar(
            selectedIndex: index,
            onDestinationSelected: (i) => ref.read(navIndexProvider.notifier).state = i,
            destinations: _destinations
                .map((d) => NavigationDestination(icon: Icon(d.icon), selectedIcon: Icon(d.selectedIcon), label: d.label))
                .toList(),
          ),
        );
      },
    );
  }
}

class _RailItem extends ConsumerWidget {
  final int index;
  final bool selected;
  const _RailItem({required this.index, required this.selected});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final d = AppShell._destinations[index];
    return InkWell(
      onTap: () => ref.read(navIndexProvider.notifier).state = index,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        decoration: BoxDecoration(
          color: selected ? Colors.white.withOpacity(0.08) : Colors.transparent,
          border: Border(left: BorderSide(color: selected ? AppColors.gold : Colors.transparent, width: 3)),
        ),
        child: Row(
          children: [
            Icon(selected ? d.selectedIcon : d.icon, size: 18, color: selected ? Colors.white : const Color(0xFFC9CADA)),
            const SizedBox(width: 11),
            Text(d.label, style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.w500, color: selected ? Colors.white : const Color(0xFFC9CADA))),
          ],
        ),
      ),
    );
  }
}
