import toast from "react-hot-toast";

const toastStyles = {
  success: {
    background: "#0F0F1A",
    color: "#2ADB5C",
    border: "1px solid rgba(42, 219, 92, 0.3)",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    padding: "12px 20px",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
  },
  warning: {
    background: "#0F0F1A",
    color: "#D4A853",
    border: "1px solid rgba(212,168,83,0.3)",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    padding: "12px 20px",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
  },
  error: {
    background: "#0F0F1A",
    color: "#f87171",
    border: "1px solid rgba(248,113,113,0.3)",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    padding: "12px 20px",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
  },
};


export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      style: toastStyles.success,
      iconTheme: { primary: "#2ADB5C", secondary: "#0F0F1A" },
      duration: 3000,
    });
  },
  warning: (message: string) => {
    toast(message, {
      style: toastStyles.warning,
      icon: "⚠️",
      duration: 3000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      style: toastStyles.error,
      iconTheme: { primary: "#f87171", secondary: "#0F0F1A" },
      duration: 4000,
    });
  },
};
