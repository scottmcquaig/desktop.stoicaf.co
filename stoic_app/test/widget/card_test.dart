import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:stoic_app/shared/widgets/cards/app_card.dart';

void main() {
  group('AppCard Tests', () {
    testWidgets('renders child content', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: AppCard(
              child: Text('Card content'),
            ),
          ),
        ),
      );

      expect(find.text('Card content'), findsOneWidget);
    });

    testWidgets('calls onTap when tapped', (WidgetTester tester) async {
      bool tapped = false;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AppCard(
              onTap: () {
                tapped = true;
              },
              child: const Text('Card content'),
            ),
          ),
        ),
      );

      await tester.tap(find.text('Card content'));
      await tester.pump();

      expect(tapped, true);
    });

    testWidgets('does not respond to tap when onTap is null', (WidgetTester tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: AppCard(
              child: Text('Card content'),
            ),
          ),
        ),
      );

      // Should not throw error
      await tester.tap(find.text('Card content'));
      await tester.pump();
    });
  });
}
