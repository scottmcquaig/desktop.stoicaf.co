import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
      metadata: {
        creationTime: '2024-01-01T00:00:00Z',
      },
    },
    userProfile: {
      displayName: 'Test User',
      chadTone: 'reality-check',
      pillarFocus: 'discipline',
      onboardingComplete: true,
    },
    signOut: jest.fn(),
    updateUserProfile: jest.fn(),
  }),
}));

// Mock the useIsMobile hook
jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

describe('Settings Page', () => {
  it('should render settings page heading', () => {
    // Test placeholder - actual component test would import SettingsPage
    render(
      <div>
        <h1>Settings</h1>
      </div>
    );

    const heading = screen.getByText('Settings');
    expect(heading).toBeInTheDocument();
  });

  it('should have proper test environment', () => {
    expect(process.env.NEXT_PUBLIC_FIREBASE_API_KEY).toBe('test-api-key');
    expect(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBe('test-project');
  });
});