

'use client';

import { useState } from 'react';
import {
    LayoutDashboard, Users, FileText, CheckCircle, Clock,
    Activity, Award, Building2, ShieldCheck,
    AlertCircle, Plus, FileSignature, BarChart3, Megaphone, X, Edit3, Trash2,
    FileCheck,
    User, CalendarDays
} from 'lucide-react';

// Import Komponen Modular
import PengajuanPanel from '../components/pengajuan';
import KegiatanPanel from '../components/kegiatan';
import VerifikasiPanel from '../components/verfikasi';
import DokumenPanel from '../components/dokumen';
import StatistikPanel from '../components/statistik';
import GbApprovalsPanel from '../components/gb-approvals';
import DaftarGbPanel from '../components/daftar-gb';
import ProfilPanel from '../components/profil';
import PeriodeKegiatanPanel from '../components/periode-kegiatan'; // Tambahkan Import ini

export default function UnifiedDashboard() {
    const [role, setRole] = useState<'admin' | 'kaprodi' | 'gb'>('kaprodi');
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [toast, setToast] = useState<{ show: boolean, msg: string, type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });

    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
    };

    // --- STATE PENGUMUMAN (DIPERBARUI) ---
    const [showPengumumanModal, setShowPengumumanModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [newPengumuman, setNewPengumuman] = useState({ judul: '', isi: '' });
    const [pengumumanList, setPengumumanList] = useState([
        { id: 1, judul: 'Jadwal Upload DED Diperpanjang', isi: 'Batas akhir unggah Dokumen Evaluasi Diri diundur hingga 30 April 2026.', date: '23 Feb 2026', edited: false, roleOrigin: 'admin' },
        { id: 2, judul: 'Pemeliharaan Server Sistem GBIM', isi: 'Sistem akan mengalami downtime pada hari Sabtu pukul 00.00 WIB.', date: '21 Feb 2026', edited: false, roleOrigin: 'admin' },
        { id: 3, judul: 'Materi Panduan Review RPS OBE', isi: 'Bagi prodi binaan saya, materi standar panduan review RPS sudah saya kirimkan via email. Silakan dicek.', date: '22 Feb 2026', edited: false, author: 'Prof. Dr. Ini', roleOrigin: 'gb_self' },
        { id: 4, judul: 'Materi Panduan Review RPS OBE', isi: 'Bagi prodi binaan saya, materi standar panduan review RPS sudah saya kirimkan via email. Silakan dicek.', date: '22 Feb 2026', edited: false, author: 'Prof. Dr. Ahmad Setiawan', roleOrigin: 'gb_other' }
    ]);

    const handleCreateOrEditPengumuman = (e: React.FormEvent) => {
        e.preventDefault();
        const currentAuthor = role === 'admin' ? 'Admin' : 'Anda (Guru Besar)';
        const currentRoleOrigin = role === 'admin' ? 'admin' : 'gb_self';

        if (editId) {
            setPengumumanList(prev => prev.map(p =>
                p.id === editId ? { ...p, judul: newPengumuman.judul, isi: newPengumuman.isi, edited: true } : p
            ));
            showToast('Postingan berhasil diperbarui!', 'success');
        } else {
            setPengumumanList([{
                id: Date.now(),
                judul: newPengumuman.judul,
                isi: newPengumuman.isi,
                date: 'Hari ini',
                edited: false,
                author: currentAuthor,
                roleOrigin: currentRoleOrigin
            }, ...pengumumanList]);
            showToast('Postingan berhasil dipublikasikan!', 'success');
        }
        closeModal();
    };

    const handleDeletePengumuman = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
            setPengumumanList(prev => prev.filter(p => p.id !== id));
            showToast('Pengumuman telah dihapus', 'success');
        }
    };

    const openEditModal = (p: any) => {
        setEditId(p.id);
        setNewPengumuman({ judul: p.judul, isi: p.isi });
        setShowPengumumanModal(true);
    };

    const closeModal = () => {
        setShowPengumumanModal(false);
        setEditId(null);
        setNewPengumuman({ judul: '', isi: '' });
    };

    // State Mock Data (Existing)
    const [pengajuanList, setPengajuanList] = useState([
        { id: 1, prodi: 'Teknik Informatika - Univ. Telkom', gbName: 'Prof. Dr. Ahmad Setiawan', gbUniv: 'Institut Teknologi Bandung', tgl: '22 Feb 2026', status: 'Sedang diproses', pesan: 'Terkait permohonan pendampingan akreditasi.', berminat: true },
        { id: 2, prodi: 'Sistem Informasi - Univ. Indonesia', gbName: 'Prof. Dr. Siti Nurhaliza', gbUniv: 'Universitas Brawijaya', tgl: '20 Feb 2026', status: 'Diterima', pesan: "Terkait permohonan pendampingan akreditasi." },
        { id: 3, prodi: 'Teknik Komputer - ITS', gbName: 'Prof. Dr. Budi Santoso', gbUniv: 'Universitas Gadjah Mada', tgl: '18 Feb 2026', status: 'Sedang diproses', pesan: "" },
        { id: 4, prodi: 'Informatika - Univ. Diponegoro', gbName: 'Prof. Dr. Ahmad Setiawan', gbUniv: 'Institut Teknologi Bandung', tgl: '15 Feb 2026', status: 'Ditolak', pesan: "", berminat: true },
        { id: 5, prodi: 'Sains Data - Univ. Airlangga', gbName: 'Prof. Dr. Gede Putra', gbUniv: 'Universitas Udayana', tgl: '23 Feb 2026', status: 'Sedang diproses', pesan: "" },
        { id: 6, prodi: 'Teknologi Informasi - Univ. Bina Nusantara', gbName: 'Prof. Dr. Siti Nurhaliza', gbUniv: 'Universitas Brawijaya', tgl: '10 Feb 2026', status: 'Selesai', pesan: "" },
        { id: 7, prodi: 'Sistem Informasi - Univ. Gunadarma', gbName: 'Prof. Dr. Budi Santoso', gbUniv: 'Universitas Gadjah Mada', tgl: '21 Feb 2026', status: 'Diterima', pesan: "" },
        { id: 8, prodi: 'Informatika - Univ. Hasanuddin', gbName: 'Prof. Dr. Ahmad Setiawan', gbUniv: 'Institut Teknologi Bandung', tgl: '05 Feb 2026', status: 'Sedang diproses', pesan: "" }
    ]);
    const [verifikasiData, setVerifikasiData] = useState([
        {
            id: 1,
            nama: 'Prof. Dr. Ir. Gajah Mada, M.Eng.',
            role: 'Guru Besar',
            instansi: 'Universitas Gadjah Mada',
            email: 'gajahmada@ugm.ac.id',
            prodi: 'Teknik Elektro',
            kabupaten: 'Sleman',
            provinsi: 'DI Yogyakarta',
            roleSpesifik: 'Sistem Tenaga Listrik, Energi Terbarukan',
            tanggalDaftar: '22 Feb 2026'
        },
        {
            id: 2,
            nama: 'Dr. Siti Aminah, S.T., M.Kom.',
            role: 'Kaprodi',
            instansi: 'Institut Teknologi Sepuluh Nopember',
            email: 'siti.aminah@its.ac.id',
            prodi: 'Sistem Informasi',
            kabupaten: 'Kota Surabaya',
            provinsi: 'Jawa Timur',
            roleSpesifik: '081234567890',
            tanggalDaftar: '21 Feb 2026'
        },
        {
            id: 3,
            nama: 'Prof. Agus Setiawan, Ph.D.',
            role: 'Guru Besar',
            instansi: 'Universitas Indonesia',
            email: 'agus.setiawan@ui.ac.id',
            prodi: 'Ilmu Komputer',
            kabupaten: 'Kota Depok',
            provinsi: 'Jawa Barat',
            roleSpesifik: 'Artificial Intelligence, Computer Vision',
            tanggalDaftar: '20 Feb 2026'
        },
        {
            id: 4,
            nama: 'Budi Raharjo, M.T.',
            role: 'Kaprodi',
            instansi: 'Telkom University',
            email: 'budiharjo@telkomuniversity.ac.id',
            prodi: 'Teknik Informatika',
            kabupaten: 'Kab. Bandung',
            provinsi: 'Jawa Barat',
            roleSpesifik: '085566778899',
            tanggalDaftar: '19 Feb 2026'
        },
        {
            id: 5,
            nama: 'Prof. Dr. Retno Wahyuni, M.Si.',
            role: 'Guru Besar',
            instansi: 'Universitas Diponegoro',
            email: 'retno.w@undip.ac.id',
            prodi: 'Informatika',
            kabupaten: 'Kota Semarang',
            provinsi: 'Jawa Tengah',
            roleSpesifik: 'Data Science, Bioinformatika',
            tanggalDaftar: '18 Feb 2026'
        },
        {
            id: 6,
            nama: 'Hendra Wijaya, S.Kom., M.Cs.',
            role: 'Kaprodi',
            instansi: 'Universitas Bina Nusantara',
            email: 'hendra.w@binus.edu',
            prodi: 'Software Engineering',
            kabupaten: 'Jakarta Barat',
            provinsi: 'DKI Jakarta',
            roleSpesifik: '089911223344',
            tanggalDaftar: '17 Feb 2026'
        }
    ]);
    const [kegiatanList] = useState([
        { id: 101, nama: 'Pembinaan Kurikulum OBE Batch I', waktu: 'Senin, 12 Maret 2026', tempat: 'Daring (Zoom)', partisipan: 'Informatika - Telkom', pembina: 'Prof. Ahmad', status: 'Sedang Berjalan' },
        { id: 102, nama: 'Workshop Penjaminan Mutu Internal', waktu: 'Selasa, 24 Maret 2026', tempat: 'Luring (Surabaya)', partisipan: 'Sistem Informasi - ITS', pembina: 'Prof. Budi Santoso', status: 'Selesai' },
        { id: 103, nama: 'Review RPS Berbasis Case-Method', waktu: 'Kamis, 02 April 2026', tempat: 'Hybrid (Jakarta)', partisipan: 'Teknik Elektro - UI', pembina: 'Prof. Gajah Mada', status: 'Administrasi' },
        { id: 104, nama: 'Sinkronisasi CPL Standar Internasional', waktu: 'Rabu, 15 April 2026', tempat: 'Daring (Zoom)', partisipan: 'Sains Data - Unair', pembina: 'Prof. Retno Wahyuni', status: 'Administrasi' },
        { id: 105, nama: 'Penyusunan Borang Akreditasi LAM-INFOKOM', waktu: 'Jumat, 08 Mei 2026', tempat: 'Luring (Bandung)', partisipan: 'Teknik Informatika - UNIKOM', pembina: 'Prof. Ahmad Setiawan', status: 'Sedang Berjalan' }
    ]);

    const menuMap = {
        admin: [
            { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { name: 'Periode Kegiatan', icon: <CalendarDays className="w-5 h-5" /> }, // MENU BARU ADMIN
            { name: 'Verifikasi Pendaftar', icon: <ShieldCheck className="w-5 h-5" /> },
            { name: 'Daftar Pengajuan', icon: <FileText className="w-5 h-5" /> },
            { name: 'Daftar Kegiatan', icon: <Activity className="w-5 h-5" /> },
            { name: 'Monitoring Dokumen', icon: <FileSignature className="w-5 h-5" /> },
            { name: 'Statistik Kinerja Prodi', icon: <BarChart3 className="w-5 h-5" /> },
        ],
        kaprodi: [
            { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { name: 'Daftar Guru Besar', icon: <Users className="w-5 h-5" /> },
            { name: 'Pengajuan Saya', icon: <FileText className="w-5 h-5" /> },
            { name: 'Daftar Kegiatan', icon: <Activity className="w-5 h-5" /> },
            { name: 'Profil', icon: <User className="w-5 h-5" /> },
        ],
        gb: [
            { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
            { name: 'Pengajuan Masuk', icon: <Building2 className="w-5 h-5" /> },
            { name: 'Persetujuan Dokumen', icon: <FileCheck className="w-5 h-5" /> },
            { name: 'Daftar Kegiatan', icon: <Activity className="w-5 h-5" /> },
            { name: 'Profil', icon: <User className="w-5 h-5" /> },
        ]
    };


    // Data Mock Khusus Guru Besar
    const gbDashboardData = {
        requestBinaan: 5,
        dokumenPending: 3,
        kegiatanAktif: kegiatanList.length
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-[#1E293B] antialiased">
            {toast.show && (
                <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${toast.type === 'success' ? 'bg-white border-green-100' : 'bg-red-50 border-red-100'}`}>
                    {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
                    <p className="font-bold text-sm text-slate-800">{toast.msg}</p>
                </div>
            )}

            <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-full shrink-0 z-20 shadow-xl shadow-slate-200/10">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1E88E5] rounded-xl flex items-center justify-center p-1.5 shadow-md">
                        <img src="/aptikom-circle.png" className="brightness-0 invert" alt="Logo" />
                    </div>
                    <div><h1 className="text-lg font-extrabold text-slate-800 leading-tight">GBIM</h1><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Internal Panel</p></div>
                </div>
                <div className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuMap[role].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveMenu(item.name)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeMenu === item.name ? 'bg-blue-50 text-[#1E88E5]' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            {item.icon} {item.name}
                        </button>
                    ))}
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <h2 className="text-xl font-bold text-slate-800">{activeMenu}</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Testing Role:</span>
                        <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-[#1E88E5] py-1.5 px-3 rounded-xl outline-none cursor-pointer" value={role} onChange={(e) => { setRole(e.target.value as any); setActiveMenu('Dashboard'); }}>
                            <option value="admin">Admin</option><option value="gb">Guru Besar</option><option value="kaprodi">Kaprodi</option>
                        </select>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[1200px] mx-auto">

                        {activeMenu === 'Dashboard' && (
                            <div className="space-y-8 animate-in fade-in">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Halo, {role === 'admin' ? 'Admin!' : role === 'gb' ? 'Profesor!' : 'User!'}</h1>
                                        <p className="text-slate-500 font-medium">Berikut adalah ringkasan sistem GBIM hari ini.</p>
                                    </div>
                                    {(role === 'admin' || role === 'gb') && (
                                        <button onClick={() => setShowPengumumanModal(true)} className="flex items-center gap-2 px-6 py-3 bg-[#1E88E5] text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all">
                                            <Plus className="w-5 h-5" /> Buat Postingan
                                        </button>
                                    )}
                                </div>

                                {/* KARTU STATISTIK DINAMIS BERDASARKAN ROLE */}
                                {role === 'admin' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-100"><Users className="w-6 h-6 text-orange-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">{verifikasiData.length}</p><p className="text-sm font-bold text-slate-500">Pendaftar Baru</p></div>
                                        </div>
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-100"><Clock className="w-6 h-6 text-blue-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">{pengajuanList.length}</p><p className="text-sm font-bold text-slate-500">Pengajuan Aktif</p></div>
                                        </div>
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-100"><Activity className="w-6 h-6 text-green-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">{kegiatanList.length}</p><p className="text-sm font-bold text-slate-500">Kegiatan Berjalan</p></div>
                                        </div>
                                    </div>
                                ) : role === 'gb' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-100"><Building2 className="w-6 h-6 text-blue-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">{gbDashboardData.requestBinaan}</p><p className="text-sm font-bold text-slate-500">Request Binaan</p></div>
                                        </div>
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-100"><FileSignature className="w-6 h-6 text-red-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">{gbDashboardData.dokumenPending}</p><p className="text-sm font-bold text-slate-500">Dokumen Pending</p></div>
                                        </div>
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-100"><Activity className="w-6 h-6 text-green-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">{gbDashboardData.kegiatanAktif}</p><p className="text-sm font-bold text-slate-500">Kegiatan Berjalan</p></div>
                                        </div>
                                    </div>
                                ) : role === 'kaprodi' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-100"><Clock className="w-6 h-6 text-blue-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">2</p><p className="text-sm font-bold text-slate-500">Pengajuan Aktif</p></div>
                                        </div>
                                        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-green-100"><Activity className="w-6 h-6 text-green-600" /></div>
                                            <div><p className="text-3xl font-extrabold text-slate-800">{kegiatanList.length}</p><p className="text-sm font-bold text-slate-500">Kegiatan Berjalan</p></div>
                                        </div>
                                    </div>
                                ) : null}

                                {/* LIST POSTINGAN BERSAMA */}
                                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm mt-8">
                                    <h3 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2"><Megaphone className="w-5 h-5 text-[#1E88E5]" /> Papan Informasi & Pengumuman</h3>
                                    <div className="space-y-4">
                                        {pengumumanList.length === 0 ? (
                                            <p className="text-slate-400 italic text-sm">Belum ada postingan.</p>
                                        ) : (
                                            pengumumanList.map(peng => {
                                                // Logika apakah user boleh mengedit/hapus postingan ini
                                                const isOwnPost = (role === 'admin' && peng.roleOrigin === 'admin') || (role === 'gb' && peng.roleOrigin === 'gb_self');

                                                return (
                                                    <div key={peng.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group relative">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="font-bold text-slate-800 text-base flex items-center gap-2">
                                                                    {peng.judul}
                                                                    {peng.edited && <span className="text-[10px] font-medium text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">(Telah diedit)</span>}
                                                                </h4>
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">
                                                                    {peng.date} • Oleh: <span className="text-[#1E88E5]">{peng.author}</span>
                                                                </span>
                                                            </div>
                                                            {isOwnPost && (
                                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <button onClick={() => openEditModal(peng)} className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 rounded-lg shadow-sm transition-all" title="Edit">
                                                                        <Edit3 className="w-4 h-4" />
                                                                    </button>
                                                                    <button onClick={() => handleDeletePengumuman(peng.id)} className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-red-600 rounded-lg shadow-sm transition-all" title="Hapus">
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-slate-600 leading-relaxed pr-20">{peng.isi}</p>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeMenu === 'Verifikasi Pendaftar' && <VerifikasiPanel verifikasiData={verifikasiData} setVerifikasiData={setVerifikasiData} showToast={showToast} />}
                        {(activeMenu === 'Daftar Pengajuan' || activeMenu === 'Pengajuan Saya' || activeMenu === 'Pengajuan Masuk') && <PengajuanPanel role={role} pengajuanList={pengajuanList} setPengajuanList={setPengajuanList} showToast={showToast} />}
                        {activeMenu === 'Daftar Kegiatan' && <KegiatanPanel role={role} kegiatanList={kegiatanList} />}
                        {activeMenu === 'Monitoring Dokumen' && <DokumenPanel showToast={showToast} />}
                        {activeMenu === 'Statistik Kinerja Prodi' && <StatistikPanel />}
                        {activeMenu === 'Persetujuan Dokumen' && <GbApprovalsPanel showToast={showToast} />}
                        {activeMenu === 'Daftar Guru Besar' && <DaftarGbPanel showToast={showToast} setActiveMenu={setActiveMenu} />}
                        {activeMenu === 'Profil' && <ProfilPanel role={role} showToast={showToast} />}
                        {activeMenu === 'Periode Kegiatan' && <PeriodeKegiatanPanel showToast={showToast} />}
                    </div>
                </div>
            </main>

            {/* MODAL BUAT/EDIT POSTINGAN */}
            {showPengumumanModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                                <Megaphone className="w-5 h-5 text-[#1E88E5]" /> {editId ? 'Edit Postingan' : 'Buat Postingan Baru'}
                            </h3>
                            <button onClick={closeModal} className="p-2 text-slate-400 hover:text-red-500 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleCreateOrEditPengumuman}>
                            <div className="p-8 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Judul Postingan</label>
                                    <input required type="text" value={newPengumuman.judul} onChange={(e) => setNewPengumuman({ ...newPengumuman, judul: e.target.value })} placeholder="Masukkan judul..." className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white text-sm font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Isi Pesan</label>
                                    <textarea required rows={4} value={newPengumuman.isi} onChange={(e) => setNewPengumuman({ ...newPengumuman, isi: e.target.value })} placeholder="Tuliskan detail postingan di sini..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white text-sm transition-all resize-none"></textarea>
                                </div>
                            </div>
                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-all">Batal</button>
                                <button type="submit" disabled={!newPengumuman.judul || !newPengumuman.isi} className="px-8 py-3 flex-1 font-bold bg-[#1E88E5] text-white hover:bg-blue-700 rounded-xl transition-all shadow-md disabled:bg-slate-300 disabled:shadow-none">
                                    {editId ? 'Simpan Perubahan' : 'Publikasikan Sekarang'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}