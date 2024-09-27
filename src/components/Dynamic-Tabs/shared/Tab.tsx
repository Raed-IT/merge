import { Box, Typography } from '@mui/material'
import React from 'react'
import { getStatusColor } from '../Tab/helpers'
import { RouteStatus } from '@/lib/data/axios-client'

function TabDefault({item}: any) {
  console.log(item);
  
  return (
    <Box
      py={1.2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        p: '7px',
        width: '100%',
      }}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Box display="flex" flexDirection="column">
          <Typography color="gray.dark">{item?.driver?.employee?.toString() || 'Unknown Driver'}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          p: 0.6,
          color: getStatusColor(item?.status as unknown as RouteStatus).color,
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography fontWeight="500">
          {item.status}
        </Typography>
      </Box>

    </Box>
  )
}

export default TabDefault