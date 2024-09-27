import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import { Box, Grid, Skeleton, Switch, Typography } from '@mui/material';
import { useRoutesGETQuery, useWarehousesGETQuery } from '@/lib/data/axios-client/Query';
import { ConsignmentDto, RouteDto, WarehouseDto } from '@/lib/data/axios-client';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const MapWithDefaultCoordinates: React.FC = () => {
    const { data: routesData } = useRoutesGETQuery();
    const { data: warehouseData } = useWarehousesGETQuery();
    const [consignmentsArray, setConsignmentsArray] = useState<Array<{ lat: number, lng: number, name: string, address: string }>>([]);
    const [warehousesArray, setWarehousesArray] = useState<Array<{ id: string, lat: number, lng: number }>>([]);
    const [activeMarker, setActiveMarker] = useState<{ lat: number, lng: number } | null>(null);
    const [infoWindowContent, setInfoWindowContent] = useState<{ name: string, address: string } | null>(null);
    const [showConsignments, setShowConsignments] = useState(true);
    const [showWarehouses, setShowWarehouses] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [showCluster, setShowCluster] = useState(true);
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerClusterRef = useRef<MarkerClusterer | null>(null);
    const lastBoundsRef = useRef<google.maps.LatLngBounds | null>(null);

    useEffect(() => {
        let newConsignmentsArray: Array<{ lat: number, lng: number, name: string, address: string }> = [];
        const warehousesData: Array<{ id: string, lat: number, lng: number }> = [];

        if (warehouseData?.data) {
            warehouseData.data.forEach((warehouse: WarehouseDto) => {
                warehousesData.push({
                    id: warehouse.id ?? '',
                    lat: warehouse.latitude ?? 0,
                    lng: warehouse.longitude ?? 0,
                });
            });
        }

        if (routesData?.data && showConsignments) {
            routesData.data.forEach((route: RouteDto) => {
                if (route.consignments) {
                    route.consignments.forEach((consignment: ConsignmentDto) => {
                        newConsignmentsArray.push({
                            lat: consignment.latitude ?? 0,
                            lng: consignment.longitude ?? 0,
                            name: consignment.customerName ?? 'Unknown',
                            address: consignment.address ?? 'No address',
                        });
                    });
                }
            });
        }

        setConsignmentsArray(newConsignmentsArray);
        setWarehousesArray(warehousesData);
    }, [routesData, warehouseData, showConsignments]);

    const center = useMemo(() => {
        const allCoords = [
            ...consignmentsArray.filter(() => showConsignments),
            ...warehousesArray.filter(() => showWarehouses),
        ];
        if (allCoords.length > 0) {
            const lat = allCoords.reduce((acc, coord) => acc + coord.lat, 0) / allCoords.length;
            const lng = allCoords.reduce((acc, coord) => acc + coord.lng, 0) / allCoords.length;
            return { lat, lng };
        }
        return { lat: 0, lng: 0 }; 
    }, [consignmentsArray, warehousesArray, showConsignments, showWarehouses]);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        const bounds = new google.maps.LatLngBounds();
        
        if (showConsignments) {
            consignmentsArray.forEach(coord => bounds.extend(new google.maps.LatLng(coord.lat, coord.lng)));
        }
        if (showWarehouses) {
            warehousesArray.forEach(warehouse => bounds.extend(new google.maps.LatLng(warehouse.lat, warehouse.lng)));
        }

        if (bounds.isEmpty()) {
            if (warehousesArray.length > 0) {
                const firstWarehouse = warehousesArray[0]; 
                map.setCenter({ lat: firstWarehouse.lat, lng: firstWarehouse.lng });
                map.setZoom(10);  
            } else if (lastBoundsRef.current) {
                map.fitBounds(lastBoundsRef.current);  
            } else {
                map.setCenter(center);
                map.setZoom(10);  
            }
        } else {
            if (!bounds.isEmpty()) {
                if (consignmentsArray.length <= 2 && warehousesArray.length <= 2) {
                    map.setZoom(10);  
                    map.setCenter(center);
                } else {
                    map.fitBounds(bounds);
                    map.setZoom(10);  
                }
                lastBoundsRef.current = bounds;  
            } else if (lastBoundsRef.current) {
                map.fitBounds(lastBoundsRef.current);  
            } else {
                map.setCenter(center);
                map.setZoom(10); 
            }
        }

        const markers = [
            ...consignmentsArray.filter(() => showConsignments),
            ...warehousesArray.filter(() => showWarehouses),
        ].map(coord => new google.maps.Marker({
            position: { lat: coord.lat, lng: coord.lng },
        }));

        if (showCluster && mapRef.current) {
            if (markerClusterRef.current) {
                markerClusterRef.current.clearMarkers();
            }
            markerClusterRef.current = new MarkerClusterer({
                map: mapRef.current,
                markers,
            });
        } else {
            markers.forEach(marker => marker.setMap(mapRef.current));
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            handleMapLoad(mapRef.current);
        }
    }, [showCluster, consignmentsArray, warehousesArray, showConsignments, showWarehouses]);

    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '70%',
                    left: '20px',
                    zIndex: 1000,
                    width: '12%',
                    height: '38px',
                    p: 0
                }}
            >
                <Grid container spacing={2}>
                    <Grid xs={12} sx={{ backgroundColor: 'white', borderRadius: '10px', p: 1 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="body2" fontSize={'small'}>
                                    Consignments
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    size='small'
                                    checked={showConsignments}
                                    onChange={() => setShowConsignments(prev => !prev)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sx={{ backgroundColor: 'white', borderRadius: '10px', p: 1, mt: 1 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="body2" fontSize={'small'}>
                                    Warehouses
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Switch
                                    size='small'
                                    checked={showWarehouses}
                                    onChange={() => setShowWarehouses(prev => !prev)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <LoadScript googleMapsApiKey="AIzaSyDVq5r9h8vzWBrUa-9uSffmGt2cbUw9388"
                onLoad={() => setLoaded(true)} >
                {loaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={handleMapLoad}
                    >
                        {showWarehouses && warehousesArray.map(warehouse => (
                            <Marker
                                key={warehouse.id}
                                position={{ lat: warehouse.lat, lng: warehouse.lng }}
                                onClick={() => {
                                    setActiveMarker({ lat: warehouse.lat, lng: warehouse.lng });
                                    setInfoWindowContent({
                                        name: 'Warehouse',
                                        address: `Warehouse ID: ${warehouse.id}`
                                    });
                                }}
                            />
                        ))}
                        {showConsignments && consignmentsArray.map((coord, index) => (
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
                            />
                        ))}
                        {infoWindowContent && activeMarker && (
                            <InfoWindow position={activeMarker}>
                                <div>
                                    <h3>{infoWindowContent.name}</h3>
                                    <p>{infoWindowContent.address}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                ) : (
                    <Box display="flex" justifyContent="space-between">
                        <Skeleton variant="rectangular" width="100%" height={'65vh'} />
                    </Box>
                )}
            </LoadScript>
        </Box>
    );
};

export default MapWithDefaultCoordinates;
