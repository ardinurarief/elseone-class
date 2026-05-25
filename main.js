let typingTimeout = null;
let typingInterval = null;

// 📸 DATABASE KEGIATAN (Tambah sesuai jumlah foto)
const activitiesData = [
    {
        id: 1,
        title: "Study Tour Bandung",
        date: "12 Oktober 2024",
        image: "https://blocks.astratic.com/img/general-img-landscape.png",
        desc: "Kunjungan edukasi ke Museum Geologi dan ITB. Siswa belajar tentang sejarah geologi Indonesia dan mengenal lingkungan kampus teknik secara langsung."
    },
    {
        id: 2,
        title: "Lomba Web Design Nasional",
        date: "5 November 2024",
        image: "https://blocks.astratic.com/img/general-img-landscape.png",
        desc: "Tim kelas berhasil meraih Juara 2 dalam kompetisi desain web tingkat nasional. Proyek bertema 'Smart School' menggunakan React & Tailwind CSS."
    },
    {
        id: 3,
        title: "Kelas Industri Bersama PT. XYZ",
        date: "20 Desember 2024",
        image: "https://blocks.astratic.com/img/general-img-landscape.png",
        desc: "Workshop pengembangan backend menggunakan Laravel dan deployment ke cloud server. Materi dibawakan langsung oleh praktisi industri."
    },
    {
        id: 4,
        title: "Kelas Industri Bersama PT. XYZ",
        date: "20 Desember 2024",
        image: "https://blocks.astratic.com/img/general-img-landscape.png",
        desc: "Workshop pengembangan backend menggunakan Laravel dan deployment ke cloud server. Materi dibawakan langsung oleh praktisi industri."
    },
    // 👉 Tambah objek { id: 4, ... } sesuai kebutuhan
];

function showActivityDetail(id) {
    const act = activitiesData.find(a => a.id === id);
    if (!act) return;
    document.getElementById('activityImage').src = act.image;
    document.getElementById('activityTitle').textContent = act.title;
    document.getElementById('activityDate').textContent = act.date;
    document.getElementById('activityDesc').textContent = act.desc;
    document.getElementById('activityModal').classList.add('show');
}

function closeActivityModal() {
    document.getElementById('activityModal').classList.remove('show');
}

window.addEventListener('click', e => {
    if (e.target.id === 'activityModal') closeActivityModal();
});

// 📦 DATABASE SISWA (Isi sampai 35)
const membersData = [
    { id: 1, name: "No Name", role: "-", photo: "https://cdn-icons-png.flaticon.com/128/149/149071.png", bio: "Pemimpin yang mengutamakan kekompakan.", quote: "Bersama kita bisa.", ig: "ahmadrizky", wa: "628123456789" },
    { id: 2, name: "No Name", role: "-", photo: "https://cdn-icons-png.flaticon.com/128/149/149071.png", bio: "Kreatif & siap membantu teman.", quote: "Konsisten itu kunci.", ig: "siti.nrh", wa: "628198765432" },
    { id: 3, name: "No Name", role: "-", photo: "https://cdn-icons-png.flaticon.com/128/149/149071.png", bio: "Rapi, teliti, cepat ngetik.", quote: "Catatan rapi, pikiran jernih.", ig: "budis._", wa: "628156789123" }
    // 👉 Tambah objek { id: 4, ... } sampai 35
];

