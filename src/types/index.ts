// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: ApiError;
    meta?: Record<string, unknown>;
}

export interface ApiError {
    code: string;
    message: string;
    details?: unknown;
}

// ==========================================
// User & Auth Types
// ==========================================

export interface User {
    id: string;
    email: string;
    isVerified: boolean;
    twoFactorEnabled: boolean;
    role: "USER" | "ADMIN";
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string;
    googleId?: string | null;
}

export interface Session {
    id: string;
    deviceInfo: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    expiresAt: string;
    createdAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken?: string;
    requires2FA?: boolean;
}

export interface RegisterResponse {
    message: string;
    userId: string;
}

// ==========================================
// Instagram Types
// ==========================================

export interface InstagramAccount {
    id: string;
    instagramId: string;
    username: string;
    profilePictureUrl: string | null;
    followersCount: number;
    followingCount: number;
    connectedAt: string;
    updatedAt: string;
}

export interface Follower {
    id: string;
    followerUsername: string;
    followerId: string;
    profilePictureUrl: string | null;
    cachedAt: string;
    isFollowingBack?: boolean;
}

export interface Mutual {
    id: string;
    mutualUsername: string;
    mutualId: string;
    cachedAt: string;
}

export interface FollowerSnapshot {
    id: string;
    followersCount: number;
    followingCount: number;
    newFollowers: number;
    unfollowers: number;
    snapshotDate: string;
}

export interface Analytics {
    currentFollowers: number;
    currentFollowing: number;
    totalMutuals: number;
    newFollowers7d: number;
    unfollowers7d: number;
    growthRate: number;
    snapshots: FollowerSnapshot[];
    instagramAccount: InstagramAccount | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total?: number;
        cursor?: string;
        hasMore?: boolean;
    };
}

// ==========================================
// UI Types
// ==========================================

export type Theme = "light" | "dark" | "system";

export interface NavItem {
    label: string;
    href: string;
    icon?: string;
    badge?: number;
}
