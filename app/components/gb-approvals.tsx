'use client';

import { useState } from 'react';
import { FileSignature, CheckSquare, Download, CheckCircle, XCircle, X } from 'lucide-react';

export default function GbApprovalsPanel({ showToast }: any) {
    // Data Dummy Dokumen Menunggu Persetujuan
    const [suratList, setSuratList] = useState([
        { id: 1, prodi: 'Informatika - Telkom', kegiatan: 'Pembinaan Kurikulum OBE Batch I', file: 'Draft_Surat_Pernyataan_v1.pdf' }
    ]);
    const [laporanList, setLaporanList] = useState([
        { id: 2, prodi: 'Sistem Informasi - UI', kegiatan: 'Workshop Penjaminan Mutu Internal', file: 'Laporan_Akhir_UI.pdf' }
    ]);

    // State Modal Revisi
    const [revisiModal, setRevisiModal] = useState<{ show: boolean, id: number | null, type: 'surat' | 'laporan', catatan: string }>({ show: false, id: null, type: 'surat', catatan: '' });

    // Fungsi Persetujuan (Berhasil mengubah status kegiatan)
    const handleApprove = (id: number, type: 'surat' | 'laporan') => {
        if (Math.random() < 0.2) return showToast('Error server: Gagal memproses persetujuan dokumen.', 'error'); // Simulasi Error

        if (type === 'surat') {
            setSuratList(prev => prev.filter(s => s.id !== id));
            showToast('Surat Disetujui! Status kegiatan kini "Sedang Berjalan".', 'success');
        } else {
            setLaporanList(prev => prev.filter(l => l.id !== id));
            showToast('Laporan Disetujui! Status kegiatan berubah menjadi "Selesai".', 'success');
        }
    };

    // Fungsi Submit Revisi
    const handleRevisiSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Math.random() < 0.2) return showToast('Error jaringan: Gagal mengirim catatan revisi.', 'error'); // Simulasi Error

        if (revisiModal.type === 'surat') setSuratList(prev => prev.filter(s => s.id !== revisiModal.id));
        else setLaporanList(prev => prev.filter(l => l.id !== revisiModal.id));

        showToast('Status diubah menjadi Revisi. Catatan berhasil dikirim ke Prodi.', 'success');
        setRevisiModal({ show: false, id: null, type: 'surat', catatan: '' });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-800">Persetujuan Dokumen</h2>
                <p className="text-sm text-slate-500 font-medium">Verifikasi dan setujui komitmen serta laporan dari Prodi binaan Anda.</p>
            </div>

            {/* TABEL SURAT PERNYATAAN */}
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2"><FileSignature className="w-5 h-5 text-blue-500" /> Menunggu Persetujuan Surat Pernyataan</h3>
                {suratList.length === 0 ? <p className="text-slate-400 italic text-sm">Tidak ada surat pernyataan yang menunggu persetujuan.</p> : (
                    <div className="space-y-4">
                        {suratList.map(s => (
                            <div key={s.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h4 className="font-bold text-slate-800">{s.prodi}</h4>
                                    <p className="text-xs text-slate-500">{s.kegiatan}</p>
                                    <button className="mt-2 text-xs font-bold text-[#1E88E5] flex items-center gap-1 hover:underline"><Download className="w-3 h-3" /> Lihat / Download {s.file}</button>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button onClick={() => setRevisiModal({ show: true, id: s.id, type: 'surat', catatan: '' })} className="flex-1 md:flex-none px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100">Minta Revisi</button>
                                    <button onClick={() => handleApprove(s.id, 'surat')} className="flex-1 md:flex-none px-4 py-2 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600">Setujui Dokumen</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* TABEL LAPORAN AKHIR */}
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2"><CheckSquare className="w-5 h-5 text-orange-500" /> Menunggu Verifikasi Laporan Kegiatan</h3>
                {laporanList.length === 0 ? <p className="text-slate-400 italic text-sm">Tidak ada laporan yang menunggu verifikasi.</p> : (
                    <div className="space-y-4">
                        {laporanList.map(l => (
                            <div key={l.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h4 className="font-bold text-slate-800">{l.prodi}</h4>
                                    <p className="text-xs text-slate-500">{l.kegiatan}</p>
                                    <button className="mt-2 text-xs font-bold text-orange-500 flex items-center gap-1 hover:underline"><Download className="w-3 h-3" /> Lihat / Download {l.file}</button>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <button onClick={() => setRevisiModal({ show: true, id: l.id, type: 'laporan', catatan: '' })} className="flex-1 md:flex-none px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100">Revisi Laporan</button>
                                    <button onClick={() => handleApprove(l.id, 'laporan')} className="flex-1 md:flex-none px-4 py-2 bg-[#1E88E5] text-white rounded-xl font-bold text-sm hover:bg-blue-600">Setujui Laporan</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL MINTA REVISI */}
            {revisiModal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-extrabold text-slate-800">Catatan Revisi</h3>
                            <button onClick={() => setRevisiModal({ ...revisiModal, show: false })} className="p-2 text-slate-400 hover:text-red-500 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleRevisiSubmit}>
                            <div className="p-8">
                                <label className="text-sm font-bold text-slate-700 block mb-2">Tuliskan bagian yang perlu diperbaiki oleh Prodi:</label>
                                <textarea required rows={4} value={revisiModal.catatan} onChange={(e) => setRevisiModal({ ...revisiModal, catatan: e.target.value })} placeholder="Contoh: Tanda tangan kaprodi belum ada di halaman 3..." className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-red-500 text-sm transition-all resize-none"></textarea>
                            </div>
                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                                <button type="submit" disabled={!revisiModal.catatan} className="px-8 py-3 w-full font-bold bg-red-500 text-white hover:bg-red-600 rounded-xl transition-all shadow-md disabled:bg-slate-300 disabled:shadow-none">Kirim Permintaan Revisi</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}