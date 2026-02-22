'use client';

import { useState } from 'react';
import { User, Mail, Phone, Building2, CheckCircle } from 'lucide-react';

export default function ProfilPanel({ role, showToast }: any) {
    const [profile, setProfile] = useState({
        nama: role === 'admin' ? 'Admin Pusat' : role === 'gb' ? 'Prof. Dr. Ahmad Setiawan' : 'Budi Raharjo, M.T.',
        email: 'user@sistem.ac.id',
        phone: '081234567890',
        instansi: 'Universitas Bawaan',
        username: 'user_123',
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Profil berhasil diperbarui!', 'success');
    };

    return (
        <div className="space-y-6 max-w-3xl animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-800">Profil Pengguna</h2>
                <p className="text-sm text-slate-500 mt-1">Kelola informasi data diri Anda.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-10 h-10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800">{profile.nama}</h3>
                            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold uppercase mt-2">{role}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                            <input type="text" value={profile.nama} onChange={(e) => setProfile({ ...profile, nama: e.target.value })} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 font-bold text-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                            <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full pl-11 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-slate-700" /></div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nomor Telepon</label>
                            <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full pl-11 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-slate-700" /></div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institusi</label>
                            <div className="relative"><Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={profile.instansi} onChange={(e) => setProfile({ ...profile, instansi: e.target.value })} className="w-full pl-11 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-slate-700" /></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                        <div className="space-y-2 opacity-60">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Username (Tidak dapat diubah)</label>
                            <input readOnly type="text" value={profile.username} className="w-full px-5 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed" />
                        </div>
                        <div className="space-y-2 opacity-60">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                            <input readOnly type="password" value="********" className="w-full px-5 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="px-8 py-3 bg-[#1E88E5] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-md">Simpan Profil <CheckCircle className="w-4 h-4" /></button>
                    </div>
                </form>
            </div>
        </div>
    );
}