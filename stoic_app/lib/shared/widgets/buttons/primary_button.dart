import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';

enum ButtonSize { small, medium, large }

enum ButtonVariant { primary, secondary, ghost, danger }

/// Primary button component matching design specs
/// Source: /02-UI-UX-DESIGN/COMPONENT-SPECS.md
class PrimaryButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final ButtonSize size;
  final ButtonVariant variant;
  final bool isLoading;
  final IconData? leadingIcon;
  final IconData? trailingIcon;
  final bool fullWidth;

  const PrimaryButton({
    super.key,
    required this.label,
    this.onPressed,
    this.size = ButtonSize.medium,
    this.variant = ButtonVariant.primary,
    this.isLoading = false,
    this.leadingIcon,
    this.trailingIcon,
    this.fullWidth = false,
  });

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;
    final isDisabled = onPressed == null;

    // Size configurations
    final double height;
    final EdgeInsets padding;
    final TextStyle textStyle;
    final double iconSize;

    switch (size) {
      case ButtonSize.small:
        height = 36;
        padding = const EdgeInsets.symmetric(
          horizontal: AppSpacing.space4,
          vertical: AppSpacing.space3,
        );
        textStyle = AppTypography.buttonSmall;
        iconSize = 16;
        break;
      case ButtonSize.large:
        height = 56;
        padding = const EdgeInsets.symmetric(
          horizontal: AppSpacing.space8,
          vertical: AppSpacing.space5,
        );
        textStyle = AppTypography.buttonLarge;
        iconSize = 24;
        break;
      case ButtonSize.medium:
      default:
        height = 48;
        padding = const EdgeInsets.symmetric(
          horizontal: AppSpacing.space6,
          vertical: AppSpacing.space4,
        );
        textStyle = AppTypography.buttonMedium;
        iconSize = 20;
    }

    // Variant configurations
    final Color backgroundColor;
    final Color foregroundColor;
    final BorderSide? borderSide;

    switch (variant) {
      case ButtonVariant.primary:
        backgroundColor = isDark ? AppColors.darkTextLink : AppColors.primary;
        foregroundColor = isDark ? AppColors.darkTextInverse : AppColors.textInverse;
        borderSide = null;
        break;
      case ButtonVariant.secondary:
        backgroundColor = Colors.transparent;
        foregroundColor = isDark ? AppColors.darkTextLink : AppColors.primary;
        borderSide = BorderSide(
          color: isDark ? AppColors.darkTextLink : AppColors.primary,
          width: 2,
        );
        break;
      case ButtonVariant.ghost:
        backgroundColor = Colors.transparent;
        foregroundColor = isDark ? AppColors.darkTextLink : AppColors.primary;
        borderSide = null;
        break;
      case ButtonVariant.danger:
        backgroundColor = AppColors.error;
        foregroundColor = AppColors.textInverse;
        borderSide = null;
    }

    Widget buttonChild = Row(
      mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (isLoading)
          SizedBox(
            width: iconSize,
            height: iconSize,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(foregroundColor),
            ),
          ),
        if (!isLoading && leadingIcon != null) ...[
          Icon(leadingIcon, size: iconSize, color: foregroundColor),
          const SizedBox(width: AppSpacing.space2),
        ],
        if (!isLoading)
          Text(
            label,
            style: textStyle.copyWith(color: foregroundColor),
          ),
        if (!isLoading && trailingIcon != null) ...[
          const SizedBox(width: AppSpacing.space2),
          Icon(trailingIcon, size: iconSize, color: foregroundColor),
        ],
      ],
    );

    if (variant == ButtonVariant.secondary) {
      return SizedBox(
        height: height,
        width: fullWidth ? double.infinity : null,
        child: OutlinedButton(
          onPressed: isLoading ? null : onPressed,
          style: OutlinedButton.styleFrom(
            backgroundColor: backgroundColor,
            foregroundColor: foregroundColor,
            disabledForegroundColor: isDark ? AppColors.darkTextDisabled : AppColors.textDisabled,
            side: borderSide,
            padding: padding,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppRadius.pill),
            ),
            minimumSize: Size(0, height),
          ),
          child: buttonChild,
        ),
      );
    } else if (variant == ButtonVariant.ghost) {
      return SizedBox(
        height: height,
        width: fullWidth ? double.infinity : null,
        child: TextButton(
          onPressed: isLoading ? null : onPressed,
          style: TextButton.styleFrom(
            backgroundColor: backgroundColor,
            foregroundColor: foregroundColor,
            disabledForegroundColor: isDark ? AppColors.darkTextDisabled : AppColors.textDisabled,
            padding: padding,
            minimumSize: Size(0, height),
          ),
          child: buttonChild,
        ),
      );
    } else {
      return SizedBox(
        height: height,
        width: fullWidth ? double.infinity : null,
        child: ElevatedButton(
          onPressed: isLoading ? null : onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: backgroundColor,
            foregroundColor: foregroundColor,
            disabledBackgroundColor: isDark
                ? AppColors.darkBackgroundDisabled
                : AppColors.backgroundDisabled,
            disabledForegroundColor: isDark
                ? AppColors.darkTextDisabled
                : AppColors.textDisabled,
            elevation: 0,
            shadowColor: Colors.transparent,
            padding: padding,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppRadius.pill),
            ),
            minimumSize: Size(0, height),
          ),
          child: buttonChild,
        ),
      );
    }
  }
}