// 🔄 LOGIKA CAROUSEL ANGGOTA
let currentMemberIndex = 0;
function moveMemberCarousel(direction) {
    const carousel = document.getElementById('memberCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    const itemsPerView = window.innerWidth <= 768 ? 1 : 3;

    currentMemberIndex += direction;
    if (currentMemberIndex > itemCount - itemsPerView) currentMemberIndex = 0;
    else if (currentMemberIndex < 0) currentMemberIndex = itemCount - itemsPerView;

    carousel.style.transform = `translateX(${-currentMemberIndex * (100 / itemsPerView)}%)`;
}
window.addEventListener('resize', () => {
    currentMemberIndex = 0;
    const c = document.getElementById('memberCarousel');
    if (c) c.style.transform = 'translateX(0%)';
});

let currentActivityIndex = 0;
function moveActivityCarousel(direction) {
    const carousel = document.getElementById('activityCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemCount = items.length;

    // Desktop: 3 item, Tablet: 2 item, Mobile: 1 item
    let itemsPerView = 3;
    if (window.innerWidth <= 768) itemsPerView = 1;
    else if (window.innerWidth <= 1024) itemsPerView = 2;

    currentActivityIndex += direction;

    // Looping infinite
    if (currentActivityIndex > itemCount - itemsPerView) {
        currentActivityIndex = 0;
    } else if (currentActivityIndex < 0) {
        currentActivityIndex = itemCount - itemsPerView;
    }

    const offset = -currentActivityIndex * (100 / itemsPerView);
    carousel.style.transform = `translateX(${offset}%)`;
}

// Reset posisi saat window di-resize
window.addEventListener('resize', () => {
    currentActivityIndex = 0;
    const carousel = document.getElementById('activityCarousel');
    if (carousel) carousel.style.transform = 'translateX(0%)';
});

// 🪟 FUNGSI MODAL
function showMemberDetail(id) {
    const m = membersData.find(x => x.id === id);
    if (!m) return;
    document.getElementById('memberPhoto').src = m.photo;
    document.getElementById('memberName').textContent = m.name;
    document.getElementById('memberRole').textContent = m.role;
    document.getElementById('memberBio').innerHTML = `${m.bio}<br><br><i class="fas fa-quote-left text-neo-yellow mr-2"></i><em>"${m.quote}"</em>`;
    document.getElementById('memberContact').innerHTML = `
    <a href="https://instagram.com/${m.ig}" target="_blank" class="neo-btn px-3 py-2 bg-neo-purple text-white text-xs"><i class="fab fa-instagram mr-1"></i> IG</a>
    <a href="https://wa.me/${m.wa}" target="_blank" class="neo-btn px-3 py-2 bg-neo-green text-black text-xs"><i class="fab fa-whatsapp mr-1"></i> WA</a>`;
    document.getElementById('memberModal').classList.add('show');
}
function closeMemberModal() { document.getElementById('memberModal').classList.remove('show'); }
window.addEventListener('click', e => { if (e.target.id === 'memberModal') closeMemberModal(); });

const translations = {
    id: {
        "nav-home": "Beranda",
        "nav-about": "Tentang",
        "nav-projects": "Proyek",
        "nav-skills": "Keahlian",
        "nav-members": "Anggota",
        "nav-timeline": "Perjalanan",
        "nav-activities": "Kegiatan",
        "nav-testimonial": "Testimoni",
        "nav-contact": "Kontak",
        "hero-view-work": "Lihat Karya Kami",
        "hero-whatsapp": "Chat di WhatsApp",
        "about-title": "Tentang Kami",
        "about-intro": "Kami adalah",
        "class-name": "Kelas XII PPLG 1",
        "about-subtitle": "SMK Negeri 4 Bandar Lampung",
        "about-desc2": "Kelas XII PPLG 1 adalah kumpulan siswa berbakat di SMKN 4 Bandar Lampung yang fokus mempelajari pengembangan web, mobile, dan jaringan komputer. Kami berkomitmen menciptakan solusi digital kreatif, berkolaborasi dalam proyek nyata, dan mempersiapkan diri menjadi profesional teknologi yang kompeten dan beretika.",
        "projects-title": "Proyek Kami",
        "badge-new": "Baru",
        "badge-portfolio": "DonghuaWatch",
        "badge-website": "Website",
        "badge-network": "Jaringan",
        "badge-game": "Game",
        "project1-desc": "Chatbot cerdas bertenaga AI yang dirancang untuk berinteraksi secara alami dengan pengguna menggunakan pemrosesan bahasa alami.",
        "project2-title": "Sistem Informasi Kurikulum OBE",
        "project2-desc": "Sistem Informasi Desain Kurikulum OBE yang dikembangkan untuk Poliban untuk mendukung pengembangan kurikulum yang selaras dengan prinsip OBE.",
        "project3-title": "Desain LAN Skala Besar Cisco",
        "project3-desc": "Desain jaringan menggunakan Cisco Packet Tracer untuk optimasi lingkungan korporat dengan VLAN dan protokol routing.",
        "project4-title": "Permainan Ular Tangga",
        "project4-desc": "Permainan papan klasik berbasis web dengan fitur interaktif, memungkinkan dua pemain untuk bermain dengan animasi yang mulus.",
        "project5-title": "SIMA BPKPAD Kota Banjarmasin",
        "project5-desc": "Sistem manajemen arsip elektronik untuk BPKPAD yang mengoptimalkan penyimpanan, pengambilan, dan keamanan dokumen.",
        "project6-title": "Pengaturan Load Balance Mikrotik",
        "project6-desc": "Implementasi load balancing multi-WAN dengan Mikrotik RouterOS untuk optimasi bandwidth dan failover otomatis.",
        "project7-title": "Landing Page Cafe - Brew Haven",
        "project7-desc": "Landing page responsif modern untuk kedai kopi dengan tampilan menu, lokasi, dan panggilan aksi yang efektif.",
        "project8-desc": "Aplikasi web dengan AI untuk meningkatkan resolusi gambar hingga 4x menggunakan neural network Real-ESRGAN dengan hasil profesional.",
        "project9-title": "Gilmar Idea",
        "project9-desc": "Web berita digital yang menyajikan informasi terkini bagi mahasiswa STIE Pancasetia.",
        "project10-title": "SIP STIE Pancasetia",
        "project10-desc": "Sistem Informasi Terpadu STIE Pancasetia untuk manajemen data akademik yang efisien.",
        "project11-title": "LPPM STIE Pancasetia",
        "project11-desc": "Portal resmi Lembaga Penelitian dan Pengabdian kepada Masyarakat STIE Pancasetia.",
        "project12-title": "Siperu",
        "project12-desc": "Sistem Informasi Peminjaman Ruangan untuk mengelola reservasi fasilitas kampus secara otomatis.",
        "project13-title": "DonghuaWatch Komik",
        "project13-desc": "Platform baca komik online dengan koleksi lengkap dan antarmuka yang ramah pengguna.",
        "project-api-desc": "RESTful API untuk mengambil data streaming Donghua dengan fitur pencarian dan caching yang efisien.",
        "project-donghuawatch-desc": "Situs streaming Donghua dengan subtitle Indonesia yang cepat dan responsif.",
        "badge-ai": "AI",
        "badge-backend": "Backend",
        "donghuawatchs": "Kunjungi",
        "btn-details": "Detail",
        "btn-source": "Source Code",
        "btn-code": "Kode",
        "btn-code2": "Kunjungi",
        "btn-file": "File",
        "skills-technical": "Keahlian Teknis",
        "contact-info-title": "Informasi Kontak",
        "contact-location-title": "Lokasi",
        "contact-email-title": "Email",
        "contact-phone-title": "Telepon",
        "contact-whatsapp-title": "WhatsApp",
        "contact-message-title": "Kirim Pesan",
        "form-name": "Nama Anda",
        "form-email": "Email Anda",
        "form-subject": "Subjek",
        "form-message": "Pesan Anda",
        "btn-send-message": "Kirim Pesan",
        "github_title": "Statistik GitHub",
        "github_repos": "Total Repo",
        "github_stars": "Bintang",
        "github_contrib": "Kontribusi",
        "github_followers": "Pengikut",
        "github_public": "",
        "github_received": "Diterima di proyek",
        "github_lastyear": "(sampai kini)",
        "github_followers_desc": "Pengikut GitHub",
        "certificates-modal-title": "Detail Sertifikat",
        "certificates-modal-close": "Tutup",
        "testimonial-title": "Apa Kata Mereka",
        "testi-risfalidah": "Anak-anak XII PPLG 1 memiliki pola pikir analitis yang sangat baik. Mereka mampu memecahkan masalah kompleks dengan logika yang terstruktur — bekal penting dalam pemrograman dan pengembangan sistem. Bangga melihat progres mereka dari konsep matematika hingga implementasi kode yang solid.",
        "testi-eko": "Sebagai guru produktif, saya melihat XII PPLG 1 tidak hanya mahir coding, tapi juga mampu berkolaborasi dalam tim, mengelola proyek dari awal hingga deploy, dan beradaptasi dengan teknologi baru. Mereka siap menghadapi tantangan industri digital.",
        "testi-rohaniya": "Kreativitas dan jiwa wirausaha XII PPLG 1 sangat menonjol. Mereka tidak hanya membuat aplikasi, tapi juga memikirkan nilai guna, target pengguna, dan cara mempresentasikan karya dengan meyakinkan. Kombinasi teknis + bisnis yang langka dan berharga.",
        "stat-projects": "Proyek Selesai",
        "stat-rating": "Rating Rata-rata",
        "github-less": "Sedikit",
        "github-more": "Banyak",
        "footer-rights": "Hak cipta dilindungi.",
        "cert5-title": "BNSP Programmer",
        "cert5-desc": "Sertifikasi Kompetensi BNSP untuk skema Programmer.",
        "cert6-title": "Belajar Dasar-dasar AI",
        "cert6-desc": "Sertifikasi penyelesaian kursus Belajar Dasar-dasar AI.",
        "members-title": "Anggota Kelas",
        "member-modal-title": "Profil Anggota",
        "member-modal-close": "Tutup",
        "btn-profile": "Lihat Profil",
        "activities-title": "Galeri Kegiatan",
        "activity-modal-title": "Detail Kegiatan",
        "activity-modal-close": "Tutup",
        "timeline-title": "Perjalanan Kelas",
        "timeline-1-title": "Hari Pertama Masuk",
        "timeline-1-desc": "Awal mula kami bertemu. Masih malu-malu, belum tahu siapa yang bakal jadi teman coding bareng sampai wisuda nanti.",
        "timeline-2-title": "Study Tour ke ITB",
        "timeline-2-desc": "Kunjungan edukasi pertama. Belajar langsung dari laboratorium dan dosen Teknik Informatika, membuka wawasan tentang dunia kampus.",
        "timeline-3-title": "Juara Lomba Web Nasional",
        "timeline-3-desc": "Tim kami berhasil masuk 3 besar! Proyek bertema Smart School dengan React & Supabase. Membuktikan kerja keras tim berbuah manis.",
        "timeline-4-title": "Prakerin / PKL Industri",
        "timeline-4-desc": "Terjun langsung ke dunia kerja. Belajar budaya industri, manajemen proyek, dan mengasah skill di perusahaan teknologi ternama.",
        "timeline-5-title": "Ujian Akhir & Wisuda",
        "timeline-5-desc": "Momen paling ditunggu. Menyelesaikan seluruh kewajiban akademik dan resmi menyandang gelar lulusan. Sampai jumpa di puncak berikutnya!"
    },
    en: {
        "nav-home": "Home",
        "nav-about": "About",
        "nav-projects": "Projects",
        "nav-skills": "Skills",
        "nav-activities": "Activities",
        "nav-members": "Members",
        "nav-timeline": "Class Journey",
        "nav-testimonial": "Testimonial",
        "nav-contact": "Contact",
        "hero-view-work": "See Our Work",
        "hero-whatsapp": "Chat on WhatsApp",
        "about-title": "About Us",
        "about-intro": "We are",
        "class-name": "Class XII PPLG 1",
        "about-subtitle": "SMK Negeri 4 Bandar Lampung",
        "about-desc2": "Class XII PPLG 1 is a group of talented students at SMKN 4 Bandar Lampung focusing on web development, mobile apps, and computer networking. We are committed to creating creative digital solutions, collaborating on real projects, and preparing ourselves to become competent and ethical technology professionals.",
        "projects-title": "Our Projects",
        "badge-new": "New",
        "badge-portfolio": "DonghuaWatch",
        "badge-website": "Website",
        "badge-network": "Network",
        "badge-game": "Game",
        "project1-desc": "An intelligent AI-powered chatbot designed to interact naturally with users using natural language processing.",
        "project2-title": "Curriculum Information System OBE",
        "project2-desc": "OBE Curriculum Design Information System developed for Poliban to support curriculum development aligned with OBE principles.",
        "project3-title": "Large-Scale LAN Design Cisco",
        "project3-desc": "Network design using Cisco Packet Tracer for corporate environment optimization with VLAN and routing protocols.",
        "project4-title": "Snakes and Ladders Game",
        "project4-desc": "Web-based classic board game with interactive features, allowing two players to play with smooth animations.",
        "project5-title": "SIMA BPKPAD Banjarmasin City",
        "project5-desc": "Electronic archive management system for BPKPAD optimizing document storage, retrieval, and security.",
        "project6-title": "Load Balance Mikrotik Settings",
        "project6-desc": "Multi-WAN load balancing implementation with Mikrotik RouterOS for bandwidth optimization and automatic failover.",
        "project7-title": "Landing Page Cafe - Brew Haven",
        "project7-desc": "Modern responsive landing page for coffee shop with menu showcase, location, and effective call-to-action.",
        "project8-title": "AI Image Upscaler",
        "project8-desc": "Web application with AI to upscale images up to 4x using Real-ESRGAN neural network with professional results.",
        "project9-title": "Gilmar Idea",
        "project9-desc": "Digital news web providing the latest information for STIE Pancasetia students.",
        "project10-title": "SIP STIE Pancasetia",
        "project10-desc": "STIE Pancasetia Integrated Information System for efficient academic data management.",
        "project11-title": "LPPM STIE Pancasetia",
        "project11-desc": "Official portal of STIE Pancasetia Research and Community Service Institute.",
        "project12-title": "Siperu",
        "project12-desc": "Room Booking Information System for automated campus facility reservation management.",
        "project13-title": "DonghuaWatch Komik",
        "project13-desc": "Online comic reading platform with a complete collection and user-friendly interface.",
        "project-api-desc": "RESTful API to fetch Donghua streaming data with efficient search and caching features.",
        "project-donghuawatch-desc": "Donghua streaming site with fast and responsive Indonesian subtitles.",
        "badge-ai": "AI",
        "badge-backend": "Backend",
        "donghuawatchs": "Visit",
        "btn-details": "Details",
        "btn-source": "Source Code",
        "btn-code": "Code",
        "btn-code2": "Visit",
        "btn-file": "File",
        "skills-technical": "Technical Skills",
        "contact-info-title": "Contact Information",
        "contact-location-title": "Location",
        "contact-email-title": "Email",
        "contact-phone-title": "Phone",
        "contact-whatsapp-title": "WhatsApp",
        "contact-message-title": "Send Me a Message",
        "form-name": "Your Name",
        "form-email": "Your Email",
        "form-subject": "Subject",
        "form-message": "Your Message",
        "btn-send-message": "Send Message",
        "github_title": "GitHub Statistics",
        "github_repos": "Total Repo",
        "github_stars": "Stars",
        "github_contrib": "Contributions",
        "github_followers": "Followers",
        // "github_public": "",
        "github_received": "Received on projects",
        "github_lastyear": "(until now)",
        "github_followers_desc": "GitHub followers",
        "certificates-modal-title": "Certificate Details",
        "certificates-modal-close": "Close",
        "testimonial-title": "What They Said",
        "testi-risfalidah": "The students of XII PPLG 1 have excellent analytical thinking skills. They can solve complex problems with structured logic — an essential foundation for programming and system development. Proud to see their progress from mathematical concepts to solid code implementation.",
        "testi-eko": "As a vocational teacher, I see that XII PPLG 1 students are not only skilled in coding, but also able to collaborate in teams, manage projects from start to deployment, and adapt to new technologies. They are ready to face the challenges of the digital industry.",
        "testi-rohaniya": "The creativity and entrepreneurial spirit of XII PPLG 1 really stand out. They don't just build applications, but also think about usability, target users, and how to present their work convincingly. A rare and valuable combination of technical + business skills.",
        "stat-happy-clients": "Happy Clients",
        "stat-success-rate": "Success Rate %",
        "stat-projects": "Projects Completed",
        "stat-rating": "Average Rating",
        "github-less": "Less",
        "github-more": "More",
        "footer-rights": "All rights reserved.",
        "cert5-title": "BNSP Programmer",
        "cert5-desc": "BNSP Competency Certification for Programmer scheme.",
        "cert6-title": "AI Basics",
        "cert6-desc": "Completion certification for AI Basics course.",
        "members-title": "Class Members",
        "member-modal-title": "Member Profile",
        "member-modal-close": "Close",
        "btn-profile": "View Profile",
        "activities-title": "Activity Gallery",
        "activity-modal-title": "Activity Details",
        "activity-modal-close": "Close",
        "timeline-title": "Class Journey",
        "timeline-1-title": "First Day of School",
        "timeline-1-desc": "The beginning of our journey. Still shy, not knowing who would become our coding buddies until graduation.",
        "timeline-2-title": "Study Tour to ITB",
        "timeline-2-desc": "Our first educational visit. Learning directly from labs and Informatics lecturers, opening our minds to university life.",
        "timeline-3-title": "National Web Competition Winner",
        "timeline-3-desc": "Our team made it to the top 3! A Smart School project using React & Supabase. Proving that hard work pays off.",
        "timeline-4-title": "Industrial Internship (PKL)",
        "timeline-4-desc": "Diving into the real work world. Learning industry culture, project management, and sharpening skills at top tech companies.",
        "timeline-5-title": "Final Exam & Graduation",
        "timeline-5-desc": "The most awaited moment. Completing all academic requirements and officially graduating. See you at the next peak!"
    }
};

let currentLang = 'id';
let currentCarouselIndex = 0;
let activeFilterButton = null;

document.getElementById('lang-toggle').addEventListener('click', function () {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.querySelector('.lang-text').textContent = currentLang === 'id' ? 'EN' : 'ID';
    updatePageTranslations();
});

function updatePageTranslations() {
    const transKeys = document.querySelectorAll('[data-translate]');
    transKeys.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    const titleText = currentLang === 'id' ? "Pengembang Web" : "Web Developer";
    typeEffect(document.getElementById("dev-title"), titleText, 100, 0);
}

function moveCarousel(direction) {
    const carousel = document.getElementById('projectCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const itemCount = items.length;

    const itemsPerView = window.innerWidth <= 768 ? 1 : 3; // mobile:1, desktop:3

    currentCarouselIndex += direction;

    if (currentCarouselIndex > itemCount - itemsPerView) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = itemCount - itemsPerView;
    }

    const offset = -currentCarouselIndex * (100 / itemsPerView);
    carousel.style.transform = `translateX(${offset}%)`;
}

function showCertificateDetail(id, title, organization, year, image, description) {
    // Dynamically create image element if needed, or use pre-defined placeholder
    // For this example, we assume image paths are correct and will be displayed if provided.
    const certImageElement = document.getElementById('certificateModal').querySelector('#certImage');
    if (certImageElement) {
        certImageElement.src = image;
        certImageElement.alt = title + ' Certificate';
        certImageElement.style.display = 'block'; // Ensure it's visible
    } else {
        // If the modal structure is changed and #certImage isn't there, handle accordingly.
        // For now, we log a warning or adjust the modal structure.
        console.warn("Image element for certificate not found in modal.");
    }
    document.getElementById('certTitle').textContent = title;
    document.getElementById('certOrganization').textContent = organization + ' - ' + year;
    document.getElementById('certDescription').textContent = description;
    document.getElementById('certificateModal').classList.add('show');
}


function closeCertificateModal() {
    document.getElementById('certificateModal').classList.remove('show');
    // Optionally reset image source or hide it when modal closes
    const certImageElement = document.getElementById('certificateModal').querySelector('#certImage');
    if (certImageElement) {
        certImageElement.src = ''; // Clear source
        certImageElement.style.display = 'none'; // Hide element
    }
}

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

function typeEffect(element, text, speed = 100, delay = 0) {
    if (!element) return;

    // 🔥 MATIKAN animasi sebelumnya yang masih berjalan
    if (typingTimeout) clearTimeout(typingTimeout);
    if (typingInterval) clearInterval(typingInterval);

    typingTimeout = setTimeout(() => {
        element.textContent = "";
        let i = 0;

        typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                typingInterval = null; // Bersihkan memori setelah selesai
            }
        }, speed);
    }, delay);
}


