import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";

import React, { Fragment } from "react";

type ModalProps = {
    open: boolean;
    close: () => void;
    children?: React.ReactNode;
};

const Modal = ({ open, close, children }: ModalProps) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50 font-body" onClose={close}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className=" transform overflow-hidden rounded-2xl bg-gradient-to-br from-sky to-blue text-left align-middle shadow-xl transition-all sm:mx-20 sm:my-8 sm:w-full sm:max-w-5xl">
                                <div className="bg-sky py-3 sm:flex sm:flex-row-reverse ">
                                    <button className="text-white hover:bg-transparent" onClick={close}>
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-6 bg-white w-full h-full">{children}</div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
