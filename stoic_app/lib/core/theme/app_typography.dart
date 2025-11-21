import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

/// App typography based on design tokens
/// Source: /02-UI-UX-DESIGN/tokens-complete.json
class AppTypography {
  AppTypography._();

  // Font sizes
  static const double fontSizeXs = 12;
  static const double fontSizeSm = 14;
  static const double fontSizeBase = 16;
  static const double fontSizeMd = 16;
  static const double fontSizeLg = 18;
  static const double fontSizeXl = 20;
  static const double fontSize2Xl = 24;
  static const double fontSize3Xl = 28;
  static const double fontSize4Xl = 32;
  static const double fontSize5Xl = 40;

  // Font weights
  static const FontWeight regular = FontWeight.w400;
  static const FontWeight medium = FontWeight.w500;
  static const FontWeight semibold = FontWeight.w600;
  static const FontWeight bold = FontWeight.w700;

  // Line heights
  static const double lineHeightTight = 1.25;
  static const double lineHeightNormal = 1.5;
  static const double lineHeightRelaxed = 1.75;
  static const double lineHeightLoose = 2.0;

  // Letter spacing
  static const double letterSpacingTight = -0.5;
  static const double letterSpacingNormal = 0;
  static const double letterSpacingWide = 0.5;

  /// Get Inter font family (UI text)
  static TextStyle getInterStyle({
    double fontSize = fontSizeBase,
    FontWeight fontWeight = regular,
    Color color = AppColors.textPrimary,
    double? height,
    double? letterSpacing,
  }) {
    return GoogleFonts.inter(
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
      height: height,
      letterSpacing: letterSpacing,
    );
  }

  /// Get Playfair Display font family (quotes)
  static TextStyle getPlayfairStyle({
    double fontSize = fontSizeBase,
    FontWeight fontWeight = regular,
    Color color = AppColors.textPrimary,
    double? height,
    double? letterSpacing,
  }) {
    return GoogleFonts.playfairDisplay(
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
      height: height,
      letterSpacing: letterSpacing,
    );
  }

  // Light Theme Text Styles
  static TextStyle get h1 => getInterStyle(
        fontSize: fontSize5Xl,
        fontWeight: bold,
        height: lineHeightTight,
      );

  static TextStyle get h2 => getInterStyle(
        fontSize: fontSize4Xl,
        fontWeight: bold,
        height: lineHeightTight,
      );

  static TextStyle get h3 => getInterStyle(
        fontSize: fontSize3Xl,
        fontWeight: semibold,
        height: lineHeightTight,
      );

  static TextStyle get h4 => getInterStyle(
        fontSize: fontSize2Xl,
        fontWeight: semibold,
        height: lineHeightNormal,
      );

  static TextStyle get h5 => getInterStyle(
        fontSize: fontSizeXl,
        fontWeight: semibold,
        height: lineHeightNormal,
      );

  static TextStyle get h6 => getInterStyle(
        fontSize: fontSizeLg,
        fontWeight: semibold,
        height: lineHeightNormal,
      );

  static TextStyle get bodyLarge => getInterStyle(
        fontSize: fontSizeLg,
        fontWeight: regular,
        height: lineHeightRelaxed,
      );

  static TextStyle get bodyMedium => getInterStyle(
        fontSize: fontSizeBase,
        fontWeight: regular,
        height: lineHeightNormal,
      );

  static TextStyle get bodySmall => getInterStyle(
        fontSize: fontSizeSm,
        fontWeight: regular,
        height: lineHeightNormal,
      );

  static TextStyle get labelLarge => getInterStyle(
        fontSize: fontSizeBase,
        fontWeight: medium,
        height: lineHeightNormal,
      );

  static TextStyle get labelMedium => getInterStyle(
        fontSize: fontSizeSm,
        fontWeight: medium,
        height: lineHeightNormal,
      );

  static TextStyle get labelSmall => getInterStyle(
        fontSize: fontSizeXs,
        fontWeight: medium,
        height: lineHeightNormal,
      );

  static TextStyle get buttonLarge => getInterStyle(
        fontSize: fontSizeLg,
        fontWeight: medium,
        height: lineHeightNormal,
      );

  static TextStyle get buttonMedium => getInterStyle(
        fontSize: fontSizeBase,
        fontWeight: medium,
        height: lineHeightNormal,
      );

  static TextStyle get buttonSmall => getInterStyle(
        fontSize: fontSizeSm,
        fontWeight: medium,
        height: lineHeightNormal,
      );

  // Quote style using Playfair Display
  static TextStyle get quote => getPlayfairStyle(
        fontSize: fontSizeLg,
        fontWeight: regular,
        height: lineHeightRelaxed,
      );

  static TextStyle get quoteAuthor => getInterStyle(
        fontSize: fontSizeSm,
        fontWeight: medium,
        color: AppColors.textSecondary,
      );
}
