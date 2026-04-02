* LINK DEPLOY = https://movie-space-six-iota.vercel.app/

# DOM & FETCH API

## Document Object Model (DOM)

**DOM** adalah representasi dokumen HTML dalam bentuk *object*. 

Browser tidak membaca HTML sebagai teks biasa, melainkan menerjemahkan teks tersebut menjadi struktur *object* yang nantinya bisa diakses dan dimanipulasi oleh JavaScript. 

Secara visual, DOM digambarkan seperti struktur pohon (*tree*).


* **Akar Utama:** Di posisi paling atas terdapat `Document`.
* **Cabang:** Dari akar, struktur bercabang turun ke `html`, lalu membelah lagi menjadi `head` dan `body`.
* **Daun (Elemen):** Terus turun ke setiap elemen di dalamnya seperti `div`, `h1`, atau `p`.

> **Catatan Penting:** Setiap tag HTML yang ada di dalam struktur pohon ini disebut sebagai **Node**.

## DOM Manipulation

**DOM Manipulation** adalah proses memodifikasi halaman web menggunakan JavaScript. Inilah "nyawa" yang membuat sebuah website terasa hidup dan interaktif.

**Contoh DOM Manipulation:**
* Mengubah teks pada halaman.
* Menambahkan elemen baru ke dalam sebuah *list*.
* Memunculkan notifikasi *pop-up*.

## Window vs Document Object

Memahami perbedaan antara `Window` dan `Document` sangat penting dalam ekosistem browser. Secara hirarki, **Window adalah induknya**, dan **Document berada di dalamnya**.

### 1. Window Object
*Window Object* adalah *object global* atau yang paling tinggi di dalam hirarki browser. Semua fitur yang berhubungan dengan *browser environment* ada di sini.
* **Analogi:** Bingkai aplikasi browser itu sendiri.
* **Contoh:** Fungsi `alert()`.

### 2. Document Object
*Document Object* adalah bagian atau turunan dari Window yang secara spesifik merepresentasikan halaman HTML itu sendiri. Melalui *document* inilah kita bisa mencari, menambah, dan memanipulasi elemen HTML.
* **Analogi:** Kanvas tempat halaman web dilukis/ditampilkan.

## Fetch API

Fetch API digunakan untuk melakukan *request* data melalui jaringan. Ada dua *method* utama yang paling sering dipakai:

### GET
Ibarat kita meminta izin untuk **membaca atau mengambil** data dari server.
* Karakteristik: Data yang dikirim/diminta biasanya terlihat secara transparan di dalam URL.

### POST
Digunakan untuk **mengirim atau membuat** data baru ke server (seperti saat melakukan *submit* formulir pendaftaran).
* Karakteristik: Datanya disembunyikan dengan aman di dalam *request body*, tidak terlihat di URL.
