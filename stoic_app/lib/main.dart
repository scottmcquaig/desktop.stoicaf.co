import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'core/theme/app_colors.dart';
import 'core/theme/app_typography.dart';
import 'core/theme/app_spacing.dart';
import 'shared/widgets/buttons/primary_button.dart';
import 'shared/widgets/inputs/app_text_field.dart';
import 'shared/widgets/cards/app_card.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void _toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stoic.af Component Showcase',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: _themeMode,
      home: ComponentShowcase(onToggleTheme: _toggleTheme),
    );
  }
}

class ComponentShowcase extends StatefulWidget {
  final VoidCallback onToggleTheme;

  const ComponentShowcase({super.key, required this.onToggleTheme});

  @override
  State<ComponentShowcase> createState() => _ComponentShowcaseState();
}

class _ComponentShowcaseState extends State<ComponentShowcase> {
  final _textController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Component Showcase'),
        actions: [
          IconButton(
            icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: widget.onToggleTheme,
            tooltip: 'Toggle theme',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.space6),
        children: [
          // Typography Section
          _buildSection(
            title: 'Typography',
            children: [
              Text('Heading 1', style: AppTypography.h1),
              const SizedBox(height: AppSpacing.space2),
              Text('Heading 2', style: AppTypography.h2),
              const SizedBox(height: AppSpacing.space2),
              Text('Heading 3', style: AppTypography.h3),
              const SizedBox(height: AppSpacing.space2),
              Text('Heading 4', style: AppTypography.h4),
              const SizedBox(height: AppSpacing.space2),
              Text('Heading 5', style: AppTypography.h5),
              const SizedBox(height: AppSpacing.space2),
              Text('Heading 6', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              Text('Body Large', style: AppTypography.bodyLarge),
              const SizedBox(height: AppSpacing.space2),
              Text('Body Medium', style: AppTypography.bodyMedium),
              const SizedBox(height: AppSpacing.space2),
              Text('Body Small', style: AppTypography.bodySmall),
              const SizedBox(height: AppSpacing.space4),
              Text(
                '"The happiness of your life depends upon the quality of your thoughts."',
                style: AppTypography.quote,
              ),
              const SizedBox(height: AppSpacing.space2),
              Text('— Marcus Aurelius', style: AppTypography.quoteAuthor),
            ],
          ),

          const SizedBox(height: AppSpacing.space8),

          // Color Palette Section
          _buildSection(
            title: 'Color Palette',
            children: [
              _buildColorRow('Primary', AppColors.primary),
              _buildColorRow('Success', AppColors.success),
              _buildColorRow('Warning', AppColors.warning),
              _buildColorRow('Error', AppColors.error),
              _buildColorRow('Info', AppColors.info),
              const SizedBox(height: AppSpacing.space4),
              Text('Pillar Colors', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space2),
              _buildColorRow('Money', AppColors.money),
              _buildColorRow('Ego', AppColors.ego),
              _buildColorRow('Relationships', AppColors.relationships),
              _buildColorRow('Discipline', AppColors.discipline),
            ],
          ),

          const SizedBox(height: AppSpacing.space8),

          // Buttons Section
          _buildSection(
            title: 'Buttons',
            children: [
              Text('Primary Buttons', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              PrimaryButton(
                label: 'Large Primary',
                size: ButtonSize.large,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              PrimaryButton(
                label: 'Medium Primary',
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              PrimaryButton(
                label: 'Small Primary',
                size: ButtonSize.small,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              PrimaryButton(
                label: 'With Leading Icon',
                leadingIcon: Icons.save,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              PrimaryButton(
                label: 'With Trailing Icon',
                trailingIcon: Icons.arrow_forward,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              PrimaryButton(
                label: 'Loading',
                isLoading: true,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              const PrimaryButton(
                label: 'Disabled',
                onPressed: null,
              ),
              const SizedBox(height: AppSpacing.space3),
              PrimaryButton(
                label: 'Full Width',
                fullWidth: true,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space6),
              Text('Secondary Buttons', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              PrimaryButton(
                label: 'Secondary',
                variant: ButtonVariant.secondary,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              const PrimaryButton(
                label: 'Secondary Disabled',
                variant: ButtonVariant.secondary,
                onPressed: null,
              ),
              const SizedBox(height: AppSpacing.space6),
              Text('Ghost Buttons', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              PrimaryButton(
                label: 'Ghost',
                variant: ButtonVariant.ghost,
                onPressed: () {},
              ),
              const SizedBox(height: AppSpacing.space3),
              const PrimaryButton(
                label: 'Ghost Disabled',
                variant: ButtonVariant.ghost,
                onPressed: null,
              ),
              const SizedBox(height: AppSpacing.space6),
              Text('Danger Buttons', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              PrimaryButton(
                label: 'Delete Entry',
                variant: ButtonVariant.danger,
                leadingIcon: Icons.delete,
                onPressed: () {},
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.space8),

          // Inputs Section
          _buildSection(
            title: 'Text Inputs',
            children: [
              AppTextField(
                label: 'Email Address',
                placeholder: 'you@example.com',
                keyboardType: TextInputType.emailAddress,
                leadingIcon: Icons.email,
              ),
              const SizedBox(height: AppSpacing.space4),
              AppTextField(
                label: 'Password',
                placeholder: 'Enter your password',
                isPassword: true,
                leadingIcon: Icons.lock,
              ),
              const SizedBox(height: AppSpacing.space4),
              AppTextField(
                label: 'Name',
                placeholder: 'Your name',
                helperText: 'Enter your full name',
              ),
              const SizedBox(height: AppSpacing.space4),
              const AppTextField(
                label: 'Email with Error',
                errorText: 'Please enter a valid email address',
              ),
              const SizedBox(height: AppSpacing.space4),
              const AppTextField(
                label: 'Disabled Input',
                placeholder: 'This is disabled',
                isDisabled: true,
              ),
              const SizedBox(height: AppSpacing.space4),
              AppTextField(
                label: 'Journal Entry',
                placeholder: 'Write your thoughts...',
                maxLines: 5,
                minLines: 3,
                controller: _textController,
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.space8),

          // Cards Section
          _buildSection(
            title: 'Cards',
            children: [
              Text('Standard Card', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              AppCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Card Title', style: AppTypography.h5),
                    const SizedBox(height: AppSpacing.space2),
                    Text(
                      'This is a standard card with default elevation and styling.',
                      style: AppTypography.bodyMedium,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.space4),
              Text('Elevated Card', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              AppCard(
                variant: CardVariant.elevated,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Elevated Card', style: AppTypography.h5),
                    const SizedBox(height: AppSpacing.space2),
                    Text(
                      'This card has higher elevation and stronger shadow.',
                      style: AppTypography.bodyMedium,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.space4),
              Text('Flat Card', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              AppCard(
                variant: CardVariant.flat,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Flat Card', style: AppTypography.h5),
                    const SizedBox(height: AppSpacing.space2),
                    Text(
                      'This card has no shadow, only a border.',
                      style: AppTypography.bodyMedium,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.space4),
              Text('Interactive Card', style: AppTypography.h6),
              const SizedBox(height: AppSpacing.space4),
              AppCard(
                variant: CardVariant.interactive,
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Card tapped!')),
                  );
                },
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Interactive Card', style: AppTypography.h5),
                    const SizedBox(height: AppSpacing.space2),
                    Text(
                      'This card is clickable and shows hover states (on desktop).',
                      style: AppTypography.bodyMedium,
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: AppSpacing.space8),

          // Spacing Scale Section
          _buildSection(
            title: 'Spacing Scale',
            children: [
              _buildSpacingDemo('Space 1 (4px)', AppSpacing.space1),
              _buildSpacingDemo('Space 2 (8px)', AppSpacing.space2),
              _buildSpacingDemo('Space 3 (12px)', AppSpacing.space3),
              _buildSpacingDemo('Space 4 (16px)', AppSpacing.space4),
              _buildSpacingDemo('Space 5 (20px)', AppSpacing.space5),
              _buildSpacingDemo('Space 6 (24px)', AppSpacing.space6),
              _buildSpacingDemo('Space 8 (32px)', AppSpacing.space8),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSection({required String title, required List<Widget> children}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: AppTypography.h3),
        const SizedBox(height: AppSpacing.space4),
        ...children,
      ],
    );
  }

  Widget _buildColorRow(String name, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.space2),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(AppRadius.sm),
              border: Border.all(
                color: Theme.of(context).brightness == Brightness.dark
                    ? AppColors.darkBorderDefault
                    : AppColors.borderDefault,
              ),
            ),
          ),
          const SizedBox(width: AppSpacing.space3),
          Expanded(
            child: Text(
              name,
              style: AppTypography.bodyMedium,
            ),
          ),
          Text(
            '#${color.value.toRadixString(16).substring(2).toUpperCase()}',
            style: AppTypography.bodySmall.copyWith(
              fontFamily: 'monospace',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSpacingDemo(String label, double spacing) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.space3),
      child: Row(
        children: [
          Container(
            width: spacing,
            height: 24,
            color: AppColors.primary,
          ),
          const SizedBox(width: AppSpacing.space3),
          Text(label, style: AppTypography.bodyMedium),
        ],
      ),
    );
  }
}
