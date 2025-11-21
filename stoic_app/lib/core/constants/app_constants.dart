/// App-wide constants
class AppConstants {
  AppConstants._();

  // App info
  static const String appName = 'Stoic.af';
  static const String appVersion = '1.0.0';

  // Animation durations (milliseconds)
  static const int animationDurationInstant = 100;
  static const int animationDurationFast = 200;
  static const int animationDurationNormal = 300;
  static const int animationDurationSlow = 400;
  static const int animationDurationSlower = 500;

  // Pillars
  static const String pillarMoney = 'money';
  static const String pillarEgo = 'ego';
  static const String pillarRelationships = 'relationships';
  static const String pillarDiscipline = 'discipline';

  // Safe area insets (iPhone notch/home indicator)
  static const double safeAreaTop = 47;
  static const double safeAreaBottom = 34;

  // Accessibility
  static const double minContrastRatio = 4.5; // WCAG AA
}
