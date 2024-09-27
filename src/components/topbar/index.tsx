import { Box, Container } from "@mui/material";
import ITMLogo from '@/media/images/itm-logo-2.svg'
import SearchBox from "./search-box";
import QuickLinks from "./quick-links";
import Link from "next/link";
const TopBar = () => {
    return (
        
            <Box bgcolor="#37474F" py={1}  color="primary.contrastText" sx={{
                position: "fixed",
                top: 0,
                left: 0,
                px: 2,
                right: 0,
                zIndex:1000
              
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                    <Box display={'flex'} height={"100%"} alignContent={"center"} justifyItems={"center"}>
                        <Link href="/apps">
                            <ITMLogo />
                        </Link>
                    </Box>
                    <SearchBox />
                    <QuickLinks />
                </Box>
            </Box>
        
    );
}

export default TopBar;