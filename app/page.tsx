'use client';

import { useState } from 'react';
import {
  LayoutDashboard, Users, FileText, CheckCircle, Clock,
  Activity, Award, PenTool, Building2, ShieldCheck,
  AlertCircle, Plus, FileSignature
} from 'lucide-react';

// Import Komponen Modular

import PengajuanPanel from './components/pengajuan';
import KegiatanPanel from './components/kegiatan';
import VerifikasiPanel from './components/verfikasi';

export default function UnifiedDashboard() {
  const [role, setRole] = useState<'admin' | 'kaprodi' | 'gb'>('admin');
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [toast, setToast] = useState<{ show: boolean, msg: string, type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
  };

  // State Data (Contoh mock data)
  const [pengajuanList, setPengajuanList] = useState([
    { id: 1, prodi: 'Teknik Informatika - Univ. Telkom', gbName: 'Prof. Dr. Ahmad Setiawan', gbUniv: 'Institut Teknologi Bandung', tgl: '22 Feb 2026', status: 'Sedang diproses' },
    { id: 2, prodi: 'Sistem Informasi - UI', gbName: 'Prof. Dr. Siti Nurhaliza', gbUniv: 'Universitas Brawijaya', tgl: '20 Feb 2026', status: 'Sedang diproses' },
  ]);

  const [verifikasiData, setVerifikasiData] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      nama: i % 2 === 0 ? `Prof. Dr. Budi Santoso ${i + 1}, M.T.` : `Siti Aminah ${i + 1}, M.Kom.`,
      role: i % 2 === 0 ? 'Guru Besar' : 'Kaprodi',
      instansi: i % 2 === 0 ? 'Universitas Brawijaya' : 'ITS',
      email: `user${i + 1}@kampus.ac.id`,
      prodi: 'Informatika', kabupaten: 'Malang', provinsi: 'Jawa Timur', roleSpesifik: 'AI', tanggalDaftar: '20 Feb 2026'
    }))
  );

  const [kegiatanList] = useState([
    { id: 101, nama: 'Pembinaan Kurikulum Berbasis OBE', periode: 'Genap 2025/2026', tempat: 'Daring (Zoom)', partisipan: '2 Prodi, 1 GB', status: 'Sedang Berjalan' },
    { id: 102, nama: 'Workshop Penjaminan Mutu Internal', periode: 'Ganjil 2025/2026', tempat: 'Luring (Jakarta)', partisipan: '1 Prodi, 1 GB', status: 'Selesai' },
  ]);

  // FIXED: Sidebar Menu Map
  const menuMap = {
    admin: [
      { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { name: 'Verifikasi Pendaftar', icon: <ShieldCheck className="w-5 h-5" /> },
      { name: 'Daftar Pengajuan', icon: <FileText className="w-5 h-5" /> },
      { name: 'Daftar Kegiatan', icon: <Activity className="w-5 h-5" /> }, // LABEL SUDAH DIPERBAIKI
      { name: 'Monitoring Dokumen', icon: <FileSignature className="w-5 h-5" /> },
    ],
    kaprodi: [
      { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { name: 'Daftar Guru Besar', icon: <Users className="w-5 h-5" /> },
      { name: 'Pengajuan Saya', icon: <FileText className="w-5 h-5" /> },
      { name: 'Daftar Kegiatan', icon: <Activity className="w-5 h-5" /> },
    ],
    gb: [
      { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { name: 'Pengajuan Masuk', icon: <Building2 className="w-5 h-5" /> },
      { name: 'Daftar Kegiatan', icon: <Activity className="w-5 h-5" /> },
    ]
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-[#1E293B] antialiased">
      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${toast.type === 'success' ? 'bg-white border-green-100' : 'bg-red-50 border-red-100'}`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
          <p className="font-bold text-sm text-slate-800">{toast.msg}</p>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-full shrink-0 z-20 shadow-xl shadow-slate-200/10">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1E88E5] rounded-xl flex items-center justify-center p-1.5 shadow-md">
            <img src="/aptikom-circle.png" className="brightness-0 invert" alt="Logo" />
          </div>
          <div><h1 className="text-lg font-extrabold text-slate-800 leading-tight">GBIM</h1><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Internal Panel</p></div>
        </div>
        <div className="flex-1 p-4 space-y-1">
          {menuMap[role].map((item, idx) => (
            <button key={idx} onClick={() => setActiveMenu(item.name)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeMenu === item.name ? 'bg-blue-50 text-[#1E88E5]' : 'text-slate-500 hover:bg-slate-50'}`}>
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
            {/* Logic Rendering Berdasarkan activeMenu */}
            {activeMenu === 'Dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-100"><Users className="w-6 h-6 text-orange-600" /></div>
                  <div><p className="text-3xl font-extrabold text-slate-800">{verifikasiData.length}</p><p className="text-sm font-bold text-slate-500">Pendaftar Baru</p></div>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-100"><Clock className="w-6 h-6 text-blue-600" /></div>
                  <div><p className="text-3xl font-extrabold text-slate-800">{pengajuanList.length}</p><p className="text-sm font-bold text-slate-500">Pengajuan Aktif</p></div>
                </div>
              </div>
            )}

            {activeMenu === 'Verifikasi Pendaftar' && <VerifikasiPanel verifikasiData={verifikasiData} setVerifikasiData={setVerifikasiData} showToast={showToast} />}

            {(activeMenu === 'Daftar Pengajuan' || activeMenu === 'Pengajuan Saya' || activeMenu === 'Pengajuan Masuk') && <PengajuanPanel role={role} pengajuanList={pengajuanList} setPengajuanList={setPengajuanList} showToast={showToast} />}

            {activeMenu === 'Daftar Kegiatan' && <KegiatanPanel role={role} kegiatanList={kegiatanList} />}

            {activeMenu === 'Monitoring Dokumen' && (
              <div className="p-20 bg-white rounded-[32px] text-center border-2 border-dashed border-slate-200 text-slate-400 font-bold">
                Panel Monitoring Dokumen akan segera hadir.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}