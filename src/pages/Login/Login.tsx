import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";
import { showToast } from "../../utils/CustomToast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/useAuth";
import { loginSchema } from "../../validation";
import ErrorMsg from "../../components/ui/ErrorMsg";
import { slideInLeftVariant } from "../../utils/animations";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axios";
import type { IAuthError, IAuthResponse } from "../../types";
import type { AxiosError } from "axios";


type LoginFormInputs = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
   
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsgLogin, setErrorMsgLogin] = useState<string>("")
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });


    const loginMutation = useMutation({
        mutationFn: async (formData: LoginFormInputs) => {
            const { data } = await axiosInstance.post(
                "/auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                },
            );
            return data;
        },
        onSuccess: (result: IAuthResponse) => {
            const token = result.token;
            const role = result.user.role;
            login(token, role)
            showToast.success("Welcome again to our cinema family!");
            if(role==="admin"){
                navigate("/admin", { replace: true });
            }else{
                navigate("/", { replace: true });
            }
        },
        onError: (error: AxiosError<IAuthError>) => {

            const apiMessage = error.response?.data.message;
            setErrorMsgLogin(apiMessage ?? "Can't log in, please try again")

        },
    });


    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        loginMutation.mutate(data)

    };
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 pt-12 pb-20 mt-15 ">
            <div
                aria-hidden="true"
                className="fixed inset-0 pointer-events-none overflow-hidden"
            >
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(195, 212, 83, 0.05)_0%,transparent_70%)] blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(88,28,135,0.08)_0%,transparent_70%)] blur-3xl" />
            </div>

            <motion.div
                variants={slideInLeftVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative w-full max-w-md"
            >
                <div className="absolute -inset-0.5 bg-linear-to-r from-[rgba(212,168,83,0.3)] to-[rgba(184,137,47,0.3)] rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative bg-[#0F0F23]/80 backdrop-blur-2xl border border-white/8 shadow-xl shadow-[#C5A059]/20 rounded-3xl p-8 overflow-hidden">

                    <div className="text-center ">
                        <motion.div
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.2)] mb-3 shadow-[0_0_20px_rgba(212,168,83,0.1)]"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                            <LogIn className="text-[#D4A853]" size={28} />
                        </motion.div>
                        <h1 className="text-3xl  font-serif font-bold text-white mb-2 tracking-tight">
                            <span className=" ml-2 text-[#D4A853]">CINEMA</span> ACCESS
                        </h1>
                        <p className="text-white/40 text-sm">
                            Enter your credentials to continue the experience
                        </p>
                    </div>
                    {
                        errorMsgLogin &&
                        <div className=" px-4 py-2 mt-5 text-sm font-bold text-red-600 rounded-lg bg-red-400/10 " role="alert">
                            <span className="font-medium">{errorMsgLogin}</span>
                        </div>
                    }

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-xs font-semibold uppercase tracking-widest text-[#D4A853]/80 ml-1"
                            >
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#D4A853] transition-colors duration-200">
                                    <Mail size={18} />
                                </div>
                                <input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`w-full bg-white/3 border ${errors.email ? "border-red-500/50" : "border-white/10"
                                        } focus:border-[#D4A853]/50 focus:bg-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-white/20`}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.email && (
                                    <ErrorMsg msg={errors.email.message || ""} />
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label
                                    htmlFor="password"
                                    className="text-xs font-semibold uppercase tracking-widest text-[#D4A853]/80"
                                >
                                    Password
                                </label>
                                <Link
                                    to="/forgot-password"
                                    className="text-[11px] font-medium text-white/30 hover:text-[#D4A853] transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#D4A853] transition-colors duration-200">
                                    <Lock size={18} />
                                </div>
                                <input
                                    {...register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`relative w-full bg-white/3 border ${errors.password ? "border-red-500/50" : "border-white/10"
                                        } focus:border-[#D4A853]/50 focus:bg-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none transition-all duration-300 placeholder:text-white/20`}
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#D4A853] transition-colors duration-200"
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {errors.password && (
                                    <ErrorMsg msg={errors.password.message || ""} />
                                )}
                            </AnimatePresence>
                        </div>


                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            disabled={loginMutation.isPending}
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl py-4 flex items-center justify-center font-bold text-sm uppercase tracking-widest text-[#1A1A2E] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-[#D4A853] via-[#F0C97A] to-[#B8892F] group-hover:scale-105 transition-transform duration-500" />
                            <div className="relative flex items-center gap-2">
                                {loginMutation.isPending ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                    </form>


                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/6"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest">
                            <span className="bg-[#0F0F23] px-4 text-white/20">or continue with</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-white/30">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#D4A853] font-semibold hover:underline decoration-[#D4A853]/30 underline-offset-4"
                        >
                            Create one now
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;