import CustomModal from "./CustomModal";

interface ConfirmModalProps {
  isOpen: boolean;
  question: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  question,
  onConfirm,
  onClose,
  loading = false,
}) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} width="sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{question}</h2>
        <div className="flex justify-center gap-4">
          {loading ? (
            <button className="bg-dark-green px-4 py-2 rounded text-white">
              <span className="loading loading-spinner loading-xs"></span>
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                No
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Yes
              </button>
            </>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmModal;
