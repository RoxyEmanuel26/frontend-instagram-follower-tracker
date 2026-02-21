"use client";

import { LegalLayout } from "@/components/legal/LegalLayout";
import { termsContent } from "@/lib/legal/terms-content";

export default function TermsOfServicePage() {
    return <LegalLayout data={termsContent} currentPage="terms" />;
}
