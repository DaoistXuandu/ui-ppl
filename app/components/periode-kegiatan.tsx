'use client';

import { useState } from 'react';
import { Plus, Edit3, X, Calendar, FileText, UploadCloud, CheckCircle } from 'lucide-react';

export default function PeriodeKegiatanPanel({ showToast }: any) {
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // Dummy Data Periode
    const [periodeList, setPeriodeList] = useState([
        { id: 1, nama: 'GBIM Batch I - 2026', startDate: '2026-03-01', endDate: '2026-06-30', templateSurat: 'Template_Surat_B1.pdf', templateLaporan: 'Template_Laporan_B1.pdf' },
        { id: 2, nama: 'GBIM Batch II - 2026', startDate: '2026-08-01', endDate: '2026-11-30', templateSurat: 'Template_Surat_B2.pdf', templateLaporan: 'Template_Laporan_B2.pdf' },
    ]);

    // State Form
    const [formData, setFormData] = useState({ nama: '', startDate: '', endDate: '', templateSurat: '', templateLaporan: '' });

    const handleOpenEdit = (p: any) => {
        setIsEditMode(true);
        setEditId(p.id);
        setFormData({ nama: p.nama, startDate: p.startDate, endDate: p.endDate, templateSurat: p.templateSurat, templateLaporan: p.templateLaporan });
        setShowModal(true);
    };

    const handleOpenCreate = () => {
        setIsEditMode(false);
        setEditId(null);
        setFormData({ nama: '', startDate: '', endDate: '', templateSurat: '', templateLaporan: '' });
        setShowModal(true);
    };

    const handleSimulateUpload = (type: 'Surat' | 'Laporan') => {
        // Simulasi nama file masuk ke state setelah 'pilih file'
        if (type === 'Surat') setFormData({ ...formData, templateSurat: 'Draft_Surat_Pernyataan.pdf' });
        if (type === 'Laporan') setFormData({ ...formData, templateLaporan: 'Draft_Laporan_Akhir.pdf' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi Tanggal Berakhir < Tanggal Mulai
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            showToast('Error: Tanggal Berakhir tidak boleh lebih awal dari Tanggal Mulai!', 'error');
            return;
        }

        // Validasi Dokumen (Harus ada template di-upload)
        if (!formData.templateSurat || !formData.templateLaporan) {
            showToast('Error: Template Surat Pernyataan dan Laporan Kegiatan wajib diunggah!', 'error');
            return;
        }

        if (isEditMode && editId) {
            setPeriodeList(prev => prev.map(p => p.id === editId ? { ...p, ...formData } : p));
            showToast('Periode kegiatan berhasil diperbarui!', 'success');
        } else {
            setPeriodeList([{ id: Date.now(), ...formData }, ...periodeList]);
            showToast('Periode kegiatan baru berhasil dibuat!', 'success');
        }

        setShowModal(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Manajemen Periode Kegiatan</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Atur rentang waktu dan template dokumen standar program.</p>
                </div>
                <button onClick={handleOpenCreate} className="flex items-center gap-2 px-6 py-3 bg-[#1E88E5] text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
                    <Plus className="w-5 h-5" /> Buat Periode Baru
                </button>
            </div>

            {/* List Periode */}
            <div className="grid grid-cols-1 gap-4">
                {periodeList.map((p) => (
                    <div key={p.id} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-6 hover:border-blue-200 transition-colors">
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-800">{p.nama}</h3>
                                <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mt-1">
                                    <Calendar className="w-4 h-4 text-[#1E88E5]" />
                                    <span>{p.startDate}</span> <span className="text-slate-300">s/d</span> <span>{p.endDate}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                    <FileText className="w-3.5 h-3.5 text-blue-500" /> Template Surat: {p.templateSurat}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                    <FileText className="w-3.5 h-3.5 text-orange-500" /> Template Laporan: {p.templateLaporan}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleOpenEdit(p)} className="px-5 py-2.5 bg-slate-50 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-[#1E88E5] hover:text-white transition-all flex items-center gap-2 shadow-sm shrink-0">
                            <Edit3 className="w-4 h-4" /> Edit Periode
                        </button>
                    </div>
                ))}
            </div>

            {/* MODAL FORM PERIODE */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-[600px] shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[90vh] flex flex-col">
                        <div className="p-8 pb-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-800">{isEditMode ? 'Edit Periode Kegiatan' : 'Buat Periode Baru'}</h3>
                                <p className="text-sm text-slate-500 mt-1">Definisikan timeline dan dokumen pendukung.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-red-500 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <form id="periodeForm" onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Periode Kegiatan</label>
                                    <input required type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="Contoh: Pembinaan Batch 1 - 2026" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white text-sm font-bold transition-all" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tanggal Mulai</label>
                                        <input required type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-bold transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tanggal Berakhir</label>
                                        <input required type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-bold transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h4 className="font-bold text-slate-800">Upload Template Dokumen</h4>

                                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col gap-3">
                                        <label className="text-xs font-bold text-blue-800 flex items-center gap-2"><FileText className="w-4 h-4" /> Template Surat Pernyataan</label>
                                        <div className="flex gap-2 items-center">
                                            <input type="file" onChange={() => handleSimulateUpload('Surat')} className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 w-full" />
                                        </div>
                                        {formData.templateSurat && <span className="text-[10px] font-bold text-blue-600">Terlampir: {formData.templateSurat}</span>}
                                    </div>

                                    <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl flex flex-col gap-3">
                                        <label className="text-xs font-bold text-orange-800 flex items-center gap-2"><FileText className="w-4 h-4" /> Template Laporan Kegiatan</label>
                                        <div className="flex gap-2 items-center">
                                            <input type="file" onChange={() => handleSimulateUpload('Laporan')} className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 w-full" />
                                        </div>
                                        {formData.templateLaporan && <span className="text-[10px] font-bold text-orange-600">Terlampir: {formData.templateLaporan}</span>}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-all">Batal</button>
                            <button type="submit" form="periodeForm" className="px-8 py-3 bg-[#1E88E5] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-md transition-all active:scale-95">
                                {isEditMode ? 'Simpan Perubahan' : 'Buat Periode'} <CheckCircle className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}