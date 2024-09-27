"use client"

import SnackbarCloseButton from "@/components/snackbar-close-button";
import { SnackbarProvider } from "notistack";

const ToastProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SnackbarProvider autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}
        >
            {children}
        </SnackbarProvider>
    );
}

export default ToastProvider;