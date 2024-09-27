import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Toolbar, Typography, Tooltip, Button, Box } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SendIcon from '@mui/icons-material/Send';
import { ModuleDto, SectionDto } from '@/lib/data/axios-client';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const iconMap = {
    PrintIcon, LinkIcon, ContentCopyIcon, FolderCopyIcon, SendIcon,
};

type TableSelectedActionsProps = {
    numSelected: number;
    module?: ModuleDto;
    section?: SectionDto;
};

const TableSelectedActions = ({ numSelected, module }: TableSelectedActionsProps) => {
    type IconKey = keyof typeof iconMap;
    
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 && (
                <>
                    <Typography
                        sx={{ width: '30%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                    <Typography sx={{ flex: '1 1 100%', textAlign: 'right' }} component="div">
                        <Tooltip title="Actions">
                            <Box>
                                {module?.actions && module.actions.length > 0 ? (
                                    module.actions.map((action) => {
                                        const IconComponent = action.icon ? iconMap[action.icon as IconKey] : null;
                                        return (
                                            <Button
                                                key={action.id || action.name}
                                                variant="outlined"
                                                sx={{
                                                    textTransform: 'none', m: 1, backgroundColor: '#ffffff', color: '#424242', border: 0
                                                }}
                                                startIcon={IconComponent ? <IconComponent /> : null}
                                            >
                                                {action.name}
                                            </Button>
                                        );
                                    })
                                ) : (
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            textTransform: 'none', m: 1, backgroundColor: '#ffffff', color: '#424242', border: 0
                                        }}
                                        startIcon={<EditCalendarIcon />}
                                    >
                                        Edit
                                    </Button>
                                    
                                )}
                            </Box>
                        </Tooltip>
                    </Typography>
                </>
            )}
        </Toolbar>
    );
};

export default TableSelectedActions;
