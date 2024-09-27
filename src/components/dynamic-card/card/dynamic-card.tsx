import React from 'react';
import { Typography, Grid, Chip, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  getStatusStyle } from '../sherd/helper';
import { DynamicCardProps } from '../sherd/type';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';

const DynamicCard = ({ row, fields, statusField }: DynamicCardProps) => {
    
  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            #{row.id}
          </Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <IconButton size="small">
            <CropOriginalOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={1} alignItems="center">
        {fields.map((field, index) => (
          <Grid item xs={field.gridSize || 12} key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {field.icon && React.createElement(field.icon, { sx: { mr: 1, color: '#707070' } })}
            <Typography variant="body2" color="textSecondary">
              {field.label} {getNestedFieldValue(row, field.fieldName)}
            </Typography>
          </Grid>
        ))}

        {statusField && row[statusField] && (
          <Grid item xs={12} container justifyContent="flex-end">
            <Chip label={row[statusField]} style={getStatusStyle(row[statusField])} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
const getNestedFieldValue = (row: any, fieldName: string) => {
    return fieldName?.split('.').reduce((acc: any, part: string) => acc && acc[part], row);
  };

export default DynamicCard;
