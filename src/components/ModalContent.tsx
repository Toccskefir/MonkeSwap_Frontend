import {ReactNode} from "react";
import {FaXmark} from "react-icons/fa6";

interface ModalProps {
    onClose: () => void,
    children: ReactNode,
}

function ModalContent({children, onClose}: ModalProps) {
    return (
        <div>
            <div className="bg-white rounded-xl shadow p-6 transition-all relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                >
                        <FaXmark />
                </button>
                {children}
            </div>
        </div>
    )
}

export default ModalContent;