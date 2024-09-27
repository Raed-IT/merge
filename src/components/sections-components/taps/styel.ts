import { Box } from "@mui/system";
import { TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { styled } from '@mui/system';

export const TabsList = styled(BaseTabsList)(
    ({ theme }) => `
    width: 100%;
    background-color: ${theme.palette.background.paper};
    border-radius: ${theme.shape.borderRadius + 4}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 1rem;
    overflow: hidden;
  `
);

export const Tab = styled(BaseTab)(
    ({ theme }) => `
    color: ${theme.palette.gray.main};
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: ${theme.shape.borderRadius + 4}px;
    display: flex;
    justify-content: center;

    &.${tabClasses.selected} {
      background-color: ${theme.palette.background.default}; 
      box-shadow: 0px 4px 20px -5px ${theme.palette.gray.light};
      font-weight: bold;
      color: ${theme.palette.primary.main};
    }
  `
);

export const ScrollableBox = styled(Box)(
    ({ theme }) => `
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: ${theme.palette.grey[400]} ${theme.palette.background.paper};

    /* For Webkit browsers */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.grey[400]};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${theme.palette.background.paper};
    }
  `
);