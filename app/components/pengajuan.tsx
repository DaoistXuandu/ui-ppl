'use client';

import { useState } from 'react';
import { Search, CheckCircle, XCircle, Heart } from 'lucide-react';

export default function PengajuanPanel({ role, pengajuanList, setPengajuanList, showToast }: any) {
    const [searchQuery, setSearchQuery] = useState('');

    // Fitur pencarian filter berdasarkan Prodi atau Nama Guru Besar
    const filtered = pengajuanList.filter((p: any) =>
        p.prodi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.gbName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // --- BEHAVIOR ADMIN ---
    const updateStatus = (id: number, newStatus: string) => {
        setPengajuanList((prev: any) => prev.map((p: any) => p.id === id ? { ...p, status: newStatus } : p));
        showToast(`Status pengajuan diubah menjadi ${newStatus}`);
    };

    // --- BEHAVIOR GURU BESAR (Baru) ---
    const handleToggleMinat = (id: number) => {
        setPengajuanList((prev: any) => prev.map((p: any) => {
            if (p.id === id) {
                return { ...p, berminat: !p.berminat };
            }
            return p;
        }));
        showToast('Data preferensi minat berhasil disimpan ke database.', 'success');
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-extrabold text-slate-800">
                    {role === 'gb' ? 'Pengajuan Masuk' : 'Daftar Pengajuan'}
                </h2>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text" placeholder="Cari prodi atau nama Guru Besar..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                {filtered.length === 0 ? (
                    <div className="p-20 text-center text-slate-400 font-bold">Data Pengajuan tidak ditemukan.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                                <th className="p-5 pl-8">Program Studi Pengaju</th>
                                <th className="p-5">Guru Besar Tujuan</th>
                                <th className="p-5">Tanggal</th>
                                <th className="p-5">Status</th>
                                {/* Header Dinamis berdasarkan Role */}
                                {role === 'admin' && <th className="p-5 text-center pr-8">Aksi Admin</th>}
                                {role === 'gb' && <th className="p-5 text-center pr-8">Pernyataan Minat</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p: any) => (
                                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="p-5 pl-8 font-bold text-slate-800 text-sm">{p.prodi}</td>

                                    {/* Menampilkan Nama GB dan Asal Universitas Sesuai Request */}
                                    <td className="p-5">
                                        <p className="font-bold text-slate-800 text-sm">{p.gbName}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{p.gbUniv}</p>
                                    </td>

                                    <td className="p-5 text-xs font-bold text-slate-400">{p.tgl}</td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.status === 'Sedang diproses' ? 'bg-blue-50 text-blue-600' :
                                            p.status === 'Diterima' ? 'bg-green-50 text-green-600' :
                                                p.status === 'Ditolak' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {p.status}
                                        </span>
                                    </td>

                                    {/* Aksi Khusus Admin */}
                                    {role === 'admin' && (
                                        <td className="p-5 pr-8">
                                            <div className="flex justify-center gap-2">
                                                {p.status !== 'Selesai' && (
                                                    <>
                                                        <button onClick={() => updateStatus(p.id, 'Diterima')} className={`p-2 rounded-lg transition-all ${p.status === 'Diterima' ? 'bg-green-600 text-white shadow-md' : 'bg-green-50 text-green-600 hover:bg-green-100'}`} title="Terima"><CheckCircle className="w-4 h-4" /></button>
                                                        <button onClick={() => updateStatus(p.id, 'Ditolak')} className={`p-2 rounded-lg transition-all ${p.status === 'Ditolak' ? 'bg-red-600 text-white shadow-md' : 'bg-red-50 text-red-600 hover:bg-red-100'}`} title="Tolak"><XCircle className="w-4 h-4" /></button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    )}

                                    {/* Aksi Khusus Guru Besar (Sinyal Minat) */}
                                    {role === 'gb' && (
                                        <td className="p-5 pr-8">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleToggleMinat(p.id)}
                                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${p.berminat
                                                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <Heart className={`w-3.5 h-3.5 ${p.berminat ? 'fill-current' : ''}`} />
                                                    {p.berminat ? 'Berminat' : 'Saya berminat'}
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}