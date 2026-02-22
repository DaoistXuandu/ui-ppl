'use client';

import { useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Eye, X, Mail, MapPin, School, Briefcase, ShieldCheck, Phone, XCircle } from 'lucide-react';

export default function VerifikasiPanel({ verifikasiData, setVerifikasiData, showToast }: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const [selectedUser, setSelectedUser] = useState<any>(null); // Modal Detail
    const [rejectUser, setRejectUser] = useState<any>(null); // Modal Alasan Tolak
    const [rejectReason, setRejectReason] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Pagination Logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = verifikasiData.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(verifikasiData.length / postsPerPage);

    const handleApprove = (id: number) => {
        setIsProcessing(true);
        setTimeout(() => {
            setVerifikasiData((prev: any) => prev.filter((user: any) => user.id !== id));
            setSelectedUser(null);
            setIsProcessing(false);
            showToast('Akun Berhasil Diverifikasi. Email aktivasi dikirim.', 'success');
            if (currentPosts.length === 1 && currentPage > 1) setCurrentPage(prev => prev - 1);
        }, 1000);
    };

    const handleRejectSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setVerifikasiData((prev: any) => prev.filter((user: any) => user.id !== rejectUser.id));
            setRejectUser(null);
            setSelectedUser(null);
            setRejectReason('');
            setIsProcessing(false);
            showToast('Akun Ditolak. Notifikasi telah dikirim.', 'success');
            if (currentPosts.length === 1 && currentPage > 1) setCurrentPage(prev => prev - 1);
        }, 1000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Verifikasi Pendaftar Baru</h2>
                <p className="text-slate-500 mt-1 font-medium">Tinjau kelengkapan data sebelum memberikan akses sistem.</p>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                {verifikasiData.length === 0 ? (
                    <div className="p-16 text-center">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Semua Selesai!</h3>
                        <p className="text-slate-500">Tidak ada pendaftar baru yang menunggu verifikasi saat ini.</p>
                    </div>
                ) : (
                    <>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                                    <th className="p-5 pl-8">Pendaftar</th>
                                    <th className="p-5">Role & Instansi</th>
                                    <th className="p-5">Tanggal Daftar</th>
                                    <th className="p-5 text-center pr-8">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map((user: any) => (
                                    <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                        <td className="p-5 pl-8">
                                            <p className="font-bold text-slate-800">{user.nama}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                                        </td>
                                        <td className="p-5">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${user.role === 'Guru Besar' ? 'text-purple-600' : 'text-blue-600'
                                                }`}>
                                                {user.role}
                                            </span>                                            <p className="text-sm text-slate-600 font-medium">{user.instansi}</p>
                                        </td>
                                        <td className="p-5 text-sm font-bold text-slate-500">{user.tanggalDaftar}</td>
                                        <td className="p-5 pr-8 flex justify-center gap-2">
                                            <button onClick={() => setSelectedUser(user)} className="p-2.5 bg-slate-100 text-slate-600 hover:bg-[#1E88E5] hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
                                                <Eye className="w-4 h-4" /> Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="p-5 px-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <p className="text-sm font-bold text-slate-500">
                                Menampilkan <span className="text-[#1E88E5]">{indexOfFirstPost + 1}-{Math.min(indexOfLastPost, verifikasiData.length)}</span> dari <span className="text-slate-800">{verifikasiData.length}</span> pendaftar
                            </p>
                            <div className="flex gap-2">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-blue-600 disabled:opacity-30 transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-blue-600 disabled:opacity-30 transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Modal Detail Pendaftar */}
            {selectedUser && !rejectUser && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] w-full max-w-[700px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-extrabold text-slate-800">Detail Informasi Registrasi</h3>
                            <button onClick={() => setSelectedUser(null)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-8">
                            <div className="flex items-start gap-6 mb-8">
                                <div className="w-24 h-24 bg-blue-100 text-blue-600 font-extrabold text-2xl rounded-3xl flex items-center justify-center border border-blue-200 shadow-inner">
                                    {selectedUser.nama.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="inline-block px-3 py-1 mb-2 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600">{selectedUser.role}</div>
                                    <h4 className="text-2xl font-extrabold text-slate-900 mb-1">{selectedUser.nama}</h4>
                                    <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5"><Mail className="w-4 h-4" /> {selectedUser.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-[24px] border border-slate-100">
                                <div><p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><School className="w-3.5 h-3.5" /> Perguruan Tinggi</p><p className="text-sm font-bold text-slate-800">{selectedUser.instansi}</p></div>
                                <div><p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Program Studi</p><p className="text-sm font-bold text-slate-800">{selectedUser.prodi}</p></div>
                                <div><p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Lokasi</p><p className="text-sm font-bold text-slate-800">{selectedUser.kabupaten}, {selectedUser.provinsi}</p></div>
                                <div><p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">{selectedUser.role === 'Guru Besar' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />} {selectedUser.role === 'Guru Besar' ? 'Kepakaran' : 'No. WhatsApp'}</p><p className="text-sm font-bold text-slate-800">{selectedUser.roleSpesifik}</p></div>
                            </div>
                        </div>
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setRejectUser(selectedUser)} disabled={isProcessing} className="px-6 py-3 font-bold bg-white text-red-600 border border-slate-200 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all">Tolak Pendaftar</button>
                            <button onClick={() => handleApprove(selectedUser.id)} disabled={isProcessing} className="px-8 py-3 font-bold bg-[#1E88E5] text-white hover:bg-blue-700 rounded-xl shadow-md flex items-center gap-2">
                                {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <CheckCircle className="w-4 h-4" />} Terima Akses
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Alasan Tolak */}
            {rejectUser && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-[500px] shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-slate-100 bg-red-50/50 flex justify-between"><h3 className="text-xl font-extrabold text-red-600 flex items-center gap-2"><XCircle className="w-5 h-5" /> Tolak Pendaftar</h3></div>
                        <form onSubmit={handleRejectSubmit}>
                            <div className="p-8">
                                <p className="text-sm text-slate-600 font-medium mb-4">Anda akan menolak pendaftaran <span className="font-bold text-slate-800">{rejectUser.nama}</span>. Silakan berikan alasan penolakan (opsional).</p>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alasan Penolakan</label>
                                    <textarea rows={4} placeholder="Contoh: Dokumen tidak valid..." value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-red-400 focus:bg-white rounded-2xl outline-none text-sm transition-all resize-none"></textarea>
                                </div>
                            </div>
                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setRejectUser(null)} disabled={isProcessing} className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors">Batal</button>
                                <button type="submit" disabled={isProcessing} className="px-8 py-3 font-bold bg-red-600 text-white hover:bg-red-700 rounded-xl flex items-center gap-2">
                                    {isProcessing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Konfirmasi Tolak'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}