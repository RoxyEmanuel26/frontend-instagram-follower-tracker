"use client";

import { LegalLayout } from "@/components/legal/LegalLayout";
import { privacyContent } from "@/lib/legal/privacy-content";

export default function PrivacyPolicyPage() {
    return <LegalLayout data={privacyContent} currentPage="privacy" />;
}
