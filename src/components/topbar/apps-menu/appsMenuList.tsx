import EmptyData from '@/components/empty-data';
import { useAppsAllQuery } from '@/lib/data/axios-client/Query'
import { Grid, Menu, useTheme, Skeleton, Box } from '@mui/material'
import AppMenuCard from './appMenuCard';
import HomeIcon from '@mui/icons-material/Home';
import { useParams } from "next/navigation";

function AppsMenuList({ open, anchorEl, handleClose }: { open: boolean, anchorEl: any, handleClose: any }) {
  const params = useParams()

  const appId = (params && "appId" in params) ? params.appId as string : null
  const { data: apps, isPending: loadingApps, refetch: refetchApps } = useAppsAllQuery()

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: "280px",
          textOverflow: 'ellipsis',
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 8,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {
        loadingApps
          ? <Grid container columns={12} justifyContent={'end'} >
            {Array.from({ length: 3 }, (value, key) => key).map((v) =>
              <Grid   item key={v} md={4}   >
                <Box p={1.2} display="flex" flexDirection="column" gap={1}>
                  <Skeleton variant="rounded" style={{ width: "100%", height: 70 }} />
                  <Skeleton variant="text" />
                </Box>
              </Grid>
            )}
          </Grid>
          : apps && apps?.length > 0
            ? <Grid container columns={12} justifyContent={'end'} >
              {apps.filter((app) => app.id != appId).map((app) => {
                return <Grid item key={app.id} md={4}   >
                  <AppMenuCard app={app} />
                </Grid>
              })}
              <Grid item md={4}   >
                <AppMenuCard href={'/apps'} image={<HomeIcon width={100} height={150} sx={{ color: "gray.extraDark" }} />} label={"Home"} />
              </Grid>
            </Grid>
            : <EmptyData label="No Apps found" onRefetch={() => {
              refetchApps();
            }} />
      }

    </Menu >
  )
}

export default AppsMenuList
