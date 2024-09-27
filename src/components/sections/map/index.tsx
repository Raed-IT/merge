 import { SectionDto } from "@/lib/data/axios-client";
import { FieldComponentValue } from "@/types";
import { Box } from "@mui/system";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

type MapSectionComponentProps = {
    section: SectionDto,
    setValue: (value: FieldComponentValue) => void,
    formData: FieldComponentValue[],
    formCheck: boolean,
    onFinishLoading?: () => void,
    showTitle?: boolean
}
const MapSectionComponent = ({ setValue, formData, formCheck, onFinishLoading, showTitle, }: MapSectionComponentProps) => {
    
    // get data 
    
    return (
        <Box sx={{ position: 'relative', height: '70vh', width: '100%' }}>
            <LoadScript googleMapsApiKey="AIzaSyDVq5r9h8vzWBrUa-9uSffmGt2cbUw9388">
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '100%'
                    }}
                    center={{ lat: 40.7128, lng: -73.85 }}
                    zoom={13}
                >
                </GoogleMap>
            </LoadScript>
        </Box>
    );
}

export default MapSectionComponent;