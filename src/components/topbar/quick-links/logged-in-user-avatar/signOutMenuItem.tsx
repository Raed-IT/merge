import React, { useEffect } from 'react'
import LoggedInMenuItem from './loggedInMenuItem';
import { useLogoutMutation } from '@/lib/data/axios-client/Query';
import { useAuthStore } from '@/stores/authStore';
import { LogoutRequest } from '@/lib/data/axios-client';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function SignOutMenuItem({ setBlockCloseMenu }: { setBlockCloseMenu: (value: boolean) => void }) {
  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogoutMutation();
  const signOut = useAuthStore((state) => state.signOut);
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter();

  const logout = () => {
    setBlockCloseMenu(true);
    logoutMutation(new LogoutRequest({ token: '' }), {
      onSuccess: () => {
        setBlockCloseMenu(false);
        enqueueSnackbar("successful logout", { variant: 'success' })
        signOut()
        router.push("/login")
      },
      onError: (error) => {
        setBlockCloseMenu(false);
        const err = error as AxiosError;
        const response: any = err.response;
        enqueueSnackbar(response.message! as string, { variant: 'error' });
      },
    })

  }

  return (
    <LoggedInMenuItem pendingLabel='Signing out ...' isPending={isLoggingOut} handleClick={logout} icon={ExitToAppIcon} label="Sign out"></LoggedInMenuItem>
  )
}

export default SignOutMenuItem
