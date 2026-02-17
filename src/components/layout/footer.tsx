import Link from "next/link";
import { Instagram, Github, Twitter } from "lucide-react";

const footerLinks = {
    Product: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/faq" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
    ],
    Support: [
        { label: "Help Center", href: "/faq" },
        { label: "Contact Us", href: "mailto:support@followtracker.app" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-card/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-12 sm:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <Link href="/" className="flex items-center gap-2.5 mb-4">
                                <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">IG</span>
                                </div>
                                <span className="font-bold text-lg">FollowTracker</span>
                            </Link>
                            <p className="text-sm text-muted-foreground max-w-xs">
                                Track your Instagram followers, discover who unfollowed you, and analyze your growth with powerful analytics.
                            </p>
                            <div className="flex items-center gap-3 mt-4">
                                <a
                                    href="#"
                                    className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a
                                    href="#"
                                    className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <h3 className="font-semibold text-sm mb-4">{title}</h3>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} FollowTracker. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Built with ❤️ by Roxy Emanuel
                    </p>
                </div>
            </div>
        </footer>
    );
}
