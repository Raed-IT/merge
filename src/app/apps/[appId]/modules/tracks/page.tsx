"use client";
import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Alert,
} from '@mui/material';
import { useRoutesGETQuery } from '@/lib/data/axios-client/Query';
import { LogicalOperator, FilterCondition, RouteDto } from '@/lib/data/axios-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseFilterFromURL } from './components/fillter-date/filterUtils';
import LoadingPage from './components/Loding-Tap/lodeing';
import FilterDateRoutes from './components/fillter-date';
import MapWithDefaultCoordinates from './components/maps/mapWithDefaultCoordinates';
import MapTracks from './components/maps/maptracks';
import RouteDetailsComponent from './components/detailse-consigments/RouteDetailsComponent';
import TabDynamis from '../../../../../components/Dynamic-Tabs';
import RouteDetailsSectionsComponent from '@/components/sections/consignmet-stops';

const defaultFilterLogic: LogicalOperator = LogicalOperator.AND;

const Tracks: React.FC = () => {
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const selectedRouteId = searchParams?.get('selectedItemId') || '';

  const [selectedRoute, setSelectedRoute] = useState<RouteDto | null>(null);


  const initialFilterData = parseFilterFromURL(searchParams.get('filterData') || '[]');
  const initialFilterLogic: LogicalOperator = searchParams.get('filterLogic') as LogicalOperator || defaultFilterLogic;

  const [filterData, setFilterData] = useState<FilterCondition[]>(initialFilterData);
  const [filterLogic, setFilterLogic] = useState<LogicalOperator>(initialFilterLogic);

  const { data, isLoading, isError, refetch } = useRoutesGETQuery({
    filter_Conditions: filterData,
    filter_Logic: filterData.length > 0 ? filterLogic : undefined,
  }, {
    refetchOnWindowFocus: true,
  });

  /* gg */

  const routesData: RouteDto[] = data?.data || [];

  useEffect(() => {
    if (routesData.length > 0 && selectedRouteId) {
      const route = routesData.find(r => r.id === selectedRouteId);
      setSelectedRoute(route || null);
    } else {
      setSelectedRoute(null);
    }
  }, [routesData, selectedRouteId]);

  useEffect(() => {
    const updatedFilterData = parseFilterFromURL(searchParams.get('filterData') || '[]');
    const updatedFilterLogic = searchParams.get('filterLogic') as LogicalOperator || defaultFilterLogic;

    setFilterData(updatedFilterData);
    setFilterLogic(updatedFilterLogic);
  }, [searchParams]);

  useEffect(() => {
    refetch();
  }, [refetch, filterData, filterLogic]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <Alert severity="error">Error loading data. Please try again later.</Alert>;
  }

  return (
    <Grid container spacing={0} sx={{ height: '90vh', p: -2 }}>
      <Grid item xs={3} sx={{ height: '100%', p: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* <TabsDriverRoute routesData={routesData} /> */}
          <TabDynamis routesData={routesData} higthTab={79} />
        </Box>
      </Grid>
      <Grid item xs={9} sx={{ height: '100%', p: '5px', borderLeft: '2px solid #EEEEEE' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <FilterDateRoutes />
          {selectedRoute && selectedRoute.consignments && selectedRoute.consignments.length > 0
            ? <MapTracks selectedRoute={selectedRoute} />
            : <MapWithDefaultCoordinates />
          }
          {selectedRouteId && selectedRouteId !== '0' && selectedRoute && selectedRoute.consignments && selectedRoute.consignments.length > 0 && (
            <Box sx={{ height: '30vh', p: 1, backgroundColor: '#FAFAFA', borderLeft: '2px solid #EEEEEE' }}>
              {/*  <RouteDetailsComponent heightScrol={27} /> */}
              <RouteDetailsSectionsComponent openVariable={selectedRouteId} heightScrol={27} nameSection={' Consignment / Stops'} />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}; 

export default Tracks;