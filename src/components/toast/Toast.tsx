import "./Toast.scss"
import ReactDOMServer from "react-dom/server"
import { MdClose, MdOutlineDownloadDone } from "react-icons/md"
import { IoWarningOutline } from "react-icons/io5"
import { VscInfo } from "react-icons/vsc"
import { BiMessageAltError } from "react-icons/bi"
import ReactDOM from "react-dom"


import React from "react"

type TypeOptions = 'info' | 'success' | 'warning' | 'error';
type ThemeOptions =  "dark" | "light";
// export type ToastPosition =
//   | 'top-right'
//   | 'top-center'
//   | 'top-left'
//   | 'bottom-right'
//   | 'bottom-center'
//   | 'bottom-left';


const ToastIcons = {
    info: VscInfo,
    success: MdOutlineDownloadDone,
    warning: IoWarningOutline,
    error: BiMessageAltError
}

export const Toast = (message: string, type?: TypeOptions, duration?: number, theme?: ThemeOptions) => {
    const Icon = ToastIcons[type ?? "info"];
    const time = duration ?? 3000 / 1000;
    
    const parent = document.querySelector(".toast") as HTMLDivElement;
    const toast = document.createElement("div") as HTMLDivElement;

    toast.classList.add(`toast__item`, type ?? "info", theme ?? "light");
    toast.style.animation = `show .3s ease-in, hide ${time}s ease-in`;
    toast.innerHTML = `      
                        <div class='toast__item__icon'>
                            ${ReactDOMServer.renderToString(<Icon />)}
                        </div>
                        <div class='toast__item__content'>
                            <h3>${message}</h3>
                        </div>
                        <div class='toast__item__close'>
                            ${ReactDOMServer.renderToString(<MdClose />)}
                        </div>
                    `
    parent.appendChild(toast);

    const autoRemove = setTimeout(() => {
        parent?.removeChild(toast);
    }, duration ?? 3000);

    const onClose = () => {
        parent?.removeChild(toast);
        clearTimeout(autoRemove);
    }

    toast.querySelector(".toast__item__close")?.addEventListener("click", onClose)
}
function ToastContainer() {
    return ReactDOM.createPortal(<div className="toast"></div>, document.querySelector("body") as HTMLElement)
}

export default ToastContainer