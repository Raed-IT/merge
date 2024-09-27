import { generateRandomNumber } from '@/utils/randoms';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Skeleton, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDeactivateEmployeeMutation } from '@/lib/data/axios-client/Query';
import InviteNewUser from '../invite-new-user';

type HeaderPageModuleProps = {
  name: string;
  pluralName: string;
  isLoad: boolean;
  selectedItems: number[];
};

function HeaderPageModule({ name, pluralName, isLoad, selectedItems }: HeaderPageModuleProps) {
  const router = useRouter();
  const pathName = usePathname();
  const [openInviteModal, setOpenInviteModal] = useState(false);

/*   const { mutate: deactivateEmployee } = useDeactivateEmployeeMutation(); */
  const handleCreate = () => {
    router.push(`${pathName}/create`);
  };

  const handleOpenInvite = () => {
    setOpenInviteModal(true);
  };

  const handleCloseInvite = () => {
    setOpenInviteModal(false);
  };

/*    const handleDelete = () => {
    if (selectedItems.length > 0) {
      deleteEmployees(selectedItems);
    } else {
      console.log('No items selected for deletion');
    }
  };  */

  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ height: 90 }}>
        <Grid item xs={6}>
          <Box display="flex" height="100%" sx={{ borderRadius: 2 }}>
            <Box sx={{ ml: 1 }}>
              {!isLoad ? (
                <Typography variant="h6" sx={{ fontSize: '20px' }}>
                  {pluralName}
                </Typography>
              ) : (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  sx={{ height: '20px' }}
                  width={generateRandomNumber(100, 150)}
                />
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end" sx={{ borderRadius: 2, textAlign: 'end', gap: 1 }}>
            {!isLoad ? (
              name === 'Users' ? (
                <>
                  <Button
                    onClick={handleOpenInvite}
                    variant="contained"
                    sx={{
                      backgroundColor: '#00796B',
                      textTransform: 'none',
                      fontSize: '14px',
                    }}
                  >
                    + Invite {name}
                  </Button>
                  <Button
                   /*   onClick={handleDelete}    */
                    variant="contained"
                    sx={{
                      backgroundColor: '#cb112d',
                      textTransform: 'none',
                      fontSize: '14px',
                    }}
                    disabled={selectedItems.length === 0}
                  >
                    <DeleteOutlinedIcon /> Delete {name}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleCreate}
                  variant="contained"
                  sx={{
                    backgroundColor: '#00796B',
                    textTransform: 'none',
                    fontSize: '14px',
                  }}
                >
                  + Create New {name}
                </Button>
              )
            ) : (
              <>
                <Skeleton variant="rounded" animation="wave" sx={{ height: '44px' }} width={150} />
                {name === 'Users' && (
                  <>
                    <Skeleton variant="rounded" animation="wave" sx={{ height: '44px' }} width={150} />
                    <Skeleton variant="rounded" animation="wave" sx={{ height: '44px' }} width={150} />
                  </>
                )}
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openInviteModal} onClose={handleCloseInvite} maxWidth="sm" fullWidth>
        <DialogTitle>Invite User</DialogTitle>
        <DialogContent>
          <InviteNewUser onClose={handleCloseInvite} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default HeaderPageModule;