const emailForm = document.getElementById("emailForm");
if (emailForm) {
    emailjs.init("MkDTippaiZtJd2cUV"); // Replace with your actual EmailJS User ID
    emailForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const serviceID = "service_rw9xkqw"; // Replace with your Service ID
        const templateID = "template_z37v5ih"; // Replace with your Template ID

        emailjs.sendForm(serviceID, templateID, this)
            .then(function (response) {
                alert(currentLang === 'id' ? "Pesan berhasil dikirim!" : "Message sent successfully!");
                emailForm.reset();
            }, function (error) {
                alert(currentLang === 'id' ? "Terjadi kesalahan: " + error.text : "Error occurred: " + error.text);
            });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("hidden");
            }
        }
    });
});

document.getElementById("current-year").textContent = new Date().getFullYear();
updatePageTranslations();

// Add incremental rotation to about image
let currentAngle = -3;
let hoverOffset = 0;
const aboutImgContainer = document.getElementById('about-img-container');

function updateAboutImageTransform() {
    aboutImgContainer.style.transform = `rotate(${currentAngle + hoverOffset}deg)`;
}

if (aboutImgContainer) {
    aboutImgContainer.addEventListener('click', () => {
        currentAngle += 20; // Rotate slightly more on each click
        updateAboutImageTransform();
    });

    aboutImgContainer.addEventListener('mouseenter', () => {
        hoverOffset = 8; // Slight rotation shift on hover
        updateAboutImageTransform();
    });

    aboutImgContainer.addEventListener('mouseleave', () => {
        hoverOffset = 0; // Return to current base angle
        updateAboutImageTransform();
    });
}

