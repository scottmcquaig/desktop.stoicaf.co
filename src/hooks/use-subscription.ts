'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useMemo } from 'react';

// Feature limits for each tier
export const FEATURE_LIMITS = {
  free: {
    entriesPerMonth: 10,
    aiInsightsPerMonth: 3,
    weeklyReflections: false,
    allPillarPrograms: false,
    exportData: false,
    prioritySupport: false,
  },
  pro: {
    entriesPerMonth: Infinity,
    aiInsightsPerMonth: Infinity,
    weeklyReflections: true,
    allPillarPrograms: true,
    exportData: true,
    prioritySupport: true,
  },
  workbook: {
    entriesPerMonth: Infinity,
    aiInsightsPerMonth: 10,
    weeklyReflections: true,
    allPillarPrograms: true,
    exportData: true,
    prioritySupport: false,
  },
} as const;

export type SubscriptionTier = keyof typeof FEATURE_LIMITS;
export type FeatureKey = keyof typeof FEATURE_LIMITS.free;

export interface SubscriptionInfo {
  tier: SubscriptionTier;
  isSubscribed: boolean;
  isPro: boolean;
  isTrialing: boolean;
  status: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

export interface UsageInfo {
  entriesThisMonth: number;
  aiInsightsThisMonth: number;
  usageResetDate: Date;
}

export interface FeatureAccess {
  canCreateEntry: boolean;
  canUseAiInsight: boolean;
  canUseWeeklyReflection: boolean;
  canAccessAllPrograms: boolean;
  canExportData: boolean;
  entriesRemaining: number | 'unlimited';
  aiInsightsRemaining: number | 'unlimited';
}

export function useSubscription() {
  const { userProfile } = useAuth();

  const subscriptionInfo = useMemo<SubscriptionInfo>(() => {
    const tier = userProfile?.subscriptionTier || 'free';
    const status = userProfile?.subscriptionStatus || 'none';
    const isActive = status === 'active' || status === 'trialing';

    return {
      tier: isActive ? tier : 'free',
      isSubscribed: isActive && tier !== 'free',
      isPro: isActive && tier === 'pro',
      isTrialing: status === 'trialing',
      status,
      currentPeriodEnd: userProfile?.subscriptionCurrentPeriodEnd
        ? new Date(userProfile.subscriptionCurrentPeriodEnd.seconds * 1000)
        : null,
      cancelAtPeriodEnd: userProfile?.subscriptionCancelAtPeriodEnd || false,
    };
  }, [userProfile]);

  const usageInfo = useMemo<UsageInfo>(() => {
    // Get current month's usage from profile
    const now = new Date();
    const usageMonth = userProfile?.usageMonth || '';
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // If usage month doesn't match current month, usage resets to 0
    const isCurrentMonth = usageMonth === currentMonth;

    return {
      entriesThisMonth: isCurrentMonth ? (userProfile?.entriesThisMonth || 0) : 0,
      aiInsightsThisMonth: isCurrentMonth ? (userProfile?.aiInsightsThisMonth || 0) : 0,
      usageResetDate: new Date(now.getFullYear(), now.getMonth() + 1, 1), // First of next month
    };
  }, [userProfile]);

  const featureAccess = useMemo<FeatureAccess>(() => {
    const limits = FEATURE_LIMITS[subscriptionInfo.tier];
    const { entriesThisMonth, aiInsightsThisMonth } = usageInfo;

    const entriesRemaining = limits.entriesPerMonth === Infinity
      ? 'unlimited'
      : Math.max(0, limits.entriesPerMonth - entriesThisMonth);

    const aiInsightsRemaining = limits.aiInsightsPerMonth === Infinity
      ? 'unlimited'
      : Math.max(0, limits.aiInsightsPerMonth - aiInsightsThisMonth);

    return {
      canCreateEntry: entriesRemaining === 'unlimited' || entriesRemaining > 0,
      canUseAiInsight: aiInsightsRemaining === 'unlimited' || aiInsightsRemaining > 0,
      canUseWeeklyReflection: limits.weeklyReflections,
      canAccessAllPrograms: limits.allPillarPrograms,
      canExportData: limits.exportData,
      entriesRemaining,
      aiInsightsRemaining,
    };
  }, [subscriptionInfo.tier, usageInfo]);

  // Helper to check if a specific feature is available
  const hasFeature = (feature: FeatureKey): boolean => {
    const limits = FEATURE_LIMITS[subscriptionInfo.tier];
    const value = limits[feature];
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value > 0;
    return false;
  };

  // Get limit for a specific feature
  const getLimit = (feature: FeatureKey): number | boolean => {
    return FEATURE_LIMITS[subscriptionInfo.tier][feature];
  };

  return {
    ...subscriptionInfo,
    usage: usageInfo,
    access: featureAccess,
    hasFeature,
    getLimit,
  };
}
