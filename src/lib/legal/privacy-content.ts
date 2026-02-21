import type { LegalPageData } from "./types";

export const privacyContent: LegalPageData = {
    title: "Kebijakan Privasi",
    description:
        "Kebijakan privasi FollowTracker — Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
    lastUpdated: "22 Februari 2026",
    effectiveDate: "22 Februari 2026",
    sections: [
        {
            id: "pendahuluan",
            title: "1. Pendahuluan",
            content: [
                "FollowTracker adalah platform web yang membantu pengguna menganalisis followers Instagram mereka. Kami berkomitmen untuk melindungi privasi Anda.",
                "Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan layanan FollowTracker di https://frontend-instagram-follower-tracker.vercel.app.",
            ],
        },
        {
            id: "informasi-yang-kami-kumpulkan",
            title: "2. Informasi yang Kami Kumpulkan",
            content: [
                "Kami mengumpulkan beberapa jenis informasi untuk menyediakan dan meningkatkan layanan kami kepada Anda.",
            ],
            subsections: [
                {
                    id: "data-langsung",
                    title: "2.1 Data yang Anda Berikan Langsung",
                    items: [
                        "Nama lengkap (saat registrasi)",
                        "Alamat email (untuk login dan verifikasi akun)",
                        "Password (disimpan dalam bentuk hash terenkripsi menggunakan bcrypt, TIDAK PERNAH dalam bentuk teks biasa)",
                        "Foto profil (opsional)",
                    ],
                },
                {
                    id: "data-instagram",
                    title: "2.2 Data dari Integrasi Instagram",
                    items: [
                        "Username Instagram",
                        "Instagram User ID",
                        "Daftar followers dan following (untuk fitur mutual detection dan analytics)",
                        "Jumlah followers dan following",
                        "Foto profil Instagram",
                        "Data ini hanya diakses setelah Anda memberikan izin eksplisit melalui Instagram OAuth",
                    ],
                },
                {
                    id: "data-google",
                    title: "2.3 Data dari Google OAuth (jika login dengan Google)",
                    items: [
                        "Nama Google Account",
                        "Email Google",
                        "Foto profil Google",
                        "Google User ID",
                    ],
                },
                {
                    id: "data-otomatis",
                    title: "2.4 Data yang Dikumpulkan Otomatis",
                    items: [
                        "Alamat IP (untuk keamanan dan pencegahan fraud)",
                        "Tipe dan versi browser",
                        "Sistem operasi perangkat",
                        "Halaman yang dikunjungi dan durasi kunjungan",
                        "Timestamp aktivitas login",
                        "Informasi sesi",
                    ],
                },
            ],
        },
        {
            id: "penggunaan-data",
            title: "3. Bagaimana Kami Menggunakan Data Anda",
            content: [
                "Autentikasi dan pengelolaan akun Anda",
                "Menampilkan daftar followers dan mutual followers Instagram",
                "Tracking pertumbuhan followers (Analytics Dashboard)",
                "Mengirim email verifikasi akun (wajib saat registrasi dengan email)",
                "Notifikasi keamanan (login baru, perubahan password)",
                "Unfollower alerts (khusus pengguna Pro dan Enterprise)",
                "Export data CSV/JSON (khusus pengguna Pro dan Enterprise)",
                "Meningkatkan performa dan fitur layanan",
                "Mencegah fraud dan penyalahgunaan platform",
            ],
            highlight: {
                type: "success",
                content:
                    "KAMI TIDAK PERNAH: Menjual data Anda ke pihak ketiga • Menggunakan data Anda untuk iklan pihak ketiga • Membaca konten pesan/DM Instagram Anda • Memposting apapun ke akun Instagram Anda",
            },
        },
        {
            id: "penyimpanan-keamanan",
            title: "4. Penyimpanan dan Keamanan Data",
            content: [
                "Password dienkripsi dengan bcrypt (one-way hash, tidak dapat di-decode)",
                "Instagram access tokens dienkripsi dengan AES-256",
                "Koneksi menggunakan HTTPS dengan HSTS",
                "Database dilindungi dengan SSL/TLS",
                "Cache data followers otomatis terhapus setelah 24 jam (Free) atau 1 jam (Pro/Enterprise)",
                "Anda dapat meminta penghapusan semua data kapan saja",
            ],
            highlight: {
                type: "info",
                content:
                    "Semua data sensitif dienkripsi baik saat transit (HTTPS/TLS) maupun saat disimpan (AES-256/bcrypt).",
            },
        },
        {
            id: "pihak-ketiga",
            title: "5. Berbagi Data dengan Pihak Ketiga",
            content: [
                "Kami menggunakan layanan pihak ketiga berikut:",
            ],
            subsections: [
                {
                    id: "layanan-pihak-ketiga",
                    title: "Layanan yang Digunakan",
                    items: [
                        "Google OAuth: untuk autentikasi — berlaku Google Privacy Policy",
                        "Meta/Instagram API: untuk mengambil data followers — berlaku Meta Privacy Policy",
                        "Vercel: hosting frontend — server berlokasi di Amerika Serikat",
                        "Layanan email (untuk verifikasi dan notifikasi)",
                        "Sentry: error tracking (hanya data teknis, bukan data personal)",
                    ],
                },
            ],
            highlight: {
                type: "warning",
                content:
                    "Data TIDAK akan dibagikan kecuali diwajibkan oleh hukum yang berlaku.",
            },
        },
        {
            id: "cookies",
            title: "6. Cookies",
            content: [
                "Session cookies: untuk menjaga status login",
                "Refresh token cookies (HttpOnly, Secure, SameSite=Strict)",
                "CSRF protection cookies",
                "TIDAK menggunakan tracking cookies atau analytics pihak ketiga",
            ],
        },
        {
            id: "hak-pengguna",
            title: "7. Hak-Hak Pengguna",
            content: ["Anda berhak untuk:"],
            subsections: [
                {
                    id: "daftar-hak",
                    title: "Hak Anda",
                    items: [
                        "Mengakses dan mengunduh data pribadi Anda",
                        "Memperbaiki data yang tidak akurat",
                        "Menghapus akun dan semua data Anda (Settings → Account → Delete Account)",
                        "Membatalkan koneksi Instagram kapan saja (Settings → Instagram → Disconnect)",
                        "Mencabut izin Google OAuth kapan saja",
                    ],
                },
            ],
            highlight: {
                type: "info",
                content:
                    "Untuk menggunakan hak-hak ini, hubungi: support@followtracker.app — Response time: maksimal 30 hari kerja.",
            },
        },
        {
            id: "transfer-data",
            title: "8. Transfer Data Internasional",
            content: [
                "Server FollowTracker berlokasi di Amerika Serikat (Vercel). Data Anda mungkin diproses di luar Indonesia. Kami memastikan perlindungan data yang memadai sesuai regulasi yang berlaku.",
            ],
        },
        {
            id: "anak-anak",
            title: "9. Akun Anak-Anak",
            content: [
                "Layanan FollowTracker tidak ditujukan untuk pengguna di bawah 13 tahun, mengikuti kebijakan usia minimum Instagram. Jika kami mengetahui adanya data pengguna di bawah 13 tahun, data tersebut akan segera dihapus.",
            ],
            highlight: {
                type: "danger",
                content:
                    "Pengguna di bawah 13 tahun dilarang menggunakan layanan ini.",
            },
        },
        {
            id: "perubahan-kebijakan",
            title: "10. Perubahan Kebijakan",
            content: [
                "Kami akan memberikan notifikasi melalui email dan in-app notification untuk setiap perubahan material pada kebijakan ini. Penggunaan layanan setelah perubahan berlaku berarti Anda menyetujui kebijakan yang diperbarui.",
            ],
        },
        {
            id: "kontak",
            title: "11. Kontak",
            content: [
                "Email: support@followtracker.app",
                "Response time: 1-3 hari kerja",
                "Website: https://frontend-instagram-follower-tracker.vercel.app",
            ],
            subsections: [
                {
                    id: "permintaan-data",
                    title: "Untuk Permintaan Penghapusan Data",
                    items: [
                        "Email akun yang terdaftar",
                        "Jenis permintaan (hapus data / export data / lainnya)",
                    ],
                },
            ],
        },
    ],
};
