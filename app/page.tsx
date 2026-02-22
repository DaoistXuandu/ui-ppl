'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3, Search, ChevronDown, ChevronUp, Newspaper, Building2,
  Mail, Phone, MapPin, ShieldCheck, ExternalLink, ChevronRight,
  ChevronLeft, GraduationCap, ArrowRight, Calendar
} from 'lucide-react';

export default function PublicDashboardPage() {
  const [searchFeed, setSearchFeed] = useState('');
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const togglePost = (id: number) => {
    setExpandedPosts(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  // Dataset Statistik
  const statistikProdi = [
    { prov: 'Jawa Timur', jml: 45, max: 45 },
    { prov: 'DKI Jakarta', jml: 32, max: 45 },
    { prov: 'Jawa Barat', jml: 28, max: 45 },
  ];

  const statistikKegiatan = [
    { tahun: '2026', total: 156, status: 'Aktif' },
    { tahun: '2025', total: 120, status: 'Selesai' },
    { tahun: '2024', total: 142, status: 'Selesai' },
    { tahun: '2023', total: 98, status: 'Selesai' },
    { tahun: '2022', total: 110, status: 'Selesai' },
    { tahun: '2021', total: 85, status: 'Selesai' },
  ];

  const nextYear = () => {
    if (currentYearIndex + 2 < statistikKegiatan.length) {
      setCurrentYearIndex(currentYearIndex + 1);
    }
  };

  const prevYear = () => {
    if (currentYearIndex > 0) {
      setCurrentYearIndex(currentYearIndex - 1);
    }
  };

  // Dataset 12 Data Pengumuman untuk Simulasi Pagination
  const feedPosts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Pengumuman Penting #${i + 1}: Update Program Pembinaan ${2026 - Math.floor(i / 4)}`,
    date: `${22 - i} Feb 2026`,
    isEdited: i % 3 === 0,
    author: i % 2 === 0 ? { role: 'admin' } : { id: 101 + i, name: 'Prof. Dr. Ahmad Setiawan', role: 'gb', initials: 'AS' },
    excerpt: 'Ini adalah ringkasan informasi mengenai perkembangan terbaru program peningkatan kualitas tata kelola...',
    content: 'Detail lengkap pengumuman ini mencakup langkah-langkah strategis yang harus diambil oleh setiap pimpinan program studi dalam menyesuaikan kurikulum OBE sesuai standar APTIKOM.'
  }));

  const filteredPosts = feedPosts.filter(post =>
    post.title.toLowerCase().includes(searchFeed.toLowerCase())
  );

  // Logika Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B] antialiased">
      {/* NAVBAR dengan padding lebih besar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 xl:px-20 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/aptikom.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-[16px] font-bold text-[#0F172A] leading-tight">GBIM</h1>
              <p className="text-[12px] text-slate-500 font-medium tracking-tight">APTIKOM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-all">Login</Link>
            <Link href="/register" className="px-8 py-2.5 text-sm font-bold bg-[#1E88E5] text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Daftar</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-8 md:px-12 xl:px-20 py-10">

        {/* HERO SECTION */}
        <section className="relative rounded-[48px] bg-gradient-to-br from-[#1E88E5] to-[#1565C0] p-10 md:p-20 overflow-hidden shadow-2xl mb-16">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 skew-x-12 transform translate-x-20"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-5 py-2 rounded-full mb-8 border border-white/30 text-[12px] font-bold uppercase tracking-widest backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" /> Program Resmi APTIKOM
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
              Guru Besar <br /> Infokom Mengabdi
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 leading-relaxed mb-12 opacity-90 font-medium">
              Akselerasi kualitas tata kelola tridharma perguruan tinggi melalui pendampingan langsung pakar informatika.
            </p>
            <Link href="/register" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#1E88E5] font-bold rounded-2xl shadow-xl hover:bg-blue-50 transition-all group text-lg">
              Mulai Pembinaan <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* STATISTIK SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 -mt-24 relative z-20">
          <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 transition-all hover:shadow-blue-900/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-inner">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Sebaran Program Studi</h2>
            </div>
            <div className="space-y-8">
              {statistikProdi.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-base font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{item.prov}</span>
                    <span className="text-base font-extrabold text-slate-900">{item.jml} <span className="text-xs text-slate-400 font-normal uppercase tracking-widest ml-1">Prodi</span></span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${(item.jml / item.max) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col transition-all hover:shadow-blue-900/5">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shadow-inner">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Total Kegiatan</h2>
              </div>
              <div className="flex gap-3">
                <button disabled={currentYearIndex <= 0} onClick={prevYear} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-blue-600 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-sm"><ChevronLeft className="w-6 h-6" /></button>
                <button disabled={currentYearIndex + 2 >= statistikKegiatan.length} onClick={nextYear} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-blue-600 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-sm"><ChevronRight className="w-6 h-6" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 flex-1 items-center">
              {statistikKegiatan.slice(currentYearIndex, currentYearIndex + 2).map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-[32px] p-8 text-center border border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-sm">
                  <span className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">{item.tahun}</span>
                  <span className="block text-5xl font-black text-blue-600 mb-4">{item.total}</span>
                  <span className={`inline-block px-5 py-1.5 ${item.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'} text-xs font-bold rounded-full shadow-sm uppercase tracking-wider`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEED PENGUMUMAN DENGAN PAGINATION */}
        <section className="mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shadow-inner">
                <Newspaper className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Informasi & Pengumuman</h2>
            </div>
            <div className="relative w-full md:w-[400px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari berita atau pengumuman..."
                value={searchFeed}
                onChange={(e) => { setSearchFeed(e.target.value); setCurrentPage(1); }}
                className="w-full pl-14 pr-6 py-4 border border-slate-200 rounded-[20px] focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 bg-white text-base shadow-sm transition-all"
              />
            </div>
          </div>

          <div className="grid gap-8 mb-12">
            {currentPosts.length > 0 ? (
              currentPosts.map(post => {
                const isExpanded = expandedPosts.includes(post.id);
                return (
                  <div key={post.id} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                      {post.author.role === 'gb' ? (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-base shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">{post.author.initials}</div>
                          <div>
                            <p className="text-base font-bold text-slate-800 leading-tight">{post.author.name}</p>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.15em] mt-1">Guru Besar Pembina</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 shadow-inner"><ShieldCheck className="w-6 h-6" /></div>
                          <div>
                            <p className="text-base font-bold text-slate-800 leading-tight">Pengumuman Rutin GBIM</p>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.15em] mt-1">Admin Sistem</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-wider">{post.date}</span>
                        {post.isEdited && <span className="text-xs italic text-slate-400 font-medium">(edited)</span>}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <div className="text-base text-slate-500 mb-8 whitespace-pre-wrap leading-relaxed">
                      {isExpanded ? post.content : post.excerpt}
                    </div>
                    <button
                      onClick={() => togglePost(post.id)}
                      className="inline-flex items-center gap-2 text-base font-bold text-[#1E88E5] hover:text-blue-800 transition-all"
                    >
                      {isExpanded ? <>Sembunyikan <ChevronUp className="w-5 h-5" /></> : <>Baca Selengkapnya <ChevronDown className="w-5 h-5" /></>}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-20 rounded-[40px] text-center border-2 border-dashed border-slate-200">
                <p className="text-lg text-slate-400 font-medium font-sans italic tracking-wide">Data tidak ditemukan.</p>
              </div>
            )}
          </div>

          {/* PAGINATION CONTROLS */}
          {filteredPosts.length > postsPerPage && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all border shadow-sm ${currentPage === i + 1 ? 'bg-blue-600 border-blue-600 text-white shadow-blue-200' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:border-blue-600 hover:text-blue-600 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER dengan padding disesuaikan */}
      <footer className="bg-[#0B3D78] text-white pt-20 pb-10 mt-24">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-white/10">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-lg"><img src="/aptikom-circle.png" alt="Logo" className="object-contain" /></div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">GBIM APTIKOM</h3>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-1">Mengabdi Untuk Negeri</p>
                </div>
              </div>
              <p className="text-blue-100/60 text-sm leading-relaxed mb-8">Program pembinaan infrastruktur dan tata kelola perguruan tinggi informatika untuk masa depan Indonesia yang lebih baik.</p>
              <p className="text-xs text-white/30 font-medium">© 2026 APTIKOM. Seluruh hak cipta dilindungi.</p>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-xl tracking-tight">Navigasi Utama</h4>
              <ul className="space-y-4 text-blue-100/70 text-base font-medium">
                <li><Link href="/" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Beranda</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Login Akses</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Pendaftaran Baru</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-xl tracking-tight">Saluran Informasi</h4>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <Mail className="w-6 h-6 text-blue-300 shrink-0" />
                  <div>
                    <p className="text-xs text-blue-300/60 uppercase font-black tracking-widest mb-1">Surat Elektronik</p>
                    <a href="mailto:info@aptikom.org" className="text-base font-bold hover:underline">info@aptikom.org</a>
                  </div>
                </div>
                <div className="flex gap-5">
                  <MapPin className="w-6 h-6 text-blue-300 shrink-0" />
                  <div>
                    <p className="text-xs text-blue-300/60 uppercase font-black tracking-widest mb-1">Kantor Pusat</p>
                    <p className="text-base font-bold leading-relaxed">Gedung APTIKOM, Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-white/30 font-bold uppercase tracking-widest">
            <p>Dukungan Penuh oleh Asosiasi Perguruan Tinggi Informatika dan Komputer</p>
            <a href="https://aptikom.org" target="_blank" className="flex items-center gap-2 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full">Kunjungi Portal Utama <ExternalLink className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}