export interface LegalSection {
    id: string;
    title: string;
    content: string[];
    subsections?: LegalSubsection[];
    highlight?: {
        type: "info" | "warning" | "success" | "danger";
        content: string;
    };
}

export interface LegalSubsection {
    id: string;
    title: string;
    items: string[];
}

export interface LegalPageData {
    title: string;
    description: string;
    lastUpdated: string;
    effectiveDate: string;
    sections: LegalSection[];
}
