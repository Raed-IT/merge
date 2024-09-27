import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { iconMap } from './icon-map'; // Ensure this is a valid import
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

type Action = {
  id: string | undefined;
  name: string;
  icon: string;
};

type ActionMenuProps = {
  actions: Action[];
  onActionClick: (action: Action) => void;
};

const ActionMenu = ({ actions, onActionClick }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {actions.length > 0 ? (
          actions.map(action => (
            <MenuItem
              key={action.id}
              onClick={() => {
                onActionClick(action);
                handleClose();
              }}
            >
              {action.icon && React.createElement(iconMap[action.icon as keyof typeof iconMap])}
              {action.name}
            </MenuItem>
          ))
        ) : (
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              m: 1,
              backgroundColor: '#ffffff',
              color: '#424242',
              border: 0
            }}
            startIcon={<EditCalendarIcon />}
          >
            Edit
          </Button>
        )}
      </Menu>
    </div>
  );
};

export default ActionMenu;
