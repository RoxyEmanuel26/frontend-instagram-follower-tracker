import { api } from "./api";
import type {
    Analytics,
    Follower,
    InstagramAccount,
    Mutual,
} from "@/types";

export async function getConnectUrl() {
    const res = await api.get<{ url: string; state: string }>("/instagram/connect");
    return res.data!;
}

export async function getFollowers(cursor?: string, limit = 50) {
    const params = new URLSearchParams();
    if (cursor) params.set("cursor", cursor);
    params.set("limit", limit.toString());
    const res = await api.get<Follower[]>(`/instagram/followers?${params}`);
    return { data: res.data!, meta: res.meta };
}

export async function getMutuals(cursor?: string, limit = 50) {
    const params = new URLSearchParams();
    if (cursor) params.set("cursor", cursor);
    params.set("limit", limit.toString());
    const res = await api.get<Mutual[]>(`/instagram/mutuals?${params}`);
    return { data: res.data!, meta: res.meta };
}

export async function getAnalytics() {
    const res = await api.get<Analytics>("/instagram/analytics");
    return res.data!;
}

export async function triggerSync() {
    const res = await api.post<{ message: string; jobId: string }>("/instagram/sync");
    return res.data!;
}

export async function disconnectInstagram() {
    const res = await api.delete<{ message: string }>("/instagram/disconnect");
    return res.data!;
}

export async function getInstagramAccount() {
    // Via analytics which includes account info
    const analytics = await getAnalytics();
    return analytics.instagramAccount;
}
