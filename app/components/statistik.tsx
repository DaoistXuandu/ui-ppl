'use client';

import { useState } from 'react';
import { BarChart3, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

export default function StatistikPanel() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isError, setIsError] = useState(false); // Simulate server error state
    const rowsPerPage = 10;

    // Dummy Data Statistik (Dibuat lebih dari 10 untuk testing pagination)
    const statsData = Array.from({ length: 15 }, (_, i) => {
        const total = Math.floor(Math.random() * 5) + 1;
        const selesai = Math.floor(Math.random() * total);
        const persentase = total === 0 ? 0 : Math.round((selesai / total) * 100);
        return {
            id: i + 1,
            prodi: `Program Studi Informatika ${i + 1} - Univ. Contoh`,
            totalAcara: total,
            acaraSelesai: selesai,
            persentase: persentase
        };
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = statsData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(statsData.length / rowsPerPage);

    if (isError) {
        return (
            <div className="p-20 bg-red-50 rounded-[32px] text-center border border-red-100 flex flex-col items-center animate-in fade-in">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-700 mb-2">Statistik tidak dapat ditampilkan saat ini.</h3>
                <p className="text-red-500 text-sm">Terjadi kesalahan saat mengkalkulasi data dari server.</p>
                <button onClick={() => setIsError(false)} className="mt-6 px-6 py-2 bg-white text-red-600 font-bold rounded-xl border border-red-200 hover:bg-red-100">Coba Lagi</button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Statistik Kinerja Prodi</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Landasan data kuantitatif untuk evaluasi dan apresiasi.</p>
                </div>
                <button onClick={() => setIsError(true)} className="text-xs text-slate-400 underline hover:text-slate-600">Simulasi Error Server</button>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <th className="p-5 pl-8">Nama Program Studi</th>
                            <th className="p-5 text-center">Total Acara</th>
                            <th className="p-5 text-center">Acara Selesai</th>
                            <th className="p-5 pr-8">Keterlibatan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((s: any) => (
                            <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td className="p-5 pl-8 font-bold text-slate-800 text-sm">{s.prodi}</td>
                                <td className="p-5 text-center font-extrabold text-[#1E88E5]">{s.totalAcara}</td>
                                <td className="p-5 text-center font-extrabold text-green-600">{s.acaraSelesai}</td>
                                <td className="p-5 pr-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                            <div className="bg-gradient-to-r from-blue-400 to-[#1E88E5] h-2.5 rounded-full" style={{ width: `${s.persentase}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-600 w-8">{s.persentase}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="p-5 px-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <p className="text-sm font-bold text-slate-500">
                        Menampilkan <span className="text-[#1E88E5]">{indexOfFirstRow + 1}-{Math.min(indexOfLastRow, statsData.length)}</span> dari <span className="text-slate-800">{statsData.length}</span> prodi
                    </p>
                    <div className="flex gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-blue-600 disabled:opacity-30 transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-blue-600 disabled:opacity-30 transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}