// Scroll Reveal implementation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Drag and Drop for Hero Shapes
const draggableShapes = document.querySelectorAll('.draggable-shape');
draggableShapes.forEach(shape => {
    let isDragging = false;
    let offsetX, offsetY;

    const startDrag = (e) => {
        isDragging = true;
        shape.classList.add('dragging');

        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        const rect = shape.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        // Use fixed positioning during drag or adjust style top/left
        shape.style.position = 'fixed';
        shape.style.left = `${clientX - offsetX}px`;
        shape.style.top = `${clientY - offsetY}px`;
        shape.style.bottom = 'auto';
        shape.style.right = 'auto';
    };

    const stopDrag = () => {
        isDragging = false;
        shape.classList.remove('dragging');
    };

    shape.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    shape.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);
});

// </CHANGE> Generate GitHub contribution activity graph
function generateContributionGraph() {
    const graph = document.getElementById('contributionGraph');
    if (!graph) {
        console.log("[v0] Contribution graph element not found");
        return;
    }

    graph.innerHTML = ''; // Clear existing content if any

    const totalWeeks = 52;
    const daysPerWeek = 7;

    for (let week = 0; week < totalWeeks; week++) {
        for (let day = 0; day < daysPerWeek; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'contribution-day';

            // Generate random contribution levels (0-4)
            const level = Math.floor(Math.random() * 5);
            dayElement.classList.add(`level-${level}`);

            // Add hover tooltip
            const levels = ['No contributions', '1-3 contributions', '4-6 contributions', '7-9 contributions', '10+ contributions'];
            dayElement.title = levels[level];

            graph.appendChild(dayElement);
        }
    }
}

// Call function when page loads
document.addEventListener('DOMContentLoaded', generateContributionGraph);

// Custom Alert for Private Repositories
function showPrivateAlert() {
    const existingToast = document.querySelector('.private-alert-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    // ✅ Posisi & ukuran responsif
    toast.className = 'private-alert-toast fixed top-20 sm:top-10 left-5 -translate-x-1/2 z-[100] bg-neo-pink text-white border-4 border-black shadow-neo px-4 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:font-black sm:text-base uppercase tracking-wider text-center animate-slide-down-rope w-[95%] sm:w-auto sm:min-w-[300px]';

    // ✅ Batas lebar agar tidak overflow di layar kecil
    toast.style.maxWidth = '90vw';
    toast.innerHTML = '<i class="fas fa-lock mr-2"></i> Link repository was private';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}