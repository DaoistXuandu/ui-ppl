'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    UserPlus, Mail, Lock, User, Building2, MapPin,
    Camera, Phone, GraduationCap, ArrowRight, ShieldCheck,
    Briefcase, School, ChevronLeft
} from 'lucide-react';

export default function RegisterPage() {
    const [role, setRole] = useState<'kaprodi' | 'gb'>('kaprodi');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // State untuk Kepakaran (Tags)
    const [expertises, setExpertises] = useState<string[]>([]);
    const [currentExpertise, setCurrentExpertise] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nama: '',
        perguruanTinggi: '',
        prodi: '',
        provinsi: '',
        kabupaten: '',
        noHp: '',
    });

    const isFormValid =
        formData.email &&
        formData.password.length >= 8 &&
        formData.nama &&
        formData.perguruanTinggi &&
        formData.prodi &&
        formData.provinsi &&
        formData.kabupaten &&
        (role === 'kaprodi' ? formData.noHp : expertises.length > 0);

    const addExpertise = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentExpertise.trim() !== '') {
            e.preventDefault();
            if (!expertises.includes(currentExpertise.trim())) {
                setExpertises([...expertises, currentExpertise.trim()]);
            }
            setCurrentExpertise('');
        }
    };

    const removeExpertise = (target: string) => {
        setExpertises(expertises.filter(item => item !== target));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
                <div className="max-w-[500px] w-full bg-white rounded-[40px] p-12 text-center shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-green-600 shadow-inner">
                        <Mail className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Cek Email Anda!</h2>
                    <p className="text-slate-500 mb-10 leading-relaxed text-lg font-medium">
                        Form registrasi berhasil di-submit. Mohon cek email untuk aktivasi akun agar data Anda tercatat secara resmi di sistem GBIM.
                    </p>
                    <Link href="/" className="inline-block w-full py-4 bg-[#1E88E5] text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B] antialiased pb-20 relative">

            {/* Background Biru (Fixed Header Area) */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#1E88E5] to-[#1565C0] z-0">
                <div className="absolute inset-0 bg-white/5 skew-y-3 origin-top-left transform scale-110"></div>
            </div>

            <div className="relative z-10 max-w-[800px] mx-auto pt-12 px-6">
                {/* Navigasi Kembali */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 font-bold transition-all group">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
                </Link>

                {/* Header Teks (Putih) */}
                <div className="mb-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full mb-6 border border-white/30 text-[12px] font-bold uppercase tracking-wider backdrop-blur-md">
                        <UserPlus className="w-4 h-4" /> Join GBIM Community
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Registrasi Akun Baru</h1>
                    <p className="text-lg text-blue-50/90 max-w-[600px] font-medium leading-relaxed">
                        Mendaftar sebagai bagian dari ekosistem peningkatan kualitas tridharma perguruan tinggi di Indonesia.
                    </p>
                </div>

                {/* Form Card (Putih) */}
                <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/20 p-8 md:p-12 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Pemilihan Role */}
                        <div className="space-y-4">
                            <p className="text-lg font-bold text-slate-800 text-center">Mendaftar Sebagai:</p>
                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-2 rounded-[24px] border border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setRole('kaprodi')}
                                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all ${role === 'kaprodi' ? 'bg-white text-[#1E88E5] shadow-lg border border-blue-50' : 'text-slate-500 hover:bg-white/50'}`}
                                >
                                    <Building2 className="w-5 h-5" /> Kaprodi
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('gb')}
                                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all ${role === 'gb' ? 'bg-white text-[#1E88E5] shadow-lg border border-blue-50' : 'text-slate-500 hover:bg-white/50'}`}
                                >
                                    <GraduationCap className="w-5 h-5" /> Guru Besar
                                </button>
                            </div>
                        </div>

                        {/* 2. Fields Utama (Vertikal) */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#1E88E5]" />
                                    <input type="email" required placeholder="nama@kampus.ac.id" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                <div className={`relative group ${formData.password.length < 8 ? 'border border-rose-200 rounded-2xl' : ''}`}>
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#1E88E5]" />
                                    <input type="password" required placeholder="Minimal 8 karakter" className={`w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all`} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap & Gelar</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#1E88E5]" />
                                    <input type="text" required placeholder="Contoh: Prof. Dr. Ahmad, M.Kom." className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all" onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Perguruan Tinggi</label>
                                <div className="relative group">
                                    <School className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#1E88E5]" />
                                    <input type="text" required placeholder="Nama Universitas" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all" onChange={(e) => setFormData({ ...formData, perguruanTinggi: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Program Studi</label>
                                <div className="relative group">
                                    <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#1E88E5]" />
                                    <input type="text" required placeholder="Teknik Informatika" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all" onChange={(e) => setFormData({ ...formData, prodi: e.target.value })} />
                                </div>
                            </div>

                            {/* 3. Lokasi (Horizontal sesuai request) */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Provinsi</label>
                                    <input type="text" required placeholder="Jawa Timur" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all" onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Kabupaten/Kota</label>
                                    <input type="text" required placeholder="Kota Malang" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all" onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })} />
                                </div>
                            </div>

                            {/* 4. Foto Profil */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Foto Profil</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer group">
                                    <Camera className="w-8 h-8 text-slate-400 group-hover:text-[#1E88E5] mx-auto mb-2" />
                                    <p className="text-sm font-bold text-slate-700">Unggah Foto Background Polos</p>
                                </div>
                            </div>

                            {/* 5. Role Specific (Paling Bawah) */}
                            <div className="pt-8 border-t border-slate-100">
                                {role === 'kaprodi' ? (
                                    <div className="space-y-2 animate-in fade-in duration-500">
                                        <label className="text-xs font-bold text-[#1E88E5] uppercase tracking-widest ml-1">No HP / WhatsApp (Wajib)</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#1E88E5]" />
                                            <input type="tel" required placeholder="081234567890" className="w-full pl-14 pr-6 py-4 bg-blue-50/30 border border-blue-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-bold shadow-sm" onChange={(e) => setFormData({ ...formData, noHp: e.target.value })} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-in fade-in duration-500">
                                        <label className="text-xs font-bold text-[#1E88E5] uppercase tracking-widest ml-1">Daftar Kepakaran (Tekan Enter)</label>
                                        <div className="relative group">
                                            <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#1E88E5]" />
                                            <input type="text" value={currentExpertise} placeholder="Ketik lalu Tekan Enter..." className="w-full pl-14 pr-6 py-4 bg-blue-50/30 border border-blue-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-bold shadow-sm" onKeyDown={addExpertise} onChange={(e) => setCurrentExpertise(e.target.value)} />
                                        </div>
                                        {/* Render Tags (- abcd) */}
                                        <div className="flex flex-wrap gap-2">
                                            {expertises.map((item, idx) => (
                                                <button key={idx} type="button" onClick={() => removeExpertise(item)} className="flex items-center gap-2 bg-white text-[#1E88E5] border border-blue-100 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
                                                    - {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tombol Submit */}
                        <div className="pt-8 flex flex-col items-center gap-6">
                            <button type="submit" disabled={!isFormValid || isLoading} className={`w-full py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${isFormValid && !isLoading ? 'bg-gradient-to-r from-[#1E88E5] to-[#1565C0] text-white shadow-blue-200 hover:-translate-y-1 hover:shadow-2xl' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}>
                                {isLoading ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Daftar Sekarang <ArrowRight className="w-6 h-6" /></>}
                            </button>
                            <p className="text-slate-500 font-medium">Sudah punya akun? <Link href="/login" className="text-[#1E88E5] font-bold hover:underline">Masuk di sini</Link></p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}