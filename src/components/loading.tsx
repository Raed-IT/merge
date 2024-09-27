
import { useTheme } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { HashLoader } from "react-spinners";

export default function LoadingComponent({ isLoad, isAbsoluteIndicator, children }: { isLoad: boolean, children: React.ReactNode, isAbsoluteIndicator?: boolean }) {
    const theme = useTheme();
    if (isAbsoluteIndicator) {
        return <>
            {isLoad ? <Box zIndex={10000}
                sx={(theme) => ({ bgcolor: isLoad ? alpha(theme.palette.divider, 0.5) : alpha(theme.palette.divider, 0), opacity: isLoad ? 1 : 0, transition: "all 1s" })}
                onTransitionEnd={(event) => {
                    const element = event.currentTarget;
                    element.style.display = 'none';
                }}
                position={'absolute'} width={"100%"} height={"90vh"} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <HashLoader color={theme.palette.primary.main} />
            </Box> : null}
            {children}
        </>
    }


    if (isLoad) {
        return <Box zIndex={10000}
            onTransitionEnd={(event) => {
                const element = event.currentTarget;
                element.style.display = 'none';
            }}
            width={"100%"}
            height={"80vh"}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <HashLoader color={theme.palette.primary.main} />
        </Box>
    }
    return <>{children}</>

}