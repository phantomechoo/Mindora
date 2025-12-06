    const menuBtn = document.getElementById("menu-btn");
    const links = document.querySelector(".links");

    // Hamburger menü işlevi
    menuBtn.addEventListener("click", () => {
        links.classList.toggle("active");
    });

// ⭐ Carousel (Atlıkarınca) İşlevselliği ⭐

// HTML elementlerini seç
const track = document.querySelector('.carousel-track');
const dots = Array.from(document.querySelectorAll('.dot'));
const boxes = Array.from(document.querySelectorAll('.box'));

let currentIndex = 0; // Şu anki aktif kartın indeksi

/**
 * Belirtilen indekse göre carousel'i kaydırır ve nokta işaretçisini günceller.
 * Bu işlev sadece mobil cihazlarda (<= 768px) çalışır.
 * @param {number} index - Kaydırılacak kartın indeksi.
 */
function updateCarousel(index) {
    // Sadece mobil cihazlarda çalıştır (768px ve altı)
    if (window.innerWidth <= 768 && boxes.length > 0) {
        
        const firstBox = boxes[0];
        
        // 1. Kutu Genişliğini al (içerik + padding + border)
        const boxWidth = firstBox.offsetWidth; 
        
        // 2. CSS'deki gap değeri (CSS'de 20px olarak tanımlı)
        const gap = 20; 
        
        // Kaydırılması gereken toplam mesafe = Kutu Genişliği + Gap
        // Bu, kartların tam oturması için en kritik adımdır.
        const totalShift = boxWidth + gap;
        
        // Kaydırma işlemini gerçekleştir (negative X yönünde)
        const transformValue = (index * totalShift);
        
        // track elementini kaydır
        track.style.transform = `translateX(-${transformValue}px)`;
        
        // Dot (nokta) işaretçilerini güncelle
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    // Masaüstünde transform değerini sıfırla
    else if (window.innerWidth > 768) {
        track.style.transform = 'translateX(0)';
        // Masaüstünde ilk nokta aktif kalabilir
        dots.forEach((dot, i) => dot.classList.remove('active'));
        if (dots[0]) {
            dots[0].classList.add('active');
        }
    }
}

// 📌 Dot (nokta) tıklaması olayı
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel(currentIndex);
    });
});

// --- 📱 Mobil Swipe (Kaydırma) İşlevselliği --- //
let startX = 0;
let moveX = 0;
const swipeThreshold = 50; // Kaydırma için minimum mesafe (piksel)

track.addEventListener("touchstart", (e) => {
    // Sadece tek dokunuşu al
    startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
    // Kaydırma mesafesini hesapla
    moveX = e.touches[0].clientX - startX;
});

track.addEventListener("touchend", () => {
    // Sağ kaydırdı (moveX pozitif) → önceki kart
    if (moveX > swipeThreshold) {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel(currentIndex);
    }

    // Sol kaydırdı (moveX negatif) → sonraki kart
    if (moveX < -swipeThreshold) {
        currentIndex = Math.min(boxes.length - 1, currentIndex + 1);
        updateCarousel(currentIndex);
    }

    // Hareket sıfırla
    moveX = 0;
});


// 🖥️ Ekran boyutu değiştiğinde veya yeniden boyutlandırıldığında
window.addEventListener('resize', () => {
    // Mevcut görünüm moduna göre hizalamayı kontrol et
    updateCarousel(currentIndex); 
});

// 🚀 Sayfa yüklendiğinde carousel'i başlat ve doğru pozisyona getir
window.addEventListener('load', () => {
    updateCarousel(currentIndex);
});



        const buttons = document.querySelectorAll(".btn");
        buttons.forEach(b => {
            b.addEventListener("click", () => {
                const panel = b.nextElementSibling;

                b.classList.toggle("active");

                panel.classList.toggle("open");
            });
        });



