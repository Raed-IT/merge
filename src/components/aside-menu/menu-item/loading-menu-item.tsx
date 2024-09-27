import { Box, Skeleton } from "@mui/material";
import { generateRandomNumber } from "@/utils/randoms";
import { useStore } from "zustand";
import { useGlobalStore } from "@/stores/globalStore";


const LoadingMenuItem = ({ length = 10, showDot = false, }: { length?: number, showDot?: boolean }) => {
    const isExpandedAsideMenu = useStore(useGlobalStore, (state) => state.isExpandedAsideMenu);
    return Array.from({ length: length }, (value, key) => key).map((va) =>
        <Box width={"100%"} key={va} display={'flex'} justifyContent={isExpandedAsideMenu ? "start" : 'center'} alignItems={'center'} pl={isExpandedAsideMenu ? 1 : 0} pt={1} gap={1}>
            <Skeleton animation="wave" variant="rectangular" width={"22px"} sx={{ borderRadius: 0.3 }} height={"22px"} />
            {
                isExpandedAsideMenu
                    ? <Box display={'flex'} justifyContent={'space-between'} width={"80%"}>
                        <Skeleton width={generateRandomNumber(50, 90)} variant="text" sx={{ fontSize: '0.8rem', }} />
                        {showDot
                            ? <Box px={2.6}>
                                <Skeleton variant={'circular'} height={15} width={20} />
                            </Box>
                            : null}
                    </Box>
                    : null
            }
        </Box>
    );
}

export default LoadingMenuItem;
