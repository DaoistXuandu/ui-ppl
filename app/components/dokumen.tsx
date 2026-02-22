'use client';

import { useState } from 'react';
import {
    Search, Filter, FileText, CheckCircle, XCircle,
    ChevronDown, ChevronUp, FileSignature, CheckSquare
} from 'lucide-react';

export default function DokumenPanel({ showToast }: any) {
    const [searchKegiatan, setSearchKegiatan] = useState('');
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    // --- DATA DUMMY (Sesuai Kode Mas Bro) ---
    const [kegiatanDokumen, setKegiatanDokumen] = useState([
        {
            id: 101,
            namaKegiatan: 'Pembinaan Kurikulum OBE Batch I',
            suratPernyataan: {
                isUploaded: true,
                persetujuanGB: [
                    { nama: 'Prof. Dr. Ahmad Setiawan', status: true },
                    { nama: 'Prof. Dr. Budi Santoso', status: false }
                ]
            },
            laporanAkhir: [
                { id: 1, prodi: 'Informatika - Telkom', gbTarget: 'Prof. Dr. Ahmad Setiawan', isUploaded: true, isApproved: true },
                { id: 2, prodi: 'Informatika - Telkom', gbTarget: 'Prof. Dr. Budi Santoso', isUploaded: false, isApproved: false },
                { id: 3, prodi: 'Informatika - UI', gbTarget: 'Prof. Dr. Ahmad Setiawan', isUploaded: true, isApproved: true },
                { id: 4, prodi: 'Informatika - UI', gbTarget: 'Prof. Dr. Budi Santoso', isUploaded: true, isApproved: false }
            ]
        },
        {
            id: 102,
            namaKegiatan: 'Workshop Penjaminan Mutu Internal',
            suratPernyataan: {
                isUploaded: false,
                persetujuanGB: [
                    { nama: 'Prof. Dr. Siti Nurhaliza', status: false }
                ]
            },
            laporanAkhir: [
                { id: 3, prodi: 'Teknik Komputer - ITS', gbTarget: 'Prof. Dr. Siti Nurhaliza', isUploaded: false, isApproved: false }
            ]
        },
        // Data Dummy Tambahan yang sudah selesai untuk ngetes filter baru
        {
            id: 103,
            namaKegiatan: 'Review RPS Nasional APTIKOM',
            suratPernyataan: {
                isUploaded: true,
                persetujuanGB: [{ nama: 'Prof. Dr. Ahmad Setiawan', status: true }]
            },
            laporanAkhir: [
                { id: 5, prodi: 'Sains Data - Unair', gbTarget: 'Prof. Dr. Ahmad Setiawan', isUploaded: true, isApproved: true }
            ]
        }
    ]);

    const toggleRow = (id: number) => {
        setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
    };

    const isSuratFullyApproved = (persetujuanGB: any[]) => {
        if (persetujuanGB.length === 0) return false;
        return persetujuanGB.every(gb => gb.status === true);
    };

    const isLaporanFullyComplete = (laporanList: any[]) => {
        if (laporanList.length === 0) return false;
        return laporanList.every(l => l.isUploaded && l.isApproved);
    };

    // =========================================================
    // LOGIKA FILTER DIPERBARUI + SUDUH SEMUA
    // =========================================================
    const filtered = kegiatanDokumen.filter(k => {
        const matchNama = k.namaKegiatan.toLowerCase().includes(searchKegiatan.toLowerCase());

        let matchFilter = true;
        const suratComplete = k.suratPernyataan.isUploaded && isSuratFullyApproved(k.suratPernyataan.persetujuanGB);
        const laporanComplete = isLaporanFullyComplete(k.laporanAkhir);

        if (filterStatus === 'Belum Upload Surat') {
            matchFilter = !k.suratPernyataan.isUploaded;
        } else if (filterStatus === 'Belum Persetujuan Surat') {
            matchFilter = k.suratPernyataan.persetujuanGB.some(gb => !gb.status);
        } else if (filterStatus === 'Belum Upload Laporan') {
            matchFilter = k.laporanAkhir.some(l => !l.isUploaded);
        } else if (filterStatus === 'Belum Persetujuan Laporan') {
            matchFilter = k.laporanAkhir.some(l => !l.isApproved);
        } else if (filterStatus === 'Sudah Semua') {
            matchFilter = suratComplete && laporanComplete; // Wajib keduanya beres
        }

        return matchNama && matchFilter;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Monitoring Dokumen Kegiatan</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Pantau kelengkapan dokumen administratif berdasarkan entitas kegiatan.</p>
            </div>

            {/* Filter Area - Updated with "Sudah Semua" */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari nama kegiatan..."
                        value={searchKegiatan}
                        onChange={(e) => setSearchKegiatan(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-blue-500 transition-all font-medium"
                    />
                </div>
                <div className="relative w-full md:w-72">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <select
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="Semua">Semua Status</option>
                        <option value="Sudah Semua">Sudah Semua (Lengkap)</option>
                        <option value="Belum Upload Surat">Belum Upload Surat</option>
                        <option value="Belum Persetujuan Surat">Belum Persetujuan Surat</option>
                        <option value="Belum Upload Laporan">Belum Upload Laporan Akhir</option>
                        <option value="Belum Persetujuan Laporan">Belum Persetujuan Laporan</option>
                    </select>
                </div>
            </div>

            {/* Area Data Kegiatan */}
            <div className="space-y-4">
                {filtered.length === 0 ? (
                    <div className="p-20 bg-white rounded-[32px] border border-slate-100 text-center flex flex-col items-center">
                        <FileText className="w-12 h-12 text-slate-300 mb-3" />
                        <p className="text-slate-500 font-bold text-lg">Data tidak ditemukan.</p>
                    </div>
                ) : (
                    filtered.map((kegiatan) => {
                        const isExpanded = expandedRows.includes(kegiatan.id);
                        const suratApproved = isSuratFullyApproved(kegiatan.suratPernyataan.persetujuanGB);
                        const laporanComplete = isLaporanFullyComplete(kegiatan.laporanAkhir);

                        return (
                            <div key={kegiatan.id} className="bg-white rounded-[24px] border border-slate-200 overflow-hidden shadow-sm transition-all">
                                <div
                                    onClick={() => toggleRow(kegiatan.id)}
                                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                                >
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">ID: #{kegiatan.id}</p>
                                        <h3 className="font-extrabold text-slate-800 text-base">{kegiatan.namaKegiatan}</h3>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex gap-4">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Surat Pernyataan</span>
                                                <span className={`text-xs font-bold ${kegiatan.suratPernyataan.isUploaded && suratApproved ? 'text-green-600' : 'text-red-500'}`}>
                                                    {kegiatan.suratPernyataan.isUploaded && suratApproved ? 'Lengkap' : 'Belum Selesai'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Laporan Akhir</span>
                                                <span className={`text-xs font-bold ${laporanComplete ? 'text-green-600' : 'text-red-500'}`}>
                                                    {laporanComplete ? 'Lengkap' : 'Belum Selesai'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-2 bg-slate-100 rounded-full text-slate-500">
                                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="p-6 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* PANEL SURAT PERNYATAAN */}
                                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                                    <FileSignature className="w-4 h-4 text-blue-500" /> Surat Pernyataan Bersama
                                                </h4>
                                                <div className="mb-4 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    <span className="text-sm font-bold text-slate-600">Status Upload</span>
                                                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${kegiatan.suratPernyataan.isUploaded ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                                                        {kegiatan.suratPernyataan.isUploaded ? 'Sudah Diupload' : 'Belum Diupload'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Persetujuan Guru Besar</span>
                                                    <div className="space-y-2">
                                                        {kegiatan.suratPernyataan.persetujuanGB.map((gb, idx) => (
                                                            <div key={idx} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded-lg">
                                                                <span className="font-medium text-slate-700">{gb.nama}</span>
                                                                {gb.status ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* PANEL LAPORAN AKHIR */}
                                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                                    <CheckSquare className="w-4 h-4 text-orange-500" /> Laporan Akhir (Per Prodi)
                                                </h4>
                                                <div className="space-y-3">
                                                    {kegiatan.laporanAkhir.map(lap => (
                                                        <div key={lap.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                            <div className="mb-2">
                                                                <p className="text-[11px] font-bold text-slate-800">{lap.prodi}</p>
                                                                <p className="text-[10px] text-slate-500">Target: {lap.gbTarget}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-xs font-bold mt-2 pt-2 border-t border-slate-200 border-dashed">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="text-slate-500">Upload:</span>
                                                                    {lap.isUploaded ? <span className="text-green-600">Selesai</span> : <span className="text-red-500">Belum</span>}
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="text-slate-500">Persetujuan:</span>
                                                                    {lap.isApproved ? <span className="text-green-600">Disetujui</span> : <span className="text-red-500">Menunggu</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}