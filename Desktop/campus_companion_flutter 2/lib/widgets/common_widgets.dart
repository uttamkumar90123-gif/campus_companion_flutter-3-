import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

/// A card with a colored left "spine" — the structural device used
/// throughout the app (instead of generic uniform rounded cards) so the
/// color itself encodes category/status information.
class SpineCard extends StatelessWidget {
  final Color spineColor;
  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;

  const SpineCard({
    super.key,
    required this.spineColor,
    required this.child,
    this.padding = const EdgeInsets.all(16),
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: theme.cardTheme.color,
        border: Border.all(color: AppColors.line),
        borderRadius: BorderRadius.circular(4),
      ),
      clipBehavior: Clip.antiAlias,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          child: IntrinsicHeight(
            child: Row(
              children: [
                Container(width: 4, color: spineColor),
                Expanded(child: Padding(padding: padding, child: child)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Small rounded pill used for notice categories and countdown tags.
class TagPill extends StatelessWidget {
  final String text;
  final Color foreground;
  final Color background;

  const TagPill({
    super.key,
    required this.text,
    required this.foreground,
    required this.background,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(color: background, borderRadius: BorderRadius.circular(20)),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 10.5,
          fontWeight: FontWeight.w700,
          letterSpacing: 0.3,
          color: foreground,
        ),
      ),
    );
  }
}

/// Section header used above panels ("Next up", "Latest notices", ...)
/// with an optional trailing "See all" action.
class SectionHeader extends StatelessWidget {
  final String title;
  final String? actionLabel;
  final VoidCallback? onAction;

  const SectionHeader({super.key, required this.title, this.actionLabel, this.onAction});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(2, 0, 2, 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontSize: 15)),
          if (actionLabel != null)
            TextButton(
              onPressed: onAction,
              style: TextButton.styleFrom(foregroundColor: AppColors.gold, padding: EdgeInsets.zero),
              child: Text(actionLabel!, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12.5)),
            ),
        ],
      ),
    );
  }
}

/// Empty-state placeholder — dashed border, matches the web reference.
class EmptyNote extends StatelessWidget {
  final String message;
  const EmptyNote({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 40),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.line, style: BorderStyle.solid),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(message, style: const TextStyle(color: AppColors.inkSoft, fontSize: 14)),
    );
  }
}
