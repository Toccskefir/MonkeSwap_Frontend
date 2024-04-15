import {ReactNode} from "react";
import {FaXmark} from "react-icons/fa6";

interface ModalProps {
    open: boolean;
    onClose: ()=>void;
    children: ReactNode;
}

export default function Modal(props: ModalProps) {
    return (
        <div
            onClick={props.onClose}
            className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${props.open ? "visible" : "invisible"}
      `}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${props.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
            >
                <button
                    onClick={props.onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                >
                    <FaXmark />
                </button>
                {props.children}
            </div>
        </div>
    )
}