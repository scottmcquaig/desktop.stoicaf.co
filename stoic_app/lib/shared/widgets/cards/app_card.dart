import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_spacing.dart';

enum CardVariant { standard, elevated, flat, interactive }

/// Card component matching design specs
/// Source: /02-UI-UX-DESIGN/COMPONENT-SPECS.md
class AppCard extends StatefulWidget {
  final Widget child;
  final CardVariant variant;
  final VoidCallback? onTap;
  final EdgeInsets? padding;
  final BorderRadius? borderRadius;
  final Color? backgroundColor;

  const AppCard({
    super.key,
    required this.child,
    this.variant = CardVariant.standard,
    this.onTap,
    this.padding,
    this.borderRadius,
    this.backgroundColor,
  });

  @override
  State<AppCard> createState() => _AppCardState();
}

class _AppCardState extends State<AppCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;
    final bool isInteractive = widget.variant == CardVariant.interactive || widget.onTap != null;

    // Elevation and shadow configuration
    final double elevation;
    final BoxShadow? shadow;
    final Border? border;

    switch (widget.variant) {
      case CardVariant.elevated:
        elevation = 4;
        shadow = BoxShadow(
          color: Colors.black.withOpacity(0.12),
          blurRadius: 8,
          offset: const Offset(0, 4),
        );
        border = null;
        break;
      case CardVariant.flat:
        elevation = 0;
        shadow = null;
        border = Border.all(
          color: isDark ? AppColors.darkBorderDefault : AppColors.borderDefault,
          width: 1,
        );
        break;
      case CardVariant.interactive:
      case CardVariant.standard:
      default:
        elevation = 2;
        shadow = BoxShadow(
          color: Colors.black.withOpacity(0.08),
          blurRadius: 3,
          offset: const Offset(0, 1),
        );
        border = null;
    }

    // Interactive hover shadow
    final BoxShadow? hoverShadow = isInteractive && _isHovered
        ? BoxShadow(
            color: Colors.black.withOpacity(0.12),
            blurRadius: 8,
            offset: const Offset(0, 4),
          )
        : shadow;

    // Interactive hover border
    final Border? hoverBorder = isInteractive && _isHovered
        ? Border.all(
            color: isDark ? AppColors.darkBorderFocus : AppColors.borderFocus,
            width: 1,
          )
        : border;

    final Widget cardContent = Container(
      padding: widget.padding ?? const EdgeInsets.all(AppSpacing.space4),
      decoration: BoxDecoration(
        color: widget.backgroundColor ??
            (isDark ? AppColors.darkBackgroundSurface : AppColors.backgroundSurface),
        borderRadius: widget.borderRadius ?? BorderRadius.circular(AppRadius.lg),
        border: hoverBorder,
        boxShadow: widget.variant == CardVariant.flat ? null : [if (hoverShadow != null) hoverShadow],
      ),
      child: widget.child,
    );

    if (isInteractive) {
      return MouseRegion(
        onEnter: (_) => setState(() => _isHovered = true),
        onExit: (_) => setState(() => _isHovered = false),
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: widget.onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOut,
            transform: _isHovered ? (Matrix4.identity()..scale(0.98)) : Matrix4.identity(),
            child: cardContent,
          ),
        ),
      );
    }

    return cardContent;
  }
}
