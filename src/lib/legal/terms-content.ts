import type { LegalPageData } from "./types";

export const termsContent: LegalPageData = {
    title: "Syarat dan Ketentuan",
    description:
        "Syarat dan ketentuan penggunaan layanan FollowTracker.",
    lastUpdated: "22 Februari 2026",
    effectiveDate: "22 Februari 2026",
    sections: [
        {
            id: "penerimaan-syarat",
            title: "1. Penerimaan Syarat",
            content: [
                "Dengan mengakses dan menggunakan layanan FollowTracker (https://frontend-instagram-follower-tracker.vercel.app), Anda menyetujui Syarat dan Ketentuan ini. Jika Anda tidak setuju, mohon hentikan penggunaan layanan.",
                "Usia minimum: 13 tahun (mengikuti kebijakan Instagram/Meta).",
            ],
        },
        {
            id: "deskripsi-layanan",
            title: "2. Deskripsi Layanan",
            content: [
                "FollowTracker adalah platform web yang menyediakan:",
            ],
            subsections: [
                {
                    id: "fitur-layanan",
                    title: "Fitur Utama",
                    items: [
                        "Pelacakan followers Instagram secara real-time",
                        "Deteksi mutual followers",
                        "Analytics pertumbuhan followers dengan grafik interaktif",
                        "Auto-sync otomatis (harian untuk Free, per jam untuk Pro)",
                        "Export data followers (CSV/JSON) untuk pengguna Pro dan Enterprise",
                        "Unfollower alerts untuk pengguna Pro dan Enterprise",
                        "Multi-account management untuk pengguna Enterprise",
                    ],
                },
            ],
            highlight: {
                type: "warning",
                content:
                    "FollowTracker BUKAN afiliasi dari Meta Platforms, Inc. atau Instagram. Layanan memerlukan koneksi akun Instagram melalui Instagram OAuth.",
            },
        },
        {
            id: "paket-layanan",
            title: "3. Paket Layanan",
            content: [
                "FollowTracker menawarkan tiga paket layanan:",
            ],
            subsections: [
                {
                    id: "paket-free",
                    title: "Free ($0/bulan)",
                    items: [
                        "Hingga 1,000 followers",
                        "Sinkronisasi harian",
                        "Analitik dasar",
                        "Deteksi mutual",
                    ],
                },
                {
                    id: "paket-pro",
                    title: "Pro ($9/bulan)",
                    items: [
                        "Followers tidak terbatas",
                        "Sinkronisasi per jam",
                        "Analitik lanjutan",
                        "Export data (CSV/JSON)",
                        "Priority support",
                        "Unfollower alerts",
                    ],
                },
                {
                    id: "paket-enterprise",
                    title: "Enterprise ($29/bulan)",
                    items: [
                        "Semua fitur Pro",
                        "Multi-account",
                        "API access",
                        "Custom reports",
                        "Dedicated support",
                        "White-label option",
                    ],
                },
            ],
        },
        {
            id: "akun-pengguna",
            title: "4. Akun Pengguna",
            content: [
                "Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda. Setiap aktivitas yang dilakukan melalui akun Anda menjadi tanggung jawab Anda.",
            ],
            subsections: [
                {
                    id: "kewajiban-akun",
                    title: "Kewajiban Anda",
                    items: [
                        "Menjaga kerahasiaan password",
                        "Menggunakan password yang kuat (minimal 8 karakter, kombinasi huruf besar, kecil, angka, dan simbol)",
                        "Tidak berbagi akun dengan pihak lain",
                        "Segera melaporkan aktivitas mencurigakan ke support@followtracker.app",
                        "Memberikan informasi yang akurat saat registrasi",
                    ],
                },
            ],
        },
        {
            id: "penggunaan-yang-dilarang",
            title: "5. Penggunaan yang Dilarang",
            content: ["Anda dilarang menggunakan layanan untuk:"],
            subsections: [
                {
                    id: "larangan",
                    title: "Aktivitas yang Dilarang",
                    items: [
                        "Scraping atau mengambil data secara massal di luar fitur yang disediakan",
                        "Menjual kembali data yang diperoleh dari FollowTracker",
                        "Melanggar Terms of Service Instagram/Meta",
                        "Melakukan spam, harassment, atau aktivitas ilegal melalui data yang diperoleh",
                        "Mencoba meretas, reverse-engineer, atau mengganggu infrastruktur FollowTracker",
                        "Membuat akun palsu atau menggunakan identitas orang lain",
                        "Mengakses akun pengguna lain tanpa izin",
                    ],
                },
            ],
            highlight: {
                type: "danger",
                content:
                    "Pelanggaran terhadap ketentuan di atas dapat mengakibatkan penangguhan atau penghapusan akun secara permanen tanpa pemberitahuan.",
            },
        },
        {
            id: "hak-kekayaan-intelektual",
            title: "6. Hak Kekayaan Intelektual",
            content: [
                "Seluruh konten, desain, kode, dan fitur FollowTracker adalah milik Roxy Emanuel dan dilindungi oleh hukum hak cipta.",
                "Anda tidak diperkenankan menyalin, memodifikasi, mendistribusikan, atau membuat karya turunan dari layanan ini tanpa izin tertulis.",
                "Data followers Instagram Anda tetap menjadi milik Anda dan Instagram/Meta.",
            ],
        },
        {
            id: "pembatasan-tanggung-jawab",
            title: "7. Pembatasan Tanggung Jawab",
            content: [
                "FollowTracker disediakan 'sebagaimana adanya' (as-is) tanpa jaminan apapun.",
            ],
            subsections: [
                {
                    id: "tidak-bertanggung-jawab",
                    title: "Kami Tidak Bertanggung Jawab Atas",
                    items: [
                        "Perubahan API Instagram yang mempengaruhi fungsionalitas layanan",
                        "Ketidakakuratan data yang berasal dari Instagram API",
                        "Downtime atau gangguan layanan (meskipun kami berupaya menjaga uptime 99.9%)",
                        "Kerugian langsung atau tidak langsung akibat penggunaan layanan",
                        "Tindakan yang diambil Instagram/Meta terhadap akun Anda",
                    ],
                },
            ],
        },
        {
            id: "pembayaran",
            title: "8. Pembayaran dan Langganan",
            content: [
                "Paket berbayar (Pro dan Enterprise) ditagih secara bulanan. Anda dapat membatalkan langganan kapan saja — akses tetap berlaku sampai akhir periode billing.",
                "Harga dapat berubah dengan pemberitahuan 30 hari sebelumnya melalui email.",
                "Refund tersedia dalam 14 hari setelah pembayaran pertama jika tidak puas.",
            ],
        },
        {
            id: "penghentian-layanan",
            title: "9. Penghentian Layanan",
            content: [
                "Kami berhak menangguhkan atau menghentikan akun Anda jika terjadi pelanggaran terhadap Syarat dan Ketentuan ini.",
                "Anda dapat menutup akun kapan saja melalui Settings → Danger Zone → Delete Account.",
                "Setelah akun dihapus, semua data akan dihapus permanen dalam 30 hari.",
            ],
            highlight: {
                type: "info",
                content:
                    "Sebelum menghapus akun, Anda dapat mengexport data Anda terlebih dahulu melalui fitur Export (tersedia untuk pengguna Pro dan Enterprise).",
            },
        },
        {
            id: "hukum-yang-berlaku",
            title: "10. Hukum yang Berlaku",
            content: [
                "Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Segala sengketa akan diselesaikan melalui musyawarah terlebih dahulu. Jika tidak tercapai kesepakatan, sengketa akan diselesaikan melalui pengadilan yang berwenang di Indonesia.",
            ],
        },
        {
            id: "perubahan-syarat",
            title: "11. Perubahan Syarat dan Ketentuan",
            content: [
                "Kami berhak memperbarui Syarat dan Ketentuan ini. Perubahan material akan diinformasikan melalui email dan notifikasi dalam aplikasi minimal 14 hari sebelum berlaku.",
                "Penggunaan layanan setelah perubahan berlaku berarti Anda menyetujui syarat yang diperbarui.",
            ],
        },
        {
            id: "kontak",
            title: "12. Kontak",
            content: [
                "Email: support@followtracker.app",
                "Response time: 1-3 hari kerja",
                "Website: https://frontend-instagram-follower-tracker.vercel.app",
                "Untuk pertanyaan mengenai Syarat dan Ketentuan ini, silakan hubungi kami melalui email di atas.",
            ],
        },
    ],
};
