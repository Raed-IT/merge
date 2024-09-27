import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer, InfoWindow, LoadScript } from '@react-google-maps/api';
import { ConsignmentDto, RouteDto, SectionDto, WarehouseDto } from '@/lib/data/axios-client';
import { useRoutesGETQuery, useWarehousesGET2Query } from '@/lib/data/axios-client/Query';
import { Box, CircularProgress, Grid, Switch, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import { useGlobalData } from '@/utils/api-global-hook/useGetGlobal';
import { useParams } from 'next/navigation';

type MapProps = {
    route?: RouteDto | null;
    section: SectionDto,
};

const containerStyle = {
    width: '100%',
    height: '100%'
};

const RouteMapComponent = ({   section }: MapProps) => {
    const param =useParams();
     
    const [showConsignments, setShowConsignments] = useState(true);
    const [showDriverPath, setShowDriverPath] = useState(false);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [activeMarker, setActiveMarker] = useState<{ lat: number, lng: number } | null>(null);
    const [infoWindowContent, setInfoWindowContent] = useState<{ name: string, address: string } | null>(null);
    const { data:route,isLoading } = useGlobalData({
        dataSourceName: (section.dataSource?.name ?? "" )+`/${param?.recordId}`,
        enabled: !!section?.dataSource?.name,
    });
     
     
     
    const warehouseId = route?.warehouseId;
    const { data: warehouseData } = useWarehousesGET2Query({ id: warehouseId ?? '' });

    const warehouseLocation = useMemo(() => {
        if (warehouseData) {
            return {
                lat: warehouseData.latitude ?? 0,
                lng: warehouseData.longitude ?? 0
            };
        }
        return { lat: 0, lng: 0 };
    }, [warehouseData]);

    const coordinates = useMemo(() =>
        route?.consignments?.map((consignment :any)=> ({
            lat: consignment.latitude ?? 0,
            lng: consignment.longitude ?? 0,
            name: consignment.customerName ?? 'Unknown',
            address: consignment.address ?? 'No address'
        })) || [], [route]);

    const [startPoint, endPoint] = useMemo(() => {
        if (coordinates.length > 0) {
            if (route?.returnToStart) {
                return [warehouseLocation, warehouseLocation];
            }
            return [warehouseLocation, coordinates[coordinates.length - 1]];
        }
        return [warehouseLocation, warehouseLocation];
    }, [coordinates, warehouseLocation, route]);

    const center = useMemo(() => warehouseLocation, [warehouseLocation]);

    const calculateRoute = useCallback(() => {
        if (window.google) {
            const directionsService = new google.maps.DirectionsService();
            const waypoints = coordinates.map((coord:any) => ({
                location: new google.maps.LatLng(coord.lat, coord.lng),
                stopover: true
            }));

            directionsService.route(
                {
                    origin: new google.maps.LatLng(startPoint.lat, startPoint.lng),
                    destination: new google.maps.LatLng(endPoint.lat, endPoint.lng),
                    waypoints: waypoints,
                    travelMode: google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                    } else {
                        console.error('Error fetching directions: ', status);
                    }
                }
            );
        } else {
            console.error('Google Maps API not loaded.');
        }
    }, [startPoint, endPoint, coordinates]);

    useEffect(() => {
        if (showDriverPath) {
            calculateRoute();
        } else {
            setDirectionsResponse(null);
        }
    }, [showDriverPath, calculateRoute]);

    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && directionsResponse) {
            const bounds = new google.maps.LatLngBounds();
            directionsResponse.routes[0].overview_path.forEach((latLng: google.maps.LatLng) => {
                bounds.extend(latLng);
            });
            mapRef.current.fitBounds(bounds);
        }
    }, [directionsResponse]);
    return <Box sx={{ position: 'relative', height: '100%', width: '100%', minHeight: 300 }}>
          {/* {
            !isLoading && !!route ? <> */}
             <Box
                  sx={{
                      position: 'absolute',
                      top: '70%',
                      left: '20px',
                      zIndex: 1000,
                      width: '90px',
                  }}
              >
              
                  <Grid container spacing={2}>
                      <Grid xs={12} sx={{ backgroundColor: 'white', borderRadius: '10px', p: '7px' }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item sx={{ mr: '5px' }}>
                                  <LocationOnIcon />
                              </Grid>
                              <Grid item sx={{ mr: '5px' }}>
                                  <Switch
                                      checked={showConsignments}
                                      onChange={() => setShowConsignments(prev => !prev)}
                                  />
                              </Grid>
                          </Grid>
                      </Grid>
                      <Grid xs={12} sx={{ backgroundColor: 'white', mt: 1, borderRadius: '10px', p: '8px' }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                  <TurnSlightRightIcon />
                              </Grid>
                              <Grid item>
                                  <Switch
                                      checked={showDriverPath}
                                      onChange={() => setShowDriverPath(prev => !prev)}
                                  />
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Box>
  
              <LoadScript googleMapsApiKey="AIzaSyDVq5r9h8vzWBrUa-9uSffmGt2cbUw9388">
                  <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={13}
                      onLoad={(map: google.maps.Map) => {
                          mapRef.current = map;
                      }}
                  >
                      {showDriverPath && directionsResponse && (
                          <DirectionsRenderer
                              directions={directionsResponse}
                              options={{ polylineOptions: { strokeColor: 'blue', strokeOpacity: 1.0, strokeWeight: 2 } }}
                          />
                      )}
  
                      {showConsignments && coordinates.map((coord:any, index:number) => (
                          <Marker
                              key={index}
                              position={{ lat: coord.lat, lng: coord.lng }}
                              onClick={() => {
                                  setActiveMarker({ lat: coord.lat, lng: coord.lng });
                                  setInfoWindowContent({
                                      name: coord.name,
                                      address: coord.address
                                  });
                              }}
                              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} // Marker color is blue
                          >
                              {activeMarker && infoWindowContent && activeMarker.lat === coord.lat && activeMarker.lng === coord.lng && (
                                  <InfoWindow
                                      position={{ lat: coord.lat, lng: coord.lng }}
                                      onCloseClick={() => setActiveMarker(null)}
                                  >
                                      <Box>
                                          <Typography variant="h6">{infoWindowContent.name}</Typography>
                                          <Typography variant="body2">{infoWindowContent.address}</Typography>
                                      </Box>
                                  </InfoWindow>
                              )}
                          </Marker>
                      ))}
  
                      {showConsignments && (
                          <Marker
                              position={warehouseLocation}
                              icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} // Marker color is blue
                          />
                      )}
                  </GoogleMap>
              </LoadScript>
            {/* </>
            :  
            <Box width={'100%'} height={"100%"} display={"flex"} justifyContent={'center'} alignItems={'center'}>
            <CircularProgress disableShrink />
            </Box>
          } */}
        </Box> 
     ;
};

export default RouteMapComponent;
