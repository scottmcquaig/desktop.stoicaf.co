import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/theme/app_spacing.dart';

/// Text input component matching design specs
/// Source: /02-UI-UX-DESIGN/COMPONENT-SPECS.md
class AppTextField extends StatefulWidget {
  final String? label;
  final String? placeholder;
  final String? helperText;
  final String? errorText;
  final TextInputType keyboardType;
  final bool isPassword;
  final bool isDisabled;
  final IconData? leadingIcon;
  final IconData? trailingIcon;
  final VoidCallback? onTrailingIconPressed;
  final ValueChanged<String>? onChanged;
  final TextEditingController? controller;
  final int? maxLines;
  final int? minLines;
  final int? maxLength;
  final FocusNode? focusNode;

  const AppTextField({
    super.key,
    this.label,
    this.placeholder,
    this.helperText,
    this.errorText,
    this.keyboardType = TextInputType.text,
    this.isPassword = false,
    this.isDisabled = false,
    this.leadingIcon,
    this.trailingIcon,
    this.onTrailingIconPressed,
    this.onChanged,
    this.controller,
    this.maxLines = 1,
    this.minLines,
    this.maxLength,
    this.focusNode,
  });

  @override
  State<AppTextField> createState() => _AppTextFieldState();
}

class _AppTextFieldState extends State<AppTextField> {
  late bool _obscureText;
  late FocusNode _focusNode;
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _obscureText = widget.isPassword;
    _focusNode = widget.focusNode ?? FocusNode();
    _focusNode.addListener(_onFocusChange);
  }

  @override
  void dispose() {
    _focusNode.removeListener(_onFocusChange);
    if (widget.focusNode == null) {
      _focusNode.dispose();
    }
    super.dispose();
  }

  void _onFocusChange() {
    setState(() {
      _isFocused = _focusNode.hasFocus;
    });
  }

  void _togglePasswordVisibility() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;
    final hasError = widget.errorText != null && widget.errorText!.isNotEmpty;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null) ...[
          Text(
            widget.label!,
            style: AppTypography.labelMedium.copyWith(
              color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
            ),
          ),
          const SizedBox(height: AppSpacing.space2),
        ],
        TextField(
          controller: widget.controller,
          focusNode: _focusNode,
          enabled: !widget.isDisabled,
          obscureText: _obscureText,
          keyboardType: widget.keyboardType,
          maxLines: widget.isPassword ? 1 : widget.maxLines,
          minLines: widget.minLines,
          maxLength: widget.maxLength,
          onChanged: widget.onChanged,
          style: AppTypography.bodyMedium.copyWith(
            color: widget.isDisabled
                ? (isDark ? AppColors.darkTextDisabled : AppColors.textDisabled)
                : (isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
          ),
          decoration: InputDecoration(
            hintText: widget.placeholder,
            hintStyle: AppTypography.bodyMedium.copyWith(
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
            prefixIcon: widget.leadingIcon != null
                ? Icon(
                    widget.leadingIcon,
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                    size: AppSpacing.space5,
                  )
                : null,
            suffixIcon: widget.isPassword
                ? IconButton(
                    icon: Icon(
                      _obscureText ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                      color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                    ),
                    onPressed: _togglePasswordVisibility,
                  )
                : (widget.trailingIcon != null
                    ? IconButton(
                        icon: Icon(
                          widget.trailingIcon,
                          color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                        ),
                        onPressed: widget.onTrailingIconPressed,
                      )
                    : null),
            filled: false,
            fillColor: widget.isDisabled
                ? (isDark ? AppColors.darkBackgroundDisabled : AppColors.backgroundDisabled)
                : (isDark ? AppColors.darkBackgroundSurface : AppColors.backgroundSurface),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.space4,
              vertical: AppSpacing.space3,
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(AppRadius.md),
              borderSide: BorderSide(
                color: hasError
                    ? (isDark ? AppColors.darkBorderError : AppColors.borderError)
                    : (isDark ? AppColors.darkBorderDefault : AppColors.borderDefault),
                width: 1,
              ),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(AppRadius.md),
              borderSide: BorderSide(
                color: hasError
                    ? (isDark ? AppColors.darkBorderError : AppColors.borderError)
                    : (isDark ? AppColors.darkBorderDefault : AppColors.borderDefault),
                width: 1,
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(AppRadius.md),
              borderSide: BorderSide(
                color: hasError
                    ? (isDark ? AppColors.darkBorderError : AppColors.borderError)
                    : (isDark ? AppColors.darkBorderFocus : AppColors.borderFocus),
                width: 3,
              ),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(AppRadius.md),
              borderSide: BorderSide(
                color: isDark ? AppColors.darkBorderError : AppColors.borderError,
                width: 1,
              ),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(AppRadius.md),
              borderSide: BorderSide(
                color: isDark ? AppColors.darkBorderError : AppColors.borderError,
                width: 3,
              ),
            ),
          ),
        ),
        if (widget.errorText != null && widget.errorText!.isNotEmpty) ...[
          const SizedBox(height: AppSpacing.space1),
          Text(
            widget.errorText!,
            style: AppTypography.bodySmall.copyWith(
              color: isDark ? AppColors.darkBorderError : AppColors.error,
            ),
          ),
        ] else if (widget.helperText != null) ...[
          const SizedBox(height: AppSpacing.space1),
          Text(
            widget.helperText!,
            style: AppTypography.bodySmall.copyWith(
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
          ),
        ],
      ],
    );
  }
}
