import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Design tokens mirrored 1:1 from the web reference build so the Flutter
/// app and the website feel like the same product.
class AppColors {
  AppColors._();

  static const paper = Color(0xFFF7F5EF);
  static const paperRaised = Color(0xFFFFFFFF);
  static const ink = Color(0xFF26272B);
  static const inkSoft = Color(0xFF5B5D66);
  static const indigo = Color(0xFF1C2541);
  static const indigoSoft = Color(0xFF2E3A63);
  static const gold = Color(0xFFC97A2B);
  static const goldSoft = Color(0xFFF0DCC0);
  static const teal = Color(0xFF2F6E68);
  static const tealSoft = Color(0xFFDCEAE8);
  static const red = Color(0xFFB23A2E);
  static const redSoft = Color(0xFFF5DEDA);
  static const purple = Color(0xFF5B4B8A);
  static const purpleSoft = Color(0xFFE5DFF2);
  static const line = Color(0xFFE3DFD3);

  /// Category -> accent color, used for the left color-bar spine on
  /// notice and timetable cards (same pattern as the web build).
  static Color forCategory(String category) {
    switch (category) {
      case 'Urgent':
        return red;
      case 'Exam':
        return indigo;
      case 'Academic':
        return teal;
      case 'Cultural':
        return purple;
      case 'Placement':
        return gold;
      default:
        return inkSoft;
    }
  }

  static Color softForCategory(String category) {
    switch (category) {
      case 'Urgent':
        return redSoft;
      case 'Exam':
        return goldSoft;
      case 'Academic':
        return tealSoft;
      case 'Cultural':
        return purpleSoft;
      case 'Placement':
        return goldSoft;
      default:
        return line;
    }
  }
}

class AppTheme {
  AppTheme._();

  static TextTheme _textTheme(Brightness brightness) {
    final base = brightness == Brightness.light
        ? Typography.blackMountainView
        : Typography.whiteMountainView;

    // Fraunces carries headings (same as the web build's display font);
    // IBM Plex Sans carries body/UI text.
    final display = GoogleFonts.frauncesTextTheme(base);
    final body = GoogleFonts.ibmPlexSansTextTheme(base);

    return body.copyWith(
      displayLarge: display.displayLarge?.copyWith(fontWeight: FontWeight.w600),
      displayMedium: display.displayMedium?.copyWith(fontWeight: FontWeight.w600),
      displaySmall: display.displaySmall?.copyWith(fontWeight: FontWeight.w600),
      headlineLarge: display.headlineLarge?.copyWith(fontWeight: FontWeight.w600),
      headlineMedium: display.headlineMedium?.copyWith(fontWeight: FontWeight.w600),
      headlineSmall: display.headlineSmall?.copyWith(fontWeight: FontWeight.w600),
      titleLarge: display.titleLarge?.copyWith(fontWeight: FontWeight.w600),
      titleMedium: display.titleMedium?.copyWith(fontWeight: FontWeight.w600),
    );
  }

  static ThemeData light() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: AppColors.indigo,
      brightness: Brightness.light,
      primary: AppColors.indigo,
      secondary: AppColors.gold,
      surface: AppColors.paperRaised,
      error: AppColors.red,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: AppColors.paper,
      textTheme: _textTheme(Brightness.light).apply(
        bodyColor: AppColors.ink,
        displayColor: AppColors.indigo,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.indigo,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.fraunces(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
      ),
      navigationRailTheme: NavigationRailThemeData(
        backgroundColor: AppColors.indigo,
        selectedIconTheme: const IconThemeData(color: AppColors.gold),
        selectedLabelTextStyle: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
        unselectedIconTheme: const IconThemeData(color: Color(0xFFC9CADA)),
        unselectedLabelTextStyle: const TextStyle(color: Color(0xFFC9CADA)),
        indicatorColor: Colors.white.withOpacity(0.08),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: AppColors.indigo,
        indicatorColor: Colors.white.withOpacity(0.1),
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.w600,
            color: selected ? Colors.white : const Color(0xFFC9CADA),
          );
        }),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          final selected = states.contains(WidgetState.selected);
          return IconThemeData(color: selected ? AppColors.gold : const Color(0xFFC9CADA));
        }),
      ),
      cardTheme: CardThemeData(
        color: AppColors.paperRaised,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(color: AppColors.line),
        ),
        margin: EdgeInsets.zero,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.paper,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(4),
          borderSide: const BorderSide(color: AppColors.line),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(4),
          borderSide: const BorderSide(color: AppColors.line),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(4),
          borderSide: const BorderSide(color: AppColors.gold, width: 1.6),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.gold,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
        ),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.paperRaised,
        selectedColor: AppColors.indigo,
        side: const BorderSide(color: AppColors.line),
        labelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12.5, color: AppColors.inkSoft),
        secondaryLabelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12.5, color: Colors.white),
        shape: const StadiumBorder(),
      ),
      dividerTheme: const DividerThemeData(color: AppColors.line, thickness: 1),
    );
  }

  /// Dark theme keeps the same accent identity (gold/teal/red on indigo)
  /// but inverts the paper surface to a near-black, per Phase 1's
  /// dark/light theme requirement.
  static ThemeData dark() {
    const darkPaper = Color(0xFF14161F);
    const darkRaised = Color(0xFF1B1E2B);
    const darkLine = Color(0xFF2A2D3D);

    final colorScheme = ColorScheme.fromSeed(
      seedColor: AppColors.indigo,
      brightness: Brightness.dark,
      primary: AppColors.gold,
      secondary: AppColors.teal,
      surface: darkRaised,
      error: AppColors.red,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: colorScheme,
      scaffoldBackgroundColor: darkPaper,
      textTheme: _textTheme(Brightness.dark).apply(
        bodyColor: const Color(0xFFEDEBE2),
        displayColor: Colors.white,
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: darkRaised,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.fraunces(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: darkRaised,
        indicatorColor: Colors.white.withOpacity(0.1),
      ),
      cardTheme: CardThemeData(
        color: darkRaised,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(color: darkLine),
        ),
        margin: EdgeInsets.zero,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: darkPaper,
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(4),
          borderSide: const BorderSide(color: darkLine),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.gold,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
        ),
      ),
      dividerTheme: const DividerThemeData(color: darkLine, thickness: 1),
    );
  }
}
