import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, InfoWindow, LoadScript } from '@react-google-maps/api';
import { useGetHistoryQuery, useWarehousesGET2Query } from '@/lib/data/axios-client/Query';
import { Box, CircularProgress, Grid, Skeleton, Switch, Typography } from '@mui/material';
import { MarkerClusterer } from '@react-google-maps/api';
import { RouteDto } from '@/lib/data/axios-client';

type MapProps = {
    selectedRoute: RouteDto | null;
};

const containerStyle = {
    width: '100%',
    height: '100%'
};

const MAX_WAYPOINTS = 23;

const MapTracks: React.FC<MapProps> = ({ selectedRoute }) => {
    const [showConsignments, setShowConsignments] = useState(true);
    const [showwarehouseLocation, setShowWarehouse] = useState(true);
    const [showDriverLocation, setShowDrivet] = useState(true);
    const [showDriverPath, setShowDriverPath] = useState(false);
    const [directionsResponses, setDirectionsResponses] = useState<google.maps.DirectionsResult[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [showReturnPath, setShowReturnPath] = useState(false);
    const [returnDirections, setReturnDirections] = useState<google.maps.DirectionsResult | null>(null);

    const [activeMarker, setActiveMarker] = useState<{ lat: number, lng: number } | null>(null);
    const [infoWindowContent, setInfoWindowContent] = useState<{ name: string, address: string } | null>(null);

    const warehouseId = selectedRoute?.warehouseId;
    const { data: warehouseData } = useWarehousesGET2Query({ id: warehouseId ?? '' });

    const { data: datahistory } = useGetHistoryQuery({
        id: selectedRoute?.employee?.id ?? '',
    });
    const driverData = useMemo(() => (
        datahistory?.map((history) => ({
            name: history.entryDate,
            latitude: history.latitude,
            longitude: history.longitude,
        })) || []
    ), [selectedRoute]);

    const driverLocation = useMemo(() => {
        if (driverData.length > 0) {
            return {
                lat: driverData[0].latitude ?? warehouseData?.latitude ?? 0,
                lng: driverData[0].longitude ?? warehouseData?.longitude ?? 0,
            };
        }
        if (warehouseData) {
            return { lat: warehouseData.latitude, lng: warehouseData.longitude };
        }
        return { lat: 0, lng: 0 };
    }, [driverData, warehouseData]);


    console.log(driverLocation);

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
        selectedRoute?.consignments?.map(consignment => ({
            lat: consignment.latitude ?? 0,
            lng: consignment.longitude ?? 0,
            name: consignment.customerName ?? 'Unknown',
            address: consignment.address ?? 'No address'
        })) || [], [selectedRoute]);

    const [startPoint, endPoint] = useMemo(() => {
        if (coordinates.length > 0) {
            if (selectedRoute?.returnToStart) {
                return [warehouseLocation, warehouseLocation];
            }
            return [warehouseLocation, coordinates[coordinates.length - 1]];
        }
        return [warehouseLocation, warehouseLocation];
    }, [coordinates, warehouseLocation, selectedRoute]);

    const center = useMemo(() => warehouseLocation, [warehouseLocation]);

    const batchWaypoints = (waypoints: google.maps.DirectionsWaypoint[]) => {
        const batches: google.maps.DirectionsWaypoint[][] = [];
        for (let i = 0; i < waypoints.length; i += MAX_WAYPOINTS) {
            batches.push(waypoints.slice(i, i + MAX_WAYPOINTS));
        }
        return batches;
    };
    const calculateReturnRoute = useCallback(() => {
        if (coordinates.length === 0) return;

        const lastCoordinate = coordinates[coordinates.length - 1];

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: new google.maps.LatLng(lastCoordinate.lat, lastCoordinate.lng),
                destination: new google.maps.LatLng(warehouseLocation.lat, warehouseLocation.lng),
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setReturnDirections(result);
                } else {
                    console.error('Error fetching return directions: ', status);
                }
            }
        );
    }, [coordinates, warehouseLocation]);

    const calculateRoutes = useCallback(() => {
        const waypointBatches = batchWaypoints(coordinates.map(coord => ({
            location: new google.maps.LatLng(coord.lat, coord.lng),
            stopover: true
        })));

        const newDirectionsResponses: google.maps.DirectionsResult[] = [];

        waypointBatches.forEach((batch, index) => {
            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: index === 0 ? new google.maps.LatLng(startPoint.lat, startPoint.lng) : batch[0].location as google.maps.LatLng,
                    destination: batch[batch.length - 1].location as google.maps.LatLng,
                    waypoints: batch.slice(1, -1),
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result !== null) {
                        newDirectionsResponses.push(result);
                        if (newDirectionsResponses.length === waypointBatches.length) {
                            setDirectionsResponses(newDirectionsResponses);
                        }
                    } else {
                        console.error('Error fetching directions: ', status);
                    }
                });
        });
    }, [coordinates, startPoint, endPoint]);
    useEffect(() => {
        if (showDriverPath || showReturnPath) {
            calculateReturnRoute();
        } else {
            setDirectionsResponses([]);
            setReturnDirections(null);
        }
    }, [showDriverPath, showReturnPath, calculateRoutes]);

    useEffect(() => {
        if (showDriverPath) {
            calculateRoutes();
        } else {
            setDirectionsResponses([]);
        }
    }, [showDriverPath, calculateRoutes]);

    const mapRef = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && directionsResponses.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            directionsResponses.forEach(response => {
                response.routes[0].overview_path.forEach((latLng: google.maps.LatLng) => {
                    bounds.extend(latLng);
                });
            });
            mapRef.current.fitBounds(bounds);
        }
    }, [directionsResponses]);

    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <Box sx={{
                position: 'absolute',
                top: '40%',
                left: '20px',
                zIndex: 1000,
                width: '13%',
            }}>
                <Grid container spacing={2}>
                    {[
                        { label: 'Route', value: showDriverPath, setValue: setShowDriverPath },
                        { label: 'Return Path', value: showReturnPath, setValue: setShowReturnPath },
                        { label: 'Consignments', value: showConsignments, setValue: setShowConsignments },
                        { label: 'Warehouses', value: showwarehouseLocation, setValue: setShowWarehouse },
                        { label: 'Drivers', value: showDriverLocation, setValue: setShowDrivet }
                    ].map(({ label, value, setValue }) => (
                        <Grid xs={12} sx={{ backgroundColor: 'white', borderRadius: '10px', p: '8px',mt:'6px' }} key={label}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Typography variant="body2" fontSize="small">{label}</Typography>
                                <Switch size="small" checked={value} onChange={() => setValue(prev => !prev)} />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <LoadScript googleMapsApiKey="AIzaSyDVq5r9h8vzWBrUa-9uSffmGt2cbUw9388"
                onLoad={() => setLoaded(true)} >
                {loaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={13}
                        onLoad={(map: google.maps.Map) => {
                            mapRef.current = map;
                        }}
                    >
                        {showDriverPath && directionsResponses.map((directionsResponse, index) => (
                            <DirectionsRenderer
                                key={index}
                                directions={directionsResponse}
                                options={{ polylineOptions: { strokeColor: 'blue', strokeOpacity: 1.0, strokeWeight: 2 } }}
                            />
                        ))}
                        {showReturnPath && returnDirections && (
                            <DirectionsRenderer
                                directions={returnDirections}
                                options={{
                                    polylineOptions: {
                                        strokeColor: 'red',
                                        strokeOpacity: 1.0,
                                        strokeWeight: 2
                                    }
                                }}
                            />
                        )}
                        {showConsignments && (
                            <>
                                {coordinates.map((coord, index) => (
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
                                <MarkerClusterer
                                    options={{
                                        styles: [
                                            {
                                                url: '/images/light-png-42438.png',  // Cluster icon
                                                height: 40,
                                                width: 40,
                                                textColor: '#000000',
                                                textSize: 16,
                                            },
                                        ],
                                        // Specify other options as needed, such as maxZoom for clustering to control clustering behavior
                                        maxZoom: 15, // Example: stop clustering beyond zoom level 15
                                    }}
                                >
                                    {(clusterer) => (
                                        <>
                                            {coordinates.map((coord, index) => (
                                                <Marker
                                                    key={index}
                                                    position={{ lat: coord.lat, lng: coord.lng }}
                                                    onClick={() => {
                                                        setActiveMarker({ lat: coord.lat, lng: coord.lng });
                                                        setInfoWindowContent({
                                                            name: coord.name,
                                                            address: coord.address,
                                                        });
                                                    }}
                                                    clusterer={clusterer}
                                                >
                                                    {activeMarker &&
                                                        infoWindowContent &&
                                                        activeMarker.lat === coord.lat &&
                                                        activeMarker.lng === coord.lng && (
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
                                        </>
                                    )}
                                </MarkerClusterer>

                            </>
                        )}
                        {showwarehouseLocation && (
                            <Marker
                                position={warehouseLocation}
                                icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
                                onClick={() => {
                                    setActiveMarker(warehouseLocation);
                                    setInfoWindowContent({
                                        name: warehouseData?.name || '',
                                        address: warehouseData?.address || '',
                                    });
                                }}

                            />
                        )}
                        {showDriverLocation && (
                            <Marker
                                position={{
                                    lat: driverData.length > 0 ? driverData[0].latitude ?? 0 : warehouseLocation.lat,
                                    lng: driverData.length > 0 ? driverData[0].longitude ?? 0 : warehouseLocation.lng
                                }}
                                icon={{
                                    url: '/images/logistic.png',
                                    scaledSize: window.google ? new google.maps.Size(40, 40) : undefined,
                                }}


                                onClick={() => {
                                    setActiveMarker({
                                        lat: driverLocation.lat ?? warehouseLocation.lat,
                                        lng: driverLocation.lng ?? warehouseLocation.lng,
                                    });
                                    setInfoWindowContent({
                                        name: driverData.length > 0 ? driverData[0].name?.toString() || '' : '',
                                        address: '',
                                    });
                                }}
                            />
                        )}
                    </GoogleMap>
                ) : (
                    <Box display="flex" justifyContent="space-between">
                        <Skeleton variant="rectangular" width="100%" height={'40vh'} />
                    </Box>
                )}
            </LoadScript>

        </Box>
    );
}; export default MapTracks;
