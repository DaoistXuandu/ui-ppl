'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, ChevronLeft, LogIn, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const isFormValid = formData.email && formData.password.length >= 8;

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B] antialiased relative flex flex-col items-center justify-center py-10">

            {/* Background Biru (Area Header) */}
            <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-[#1E88E5] to-[#1565C0] z-0">
                <div className="absolute inset-0 bg-white/5 skew-y-3 origin-top-left transform scale-110"></div>
            </div>

            <div className="relative z-10 w-full max-w-[480px] px-6">

                {/* Navigasi Kembali */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 font-bold transition-all group">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
                </Link>

                {/* Header Teks */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full mb-6 border border-white/30 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                        <ShieldCheck className="w-4 h-4" /> Secure Access
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Selamat Datang</h1>
                    <p className="text-sm md:text-base text-blue-50/90 font-medium leading-relaxed max-w-[320px] mx-auto">
                        Masuk ke akun GBIM Anda untuk melanjutkan aktivitas pembinaan.
                    </p>
                </div>

                {/* Login Card - Padding disesuaikan agar tidak kedempet tapi pas (p-8 md:p-10) */}
                <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-900/10 p-8 md:p-10 border border-slate-100">
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#1E88E5] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="nama@kampus.ac.id"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                                <Link href="#" className="text-[10px] font-bold text-[#1E88E5] hover:underline">Lupa Password?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#1E88E5] transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Masukkan password"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white rounded-2xl outline-none text-sm font-semibold transition-all"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Tombol Submit - Size dikecilkan (py-3.5, text-base) agar lebih proporsional */}
                        <div className="pt-4 flex flex-col items-center gap-6">
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg bg-gradient-to-r from-[#1E88E5] to-[#1565C0] text-white hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Masuk Sekarang <LogIn className="w-4 h-4" />
                            </button>

                            <div className="flex flex-col items-center gap-2">
                                <p className="text-slate-500 font-medium text-xs">Belum memiliki akun?</p>
                                <Link href="/register" className="text-[#1E88E5] font-bold hover:underline text-sm flex items-center gap-1 group">
                                    Daftar Akun Baru <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                <p className="mt-10 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Asosiasi Perguruan Tinggi Informatika dan Komputer
                </p>
            </div>
        </div>
    );
}