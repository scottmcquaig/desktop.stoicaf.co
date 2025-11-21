import 'package:flutter/material.dart';

/// App color palette based on design tokens
/// Source: /02-UI-UX-DESIGN/tokens-complete.json
class AppColors {
  AppColors._();

  // Brand Colors
  static const Color primary = Color(0xFF4B90C8);
  static const Color primaryHover = Color(0xFF3A7AAE);
  static const Color primaryPressed = Color(0xFF2D5F8A);
  static const Color primaryLight = Color(0xFFE0F2FE);
  static const Color primaryLighter = Color(0xFFF0F9FF);

  // Semantic Colors
  static const Color success = Color(0xFF10B981);
  static const Color successLight = Color(0xFFD1FAE5);
  static const Color successDark = Color(0xFF059669);

  static const Color warning = Color(0xFFF59E0B);
  static const Color warningLight = Color(0xFFFEF3C7);
  static const Color warningDark = Color(0xFFD97706);

  static const Color error = Color(0xFFEF4444);
  static const Color errorLight = Color(0xFFFEE2E2);
  static const Color errorDark = Color(0xFFDC2626);

  static const Color info = Color(0xFF3B82F6);
  static const Color infoLight = Color(0xFFDBEAFE);
  static const Color infoDark = Color(0xFF2563EB);

  // Pillar Colors
  static const Color money = Color(0xFF10B981);
  static const Color moneyLight = Color(0xFFD1FAE5);

  static const Color ego = Color(0xFF8B5CF6);
  static const Color egoLight = Color(0xFFEDE9FE);

  static const Color relationships = Color(0xFFEC4899);
  static const Color relationshipsLight = Color(0xFFFCE7F3);

  static const Color discipline = Color(0xFFF59E0B);
  static const Color disciplineLight = Color(0xFFFEF3C7);

  // Light Theme Colors
  static const Color textPrimary = Color(0xFF1E293B);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textTertiary = Color(0xFF94A3B8);
  static const Color textDisabled = Color(0xFFCBD5E1);
  static const Color textInverse = Color(0xFFFFFFFF);
  static const Color textLink = Color(0xFF4B90C8);
  static const Color textLinkHover = Color(0xFF3A7AAE);

  static const Color backgroundApp = Color(0xFFF8FAFC);
  static const Color backgroundSurface = Color(0xFFFFFFFF);
  static const Color backgroundSurfaceElevated = Color(0xFFFFFFFF);
  static const Color backgroundOverlay = Color(0x990F1729); // rgba(15, 23, 42, 0.6)
  static const Color backgroundDisabled = Color(0xFFF1F5F9);
  static const Color backgroundHover = Color(0xFFF8FAFC);
  static const Color backgroundPressed = Color(0xFFE2E8F0);

  static const Color borderDefault = Color(0xFFE2E8F0);
  static const Color borderLight = Color(0xFFF1F5F9);
  static const Color borderMedium = Color(0xFFCBD5E1);
  static const Color borderStrong = Color(0xFF94A3B8);
  static const Color borderFocus = Color(0xFF4B90C8);
  static const Color borderError = Color(0xFFEF4444);
  static const Color borderSuccess = Color(0xFF10B981);

  // Dark Theme Colors
  static const Color darkBackgroundApp = Color(0xFF0F172A);
  static const Color darkBackgroundSurface = Color(0xFF1E293B);
  static const Color darkBackgroundSurfaceElevated = Color(0xFF334155);
  static const Color darkBackgroundOverlay = Color(0xB3000000); // rgba(0, 0, 0, 0.7)
  static const Color darkBackgroundDisabled = Color(0xFF334155);
  static const Color darkBackgroundHover = Color(0xFF334155);
  static const Color darkBackgroundPressed = Color(0xFF475569);

  static const Color darkTextPrimary = Color(0xFFF1F5F9);
  static const Color darkTextSecondary = Color(0xFFCBD5E1);
  static const Color darkTextTertiary = Color(0xFF94A3B8);
  static const Color darkTextDisabled = Color(0xFF64748B);
  static const Color darkTextInverse = Color(0xFF0F172A);
  static const Color darkTextLink = Color(0xFF60A5FA);
  static const Color darkTextLinkHover = Color(0xFF93C5FD);

  static const Color darkBorderDefault = Color(0xFF334155);
  static const Color darkBorderLight = Color(0xFF1E293B);
  static const Color darkBorderMedium = Color(0xFF475569);
  static const Color darkBorderStrong = Color(0xFF64748B);
  static const Color darkBorderFocus = Color(0xFF60A5FA);
  static const Color darkBorderError = Color(0xFFF87171);
  static const Color darkBorderSuccess = Color(0xFF34D399);
}
