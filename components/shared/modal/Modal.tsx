
'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface IModalProps {
    children: React.ReactNode
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onAction?: () => void
    modalTitle?: String
    modalDescription?: String
    actionButtonText?: String
    cancleButtonText?: String
}

const Modal = ({ children, open, setOpen, onAction, modalTitle, modalDescription, actionButtonText = 'Save Changes', cancleButtonText = 'Cancle' }: IModalProps) => {
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <form>
                    <DialogContent>
                        <DialogHeader>
                            {modalTitle &&
                                <DialogTitle className="text-2xl font-bold">{modalTitle}</DialogTitle>
                            }
                            {modalDescription &&
                                <DialogDescription className="text-lg">
                                    {modalDescription}
                                </DialogDescription>
                            }
                        </DialogHeader>
                        {children}
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="cursor-pointer" variant="outline">{cancleButtonText}</Button>
                            </DialogClose>
                            <Button className="cursor-pointer" onClick={onAction}>{actionButtonText}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}

export default Modal