'use client';

import { useState } from 'react';
import { Search, Building2, User, ChevronRight, AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function DaftarGbPanel({ showToast, setActiveMenu }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageError, setPageError] = useState(false);
    const [selectedGB, setSelectedGB] = useState<any>(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');

    // Dummy Data GB
    const [gbList, setGbList] = useState([
        { id: 1, nama: 'Prof. Dr. Ahmad Setiawan', instansi: 'Institut Teknologi Bandung', kepakaran: 'Software Engineering', statusPengajuan: 'Belum Ada' },
        { id: 2, nama: 'Prof. Dr. Siti Nurhaliza', instansi: 'Universitas Brawijaya', kepakaran: 'Information Systems', statusPengajuan: 'Diterima' },
        { id: 3, nama: 'Prof. Dr. Budi Santoso', instansi: 'Universitas Gadjah Mada', kepakaran: 'Computer Networks', statusPengajuan: 'Ditolak' },
        { id: 4, nama: 'Prof. Dr. Gede Putra', instansi: 'Universitas Udayana', kepakaran: 'Data Science', statusPengajuan: 'Selesai' },
    ]);

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Math.random() < 0.1) return showToast('Error: Gagal terhubung ke server', 'error');

        // Mengubah status pengajuan pada list secara lokal
        setGbList(prev => prev.map(gb => gb.id === selectedGB.id ? { ...gb, statusPengajuan: 'Sedang diproses' } : gb));

        showToast('Permintaan kolaborasi telah dikirim!', 'success');
        setShowRequestModal(false);
        setSelectedGB(null);
        setRequestMessage('');
    };


    const filtered = gbList.filter(gb => gb.nama.toLowerCase().includes(searchQuery.toLowerCase()) || gb.kepakaran.toLowerCase().includes(searchQuery.toLowerCase()));

    if (pageError) {
        return (
            <div className="p-20 bg-red-50 rounded-[32px] text-center border border-red-100 flex flex-col items-center animate-in fade-in">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Sistem Tidak Dapat Memuat Data</h3>
                <p className="text-red-600 font-medium">Koneksi jaringan Anda buruk. Silakan coba lagi.</p>
                <button onClick={() => setPageError(false)} className="mt-6 px-6 py-2 bg-white text-red-600 font-bold rounded-xl border border-red-200">Coba Lagi</button>
            </div>
        );
    }


    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Daftar Guru Besar</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Cari dan ajukan kolaborasi pembinaan.</p>
                </div>
                <button onClick={() => setPageError(true)} className="text-xs font-bold text-slate-300 hover:text-red-400 underline transition-colors">Simulasi Error</button>
            </div>

            <div className="flex bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Cari nama atau kepakaran..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-blue-500 transition-all font-medium" />
                </div>
            </div>

            <div className="space-y-4">
                {filtered.length === 0 ? (
                    <p className="p-10 text-center text-slate-500 font-bold bg-white rounded-3xl border border-slate-100">Data Guru Besar belum tersedia.</p>
                ) : (
                    filtered.map(gb => (
                        <div key={gb.id} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:border-blue-200 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                            <div className="flex items-center gap-5 flex-1">
                                {/* Foto Profil / Inisial */}
                                <div className="w-16 h-16 bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shrink-0">
                                    {gb.nama.split(' ').filter((n: any) => !n.includes('.')).map((n: any) => n[0]).join('').slice(0, 2)}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-[#1E88E5] transition-colors">{gb.nama}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-slate-500">
                                        <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {gb.instansi}</span>
                                        <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> Prodi Informatika</span>
                                    </div>
                                    {/* List Keahlian */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {gb.kepakaran.split(',').map((skill: string, idx: number) => (
                                            <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-100">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi & Transformasi Status */}
                            <div className="w-full md:w-auto shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                                {['Belum Ada', 'Ditolak', 'Selesai'].includes(gb.statusPengajuan) ? (
                                    <button
                                        onClick={() => { setSelectedGB(gb); setShowRequestModal(true); }}
                                        className="w-full md:w-auto px-4 py-2 bg-[#1E88E5] text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition-all duration-200 text-xs flex items-center justify-center gap-2"
                                    >
                                        Ajukan Guru Besar
                                    </button>
                                ) : (
                                    <div className="w-full md:w-auto px-4 py-2 bg-emerald-50 text-emerald-600 font-bold rounded-xl border border-emerald-100 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider animate-in fade-in zoom-in duration-300">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Sudah Direquest
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Konfirmasi yang sempat terhapus */}
            {showRequestModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="p-8 pb-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-800">Konfirmasi Pengajuan</h3>
                                <p className="text-sm text-slate-500 mt-1">Mengajukan {selectedGB?.nama}?</p>
                            </div>
                            <button onClick={() => setShowRequestModal(false)} className="p-2 text-slate-400 hover:text-red-500"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleRequestSubmit}>
                            <div className="p-8">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pesan Tambahan (Opsional)</label>
                                <textarea rows={4} value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} placeholder="Tuliskan tujuan pembinaan..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm resize-none"></textarea>
                            </div>
                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                                <button type="button" onClick={() => setShowRequestModal(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-200 rounded-xl w-1/3">Batal</button>
                                <button type="submit" className="px-8 py-3 font-bold bg-[#1E88E5] text-white hover:bg-blue-700 rounded-xl w-2/3 shadow-md">Kirim Permintaan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}