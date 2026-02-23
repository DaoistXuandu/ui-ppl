'use client';

import { useState } from 'react';
import {
    Search, Plus, Filter, MapPin, Users, Eye, Edit3, X,
    CheckCircle, Calendar, GraduationCap, Building2, Minus, AlertTriangle,
    User
} from 'lucide-react';

export default function KegiatanPanel({ role, kegiatanList: initialKegiatanList, pengajuanList, showToast }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [showModal, setShowModal] = useState(false);

    // --- STATE SIMULASI ERROR & MOCK STATUS ---
    const [pageError, setPageError] = useState(false);
    const [detailKegiatan, setDetailKegiatan] = useState<any>(null);
    const [mockSuratStatus, setMockSuratStatus] = useState<'Belum' | 'Menunggu Persetujuan' | 'Disetujui' | 'Revisi'>('Belum');
    const [mockLaporanStatus, setMockLaporanStatus] = useState<'Belum' | 'Menunggu Persetujuan' | 'Disetujui'>('Belum');

    const handleOpenDetail = (k: any) => {
        setDetailKegiatan(k);
        // Simulasi khusus ID 103 (Review Borang) status suratnya "Revisi/Ditolak"
        if (k.id === 103) {
            setMockSuratStatus('Revisi');
        } else {
            setMockSuratStatus(k.status === 'Administrasi' ? 'Belum' : 'Disetujui');
        }
        setMockLaporanStatus(k.status === 'Selesai' ? 'Disetujui' : 'Belum');
    };

    const handleSimulateUpload = (type: 'Surat' | 'Laporan' | 'Sertifikat') => {
        if (Math.random() < 0.2) return showToast(`Error server gagal upload ${type}.`, 'error');

        if (type === 'Surat') setMockSuratStatus('Menunggu Persetujuan');
        if (type === 'Laporan') setMockLaporanStatus('Menunggu Persetujuan');

        showToast(`${type} berhasil diunggah! Status: Menunggu Persetujuan`, 'success');
    };

    // --- DATA DUMMY KEGIATAN ---
    const [kegiatanData, setKegiatanData] = useState(initialKegiatanList && initialKegiatanList.length > 0 ? initialKegiatanList : [
        { id: 101, nama: 'Pembinaan Kurikulum OBE Batch I', waktu: 'GBIM Batch I - 2026', tempat: 'Daring (Zoom)', partisipan: 'Informatika - Telkom', pembina: 'Prof. Ahmad', status: 'Sedang Berjalan' },
        { id: 102, nama: 'Workshop Penjaminan Mutu Internal', waktu: 'GBIM Khusus APTIKOM - 2026', tempat: 'Jakarta', partisipan: 'Sistem Informasi - UI', pembina: 'Prof. Siti', status: 'Selesai' },
        { id: 103, nama: 'Review Borang Akreditasi Mandiri', waktu: 'GBIM Batch II - 2026', tempat: 'Hybrid', partisipan: 'Teknik Komputer - ITS', pembina: 'Prof. Budi', status: 'Administrasi' },
        { id: 104, nama: 'Sinkronisasi CPL Standar APTIKOM', waktu: 'GBIM Batch II - 2026', tempat: 'Bandung', partisipan: 'Sains Data - Unair', pembina: 'Prof. Gede', status: 'Administrasi' },
    ]);

    // --- STATE FORM BUAT KEGIATAN ---
    const [newKegiatan, setNewKegiatan] = useState({ nama: '', periode: '', tempat: '' });
    const [selectedProdis, setSelectedProdis] = useState<string[]>([]);
    const [selectedPembinas, setSelectedPembinas] = useState<string[]>([]);
    const [inputSearchProdi, setInputSearchProdi] = useState('');
    const [inputSearchGB, setInputSearchGB] = useState('');
    const [searchPengajuanModal, setSearchPengajuanModal] = useState('');

    // Dummy Data Periode untuk Dropdown
    const daftarPeriode = [
        "GBIM Batch I - 2026",
        "GBIM Batch II - 2026",
        "GBIM Khusus APTIKOM - 2026"
    ];

    const dummyPengajuanDiterima = [
        { id: 1, prodi: 'Informatika - Univ. Telkom', gbName: 'Prof. Dr. Ahmad Setiawan' },
        { id: 2, prodi: 'Sistem Informasi - UI', gbName: 'Prof. Dr. Siti Nurhaliza' },
        { id: 3, prodi: 'Teknik Komputer - ITS', gbName: 'Prof. Dr. Budi Santoso' },
        { id: 4, prodi: 'Sains Data - Unair', gbName: 'Prof. Dr. Gede Putra' },
    ];

    const pengajuanFiltered = dummyPengajuanDiterima.filter(p =>
        p.prodi.toLowerCase().includes(searchPengajuanModal.toLowerCase()) ||
        p.gbName.toLowerCase().includes(searchPengajuanModal.toLowerCase())
    );

    const isFormValid = newKegiatan.nama && newKegiatan.periode && newKegiatan.tempat && selectedProdis.length > 0 && selectedPembinas.length > 0;

    const addProdi = (val: string) => {
        if (val.trim() && !selectedProdis.includes(val.trim())) {
            setSelectedProdis([...selectedProdis, val.trim()]);
            setInputSearchProdi('');
        }
    };

    const addPembina = (val: string) => {
        if (val.trim() && !selectedPembinas.includes(val.trim())) {
            setSelectedPembinas([...selectedPembinas, val.trim()]);
            setInputSearchGB('');
        }
    };

    const removeProdi = (val: string) => setSelectedProdis(selectedProdis.filter(item => item !== val));
    const removePembina = (val: string) => setSelectedPembinas(selectedPembinas.filter(item => item !== val));

    const addFromPengajuan = (p: any) => {
        addProdi(p.prodi);
        addPembina(p.gbName);
        showToast(`Ditambahkan: ${p.prodi} & ${p.gbName}`, 'success');
    };

    // --- STATE MODE EDIT ---
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // --- FUNGSI SUBMIT FORM ---
    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && editId) {
            // Update Kegiatan yang sudah ada
            setKegiatanData((prev: any) => prev.map((k: any) => k.id === editId ? {
                ...k,
                nama: newKegiatan.nama,
                waktu: newKegiatan.periode, // Map kembali ke 'waktu' agar kompatibel dengan tabel lama
                tempat: newKegiatan.tempat,
                partisipan: selectedProdis.join(', '),
                pembina: selectedPembinas.join(', ')
            } : k));
            showToast('Kegiatan berhasil diperbarui!', 'success');
        } else {
            // Buat Kegiatan Baru
            const created = {
                id: kegiatanData.length + 101,
                nama: newKegiatan.nama,
                waktu: newKegiatan.periode, // Map ke field waktu untuk render tabel
                tempat: newKegiatan.tempat,
                partisipan: selectedProdis.join(', '),
                pembina: selectedPembinas.join(', '),
                status: 'Administrasi'
            };
            setKegiatanData([created, ...kegiatanData]);
            showToast('Kegiatan baru berhasil dibuat!', 'success');
        }

        // Reset state form
        setShowModal(false);
        setIsEditMode(false);
        setEditId(null);
        setNewKegiatan({ nama: '', periode: '', tempat: '' });
        setSelectedProdis([]);
        setSelectedPembinas([]);
    };

    // --- FUNGSI BUKA MODAL EDIT ---
    const handleOpenEdit = () => {
        setIsEditMode(true);
        setEditId(detailKegiatan.id);
        // Pre-load data ke form
        setNewKegiatan({
            nama: detailKegiatan.nama,
            periode: detailKegiatan.waktu, // Load data 'waktu' ke input 'periode'
            tempat: detailKegiatan.tempat
        });
        setSelectedProdis(detailKegiatan.partisipan.split(',').map((p: string) => p.trim()));
        setSelectedPembinas(detailKegiatan.pembina.split(',').map((p: string) => p.trim()));

        setDetailKegiatan(null); // Tutup modal detail
        setShowModal(true);      // Buka modal form
    };

    const filtered = kegiatanData.filter((k: any) => {
        const matchName = k.nama.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = filterStatus === 'Semua' || k.status === filterStatus;
        return matchName && matchStatus;
    });

    if (pageError) {
        return (
            <div className="p-20 bg-red-50 rounded-[32px] text-center border border-red-100 flex flex-col items-center animate-in fade-in duration-500">
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">Sistem Tidak Dapat Memuat Data</h3>
                <p className="text-red-600 font-medium max-w-md">Koneksi jaringan Anda buruk atau server sedang bermasalah. Silakan muat ulang halaman atau coba beberapa saat lagi.</p>
                <button onClick={() => setPageError(false)} className="mt-6 px-6 py-3 bg-white text-red-600 font-bold rounded-xl border border-red-200 hover:bg-red-100 transition-all shadow-sm">
                    Coba Muat Ulang
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Daftar Kegiatan</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                        {role === 'admin' ? 'Pantau dan kelola agenda pembinaan perguruan tinggi.' : 'Pantau data kegiatan yang Anda ikuti.'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setPageError(true)} className="text-xs font-bold text-slate-400 hover:text-red-500 underline">Simulasi Error Load</button>
                    {role === 'admin' && (
                        <button onClick={() => {
                            setIsEditMode(false);
                            setEditId(null);
                            setNewKegiatan({ nama: '', periode: '', tempat: '' });
                            setSelectedProdis([]);
                            setSelectedPembinas([]);
                            setShowModal(true);
                        }} className="flex items-center gap-2 px-6 py-3 bg-[#1E88E5] text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
                            <Plus className="w-5 h-5" /> Buat Kegiatan
                        </button>
                    )}
                </div>
            </div>

            {/* Area Filter */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" placeholder="Cari nama kegiatan..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="relative w-full md:w-64">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 appearance-none cursor-pointer" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="Semua">Semua Status</option>
                        <option value="Administrasi">Administrasi</option>
                        <option value="Sedang Berjalan">Sedang Berjalan</option>
                        <option value="Selesai">Selesai</option>
                    </select>
                </div>
            </div>

            {/* Tabel List Kegiatan */}
            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <th className="p-5 pl-8">Nama Kegiatan</th>
                            <th className="p-5">Periode & Lokasi</th>
                            <th className="p-5">Status</th>
                            <th className="p-5 text-center pr-8">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((k: any) => (
                            <tr key={k.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="p-5 pl-8">
                                    <p className="font-bold text-slate-800 text-sm">{k.nama}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">ID: #{k.id}</p>
                                </td>
                                <td className="p-5">
                                    <p className="text-sm font-bold text-slate-700">{k.waktu || 'Belum diatur'}</p>
                                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {k.tempat}</p>
                                </td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${k.status === 'Sedang Berjalan' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                        k.status === 'Selesai' ? 'bg-green-50 text-green-600 border border-green-100' :
                                            'bg-orange-50 text-orange-600 border border-orange-100'
                                        }`}>
                                        {k.status}
                                    </span>
                                </td>
                                <td className="p-5 pr-8 text-center">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleOpenDetail(k)} className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-blue-600 hover:text-white transition-all" title="Detail Kegiatan">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL DETAIL KEGIATAN & UPLOAD */}
            {detailKegiatan && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-[800px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">

                        {/* Header Modal - Tombol Edit Admin Pindah ke Sini */}
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                            <h3 className="text-xl font-extrabold text-slate-800">Detail Kegiatan</h3>
                            <div className="flex items-center gap-3">
                                {role === 'admin' && (
                                    <button onClick={handleOpenEdit} className="px-4 py-2 bg-amber-50 text-amber-600 font-bold rounded-xl hover:bg-amber-100 transition-all flex items-center gap-2 text-sm">
                                        <Edit3 className="w-4 h-4" /> Edit Kegiatan
                                    </button>
                                )}
                                <button onClick={() => setDetailKegiatan(null)} className="p-2 text-slate-400 hover:text-red-500 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Info General */}
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black text-slate-800">{detailKegiatan.nama}</h2>
                                <p className="text-sm font-medium text-slate-500">Periode: {detailKegiatan.waktu} | Lokasi: {detailKegiatan.tempat}</p>
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold uppercase">{detailKegiatan.status}</span>
                            </div>

                            {/* LIST PARTISIPAN & PEMBINA */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Prodi Partisipan</p>
                                    <div className="flex flex-wrap gap-2">
                                        {detailKegiatan.partisipan.split(',').map((p: string, idx: number) => (
                                            <span key={idx} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">{p.trim()}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> Guru Besar Pembina</p>
                                    <div className="flex flex-wrap gap-2">
                                        {detailKegiatan.pembina.split(',').map((gb: string, idx: number) => (
                                            <span key={idx} className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg">{gb.trim()}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <h4 className="font-bold text-slate-800 border-b pb-2">Dokumen Administratif</h4>

                                {/* 1. SURAT PERNYATAAN (Bisa upload, bisa lihat komen revisi) */}
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col gap-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="font-bold text-sm">Surat Pernyataan Bersama</p>
                                            <p className="text-xs text-slate-500 mt-1">Status: <span className={`font-bold ${mockSuratStatus === 'Revisi' ? 'text-red-600' : 'text-slate-700'}`}>{mockSuratStatus}</span></p>
                                        </div>
                                        {role === 'kaprodi' && ['Belum', 'Revisi'].includes(mockSuratStatus) && (
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <input type="file" className="text-xs file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 w-full sm:w-auto" />
                                                <button onClick={() => handleSimulateUpload('Surat')} className="px-4 py-2 bg-[#1E88E5] text-white text-xs font-bold rounded-xl hover:bg-blue-600 shrink-0">Upload</button>
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTOH KOMENTAR JIKA DITOLAK/REVISI */}
                                    {mockSuratStatus === 'Revisi' && (
                                        <div className="mt-2 p-4 bg-red-50 border border-red-100 rounded-xl space-y-3">
                                            <p className="text-xs font-bold text-red-600 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Ditolak - Membutuhkan Revisi</p>
                                            <div className="bg-white p-4 rounded-lg border border-red-50 shadow-sm">
                                                <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-widest">Komentar dari: {detailKegiatan.pembina.split(',')[0]}</span>
                                                <p className="text-sm text-slate-700 italic">"Format pada halaman kedua belum sesuai, serta tanda tangan perwakilan kaprodi belum tercantum. Mohon perbaiki dan unggah ulang."</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 2. LAPORAN KEGIATAN (MUNCUL PER GB) */}
                                {mockSuratStatus === 'Disetujui' && (
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                        <div>
                                            <p className="font-bold text-sm">Laporan Kegiatan (Per Pembina)</p>
                                            <p className="text-xs text-slate-500 mt-0.5">Laporan diunggah independen untuk masing-masing Guru Besar.</p>
                                        </div>

                                        {detailKegiatan.pembina.split(',').map((gb: string, idx: number) => (
                                            <div key={`lap-${idx}`} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-100">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-orange-500" /> {gb.trim()}</p>
                                                    <p className="text-[10px] text-slate-500 mt-1">Status: {mockLaporanStatus}</p>
                                                </div>
                                                {role === 'kaprodi' && (detailKegiatan.status === 'Sedang Berjalan' || mockLaporanStatus === 'Belum') && (
                                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                                        <input type="file" className="text-xs file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-orange-50 file:text-orange-700 w-full sm:w-auto" />
                                                        <button onClick={() => handleSimulateUpload('Laporan')} className="px-3 py-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-lg hover:bg-orange-600 shrink-0">Submit</button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 3. SERTIFIKAT (MUNCUL PER PRODI & GB) */}
                                {detailKegiatan.status === 'Selesai' && (
                                    <div className="p-5 bg-green-50 rounded-2xl border border-green-200 space-y-4">
                                        <div>
                                            <p className="font-bold text-sm text-green-800">E-Sertifikat Partisipan & Pembina</p>
                                            <p className="text-xs text-green-600 mt-1">Dokumen terakhir yang diunggah akan menggantikan file sebelumnya.</p>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Render Slot Sertifikat untuk Prodi */}
                                            {detailKegiatan.partisipan.split(',').map((prodi: string, idx: number) => (
                                                <div key={`sertif-prodi-${idx}`} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-3 rounded-xl border border-green-100">
                                                    <p className="text-xs font-bold text-slate-700 flex items-center gap-2"><Building2 className="w-4 h-4 text-green-500" /> {prodi.trim()}</p>
                                                    {role === 'admin' ? (
                                                        <div className="flex gap-2 w-full sm:w-auto">
                                                            <input type="file" className="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-green-50 file:text-green-700 w-full sm:w-auto" />
                                                            <button onClick={() => handleSimulateUpload('Sertifikat')} className="px-3 py-1.5 bg-green-600 text-white text-[10px] font-bold rounded-lg hover:bg-green-700 shrink-0">Upload</button>
                                                        </div>
                                                    ) : (
                                                        <button className="px-4 py-1.5 border border-green-300 text-green-700 text-[10px] font-bold rounded-lg bg-white hover:bg-green-100 transition-colors">Download</button>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Render Slot Sertifikat untuk GB */}
                                            {detailKegiatan.pembina.split(',').map((gb: string, idx: number) => (
                                                <div key={`sertif-gb-${idx}`} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-3 rounded-xl border border-green-100">
                                                    <p className="text-xs font-bold text-slate-700 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-green-500" /> {gb.trim()}</p>
                                                    {role === 'admin' ? (
                                                        <div className="flex gap-2 w-full sm:w-auto">
                                                            <input type="file" className="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-green-50 file:text-green-700 w-full sm:w-auto" />
                                                            <button onClick={() => handleSimulateUpload('Sertifikat')} className="px-3 py-1.5 bg-green-600 text-white text-[10px] font-bold rounded-lg hover:bg-green-700 shrink-0">Upload</button>
                                                        </div>
                                                    ) : (
                                                        <button className="px-4 py-1.5 border border-green-300 text-green-700 text-[10px] font-bold rounded-lg bg-white hover:bg-green-100 transition-colors">Download</button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL BUAT / EDIT KEGIATAN (HANYA ADMIN) */}
            {showModal && role === 'admin' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[40px] w-full max-w-[950px] shadow-2xl flex overflow-hidden animate-in zoom-in-95 h-[85vh]">

                        {/* Sidebar Modal: Quick Add */}
                        <div className="w-[350px] bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
                            <h3 className="text-lg font-extrabold text-slate-800 mb-4">Pengajuan Diterima</h3>
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input type="text" placeholder="Cari prodi/GB..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none" value={searchPengajuanModal} onChange={(e) => setSearchPengajuanModal(e.target.value)} />
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                {pengajuanFiltered.map(p => (
                                    <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-800 mb-1">{p.prodi}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">{p.gbName}</p>
                                            </div>
                                            <button type="button" onClick={() => addFromPengajuan(p)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Plus className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Form Modal */}
                        <div className="flex-1 p-10 overflow-y-auto relative">
                            <button type="button" onClick={() => setShowModal(false)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>

                            {/* Judul Form Dinamis */}
                            <h3 className="text-2xl font-extrabold text-slate-800 mb-10">
                                {isEditMode ? 'Edit Entitas Kegiatan' : 'Form Entitas Kegiatan'}
                            </h3>

                            <form onSubmit={handleSubmitForm} className="space-y-6 max-w-[500px] mx-auto">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Kegiatan</label>
                                    <input required type="text" value={newKegiatan.nama} onChange={(e) => setNewKegiatan({ ...newKegiatan, nama: e.target.value })} placeholder="Input Nama Kegiatan..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 text-sm font-bold transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Periode Kegiatan</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                                        <select
                                            required
                                            value={newKegiatan.periode}
                                            onChange={(e) => setNewKegiatan({ ...newKegiatan, periode: e.target.value })}
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 text-sm font-bold transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>-- Pilih Periode Pelaksanaan --</option>
                                            {daftarPeriode.map((p, i) => (
                                                <option key={i} value={p}>{p}</option>
                                            ))}
                                            {/* Opsi tambahan untuk menampung data lama saat Edit yang mungkin tidak ada di daftarPeriode */}
                                            {isEditMode && newKegiatan.periode && !daftarPeriode.includes(newKegiatan.periode) && (
                                                <option value={newKegiatan.periode}>{newKegiatan.periode}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tempat</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input required type="text" value={newKegiatan.tempat} onChange={(e) => setNewKegiatan({ ...newKegiatan, tempat: e.target.value })} placeholder="Contoh: Hybrid / Zoom" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 text-sm font-bold transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-50">
                                    <label className="text-[10px] font-bold text-[#1E88E5] uppercase tracking-widest ml-1">Cari & Tambah Partisipan (Prodi)</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input type="text" placeholder="Ketik prodi lalu tekan enter..." value={inputSearchProdi} onChange={(e) => setInputSearchProdi(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProdi(inputSearchProdi))} className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 text-sm font-bold" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProdis.map(item => (
                                            <button key={item} type="button" onClick={() => removeProdi(item)} className="flex items-center gap-2 bg-blue-50 text-[#1E88E5] border border-blue-100 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-red-50 hover:text-red-600 transition-all"><Minus className="w-3 h-3" /> {item}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-50">
                                    <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest ml-1">Cari & Tambah Pembina (GB)</label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input type="text" placeholder="Ketik nama GB lalu tekan enter..." value={inputSearchGB} onChange={(e) => setInputSearchGB(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPembina(inputSearchGB))} className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-orange-500 text-sm font-bold" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPembinas.map(item => (
                                            <button key={item} type="button" onClick={() => removePembina(item)} className="flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-red-50 hover:text-red-600 transition-all"><Minus className="w-3 h-3" /> {item}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button type="submit" disabled={!isFormValid} className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${isFormValid ? 'bg-gradient-to-r from-[#1E88E5] to-[#1565C0] text-white hover:shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                                        {isEditMode ? 'Simpan Perubahan' : 'Buat Kegiatan'} <CheckCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}