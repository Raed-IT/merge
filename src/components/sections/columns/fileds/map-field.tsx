import React from 'react';
import { FormControl } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { GlobalDataType } from '@/types';

type FieldComponentProps = {
    disabled: boolean,
    data?: GlobalDataType | undefined,
};

function MapFieldComponent({
    data: recordData,
    disabled,
}: FieldComponentProps) {
    const lat = recordData?.latitude ?? 40.7128;
    const lng = recordData?.longitude ?? -74.0060;

    return (<>
        <FormControl fullWidth disabled={!!disabled}>
            <LoadScript googleMapsApiKey="AIzaSyDVq5r9h8vzWBrUa-9uSffmGt2cbUw9388">
                <GoogleMap
                    mapContainerStyle={{
                        width: '300px',
                        height: '200px',
                    }}
                    center={{ lat, lng }}
                    zoom={13}
                >
                    <Marker position={{ lat, lng }} />
                </GoogleMap>
            </LoadScript>
        </FormControl>
    </>);
}

export default MapFieldComponent;
