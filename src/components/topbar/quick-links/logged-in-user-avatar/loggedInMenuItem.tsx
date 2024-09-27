
import { Box, CircularProgress, MenuItem, Typography } from "@mui/material"
import { MouseEventHandler } from "react";


type loggedInMenuItemProps = {
  icon?: any,
  label: string,
  pendingLabel?: string,
  isPending?: boolean,
  handleClick?: MouseEventHandler
}
function LoggedInMenuItem({ icon: Icon, label, isPending, pendingLabel, handleClick = () => { } }: loggedInMenuItemProps) {
  return (
    <MenuItem onClick={handleClick} >
      <Box display={'flex'} justifyContent={'start'} gap={2} alignItems={'center'} width={"100%"}>
        {Icon ? (isPending) ? <CircularProgress style={{ width: "20px", height: "20px", color: "primary.main" }} /> : <Icon /> : null}
        <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }} >  {isPending && pendingLabel ? pendingLabel : label} </Typography>
      </Box>
    </MenuItem>
  )
}

export default LoggedInMenuItem
