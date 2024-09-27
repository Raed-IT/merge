import { Box, Button, ButtonGroup, Grid, TextField } from "@mui/material";
import ViewCozyOutlinedIcon from "@mui/icons-material/ViewCozyOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { SectionDto } from "@/lib/data/axios-client";
interface SwitchTableHeaderProps {
  isShowTableComponent: boolean;
  triggerShowTable: () => void,
}

const SwitchTableHeader = ({ isShowTableComponent, triggerShowTable }: SwitchTableHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={12} >

          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="View Toggle Button Group"
            fullWidth
            sx={{ border: 1, borderColor: '#9E9E9E' }}
          >
            <Button
              sx={{
                backgroundColor: !isShowTableComponent ? "#00796b" : "transparent",
                '&:hover': {
                  backgroundColor: !isShowTableComponent ? "#00796b" : "transparent",
                },
              }}
              onClick={triggerShowTable}
            >
              <ViewCozyOutlinedIcon sx={{ color: !isShowTableComponent ? '#ffffff' : '#000000' }} />
            </Button>

            <Button
              sx={{
                backgroundColor: isShowTableComponent ? "#00796b" : "transparent",
                '&:hover': {
                  backgroundColor: isShowTableComponent ? "#00796b" : "transparent",
                },
              }}
              onClick={triggerShowTable}
            >
              <FormatListBulletedIcon sx={{ color: isShowTableComponent ? '#ffffff' : '#000000' }} />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SwitchTableHeader;