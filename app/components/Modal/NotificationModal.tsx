import { CheckCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Modal Props Interface
interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  router: ReturnType<typeof useRouter>;
}

// 新增的 Modal 元件
const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  router,
}) => {
  const backToIndex = () => {
    onClose();
    router.push("/");
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 mb-5">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-2xl font-medium text-stone-800 mb-3">{title}</h3>
        <p className="text-stone-600 font-light">{message}</p>
        <button
          onClick={backToIndex}
          className="mt-8 w-full px-8 py-3.5 rounded-full font-medium transition-all duration-300 shadow-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 hover:shadow-xl"
        >
          太棒了！
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
