import { Avatar, Typography } from '@mui/material';
import { alpha, Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateRandomColor } from '@/utils/randoms';
import { TapDto } from '@/lib/data/static-axios-client';

interface RouteTempleProps {
  record: any;
  tap: TapDto;
}

export default function RouteTemple({ record, tap }: RouteTempleProps) {
  const router = useRouter();
  const [itemColor] = useState<string>(generateRandomColor());
  const param = useSearchParams()

  const getStyle = (recordId: string | undefined) => {
    return recordId === param?.get(tap.keyNameInUrlParameter ?? 'id')
      ? {
        backgroundColor: alpha('#007bff', 0.1),
        borderLeft: '4px solid #007bff',
      }
      : {};
  };

  const handleClick = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(tap.keyNameInUrlParameter ?? 'id', record?.id);
    router.push(newUrl.toString());
  };

  const employeeName = record?.employee
    ? `${record?.employee.firstName || ''} ${record?.employee.lastName || ''}`.trim()
    : 'Unknown Driver';

  const getInitials = (text: string | null | undefined): string => {
    if (!text) return '';
    const words = text.split(' ');
    return words.map(word => word[0]).join('').toUpperCase();
  };

  return (
    <Box
      py={1.2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        cursor: 'pointer',
        ...getStyle(record?.id),
        p: '7px',
        width: '100%',
      }}
      onClick={handleClick}
    >
      <Box display="flex" gap={2} alignItems="center">
        {/^#[0-9A-F]{6}$/i.test(itemColor) && (
          <Avatar sx={{ color: itemColor, backgroundColor: alpha(itemColor, 0.12) }}>
            {getInitials(typeof employeeName === 'string' ? employeeName : 'Unknown Driver')}
          </Avatar>
        )}
        <Box display="flex" flexDirection="column">
          <Typography fontWeight="500">
            {typeof employeeName === 'string' ? employeeName : 'Unknown Driver'}
          </Typography>
          <Typography color="text.secondary">{record?.status || 'Unknown Status'}</Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start" ml="auto">
        <Typography fontWeight="500" color="primary.light">
          Status
        </Typography>
        <Typography fontWeight="400">
          {`${record?.consignments?.filter(
            (consignment: { status: string }) => consignment.status === 'Pending'
          ).length ?? 0} / ${record?.consignments?.length ?? 0}`}
        </Typography>
      </Box>
    </Box>
  );
}