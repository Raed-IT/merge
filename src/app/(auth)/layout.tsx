import { Box, Container, Grid } from "@mui/material";
import OfficeIcon from '@/media/images/office.png'
import Image from "next/image";
import ITMLogo from '@/media/images/itm-logo.svg'
import AuthRegisterLoginRedirectLink from "@/components/auth-register-login-redirect-link";

const Layout = ({ params, children }: Readonly< { params: any,children: React.ReactNode } >) => {
    console.log(params);
    
    return (
        <>
            <Box component="header">
                <Container maxWidth="lg" >
                    <Box display="flex" justifyContent="space-between" sx={{ py: "20px", borderBottom: "1px solid", borderColor: "divider" }}>
                        <ITMLogo />
                        <AuthRegisterLoginRedirectLink/>
                    </Box>
                </Container>
            </Box>
            <Box component="main">
                <Box height={{ xs: "100%", md: "calc(100dvh - 86px)" }} display="flex" alignItems="center" justifyContent="center"  >
                    <Container maxWidth="lg" >
                        <Grid container columns={{ xs: 1, md: 2 }} columnSpacing={{ xs: 0, md: 5, lg: 15 }} display="flex" alignItems="center">
                            <Grid item xs={1} order={{ xs: 2, md: 1 }}>
                                <Box sx={{ p: { xs: 0, md: 5 }, my: { xs: 5, md: 0 }, border: "1px solid ", borderColor: { xs: "#fff", md: "divider" }, boxShadow: { xs: "0", md: "0px 2px 6px 0px rgba(94,94,94,0.14)" } }} borderRadius="6px">
                                    {children}
                                </Box>
                            </Grid>
                            <Grid item xs={1} display="flex" justifyContent="center" order={{ xs: 1, md: 2 }}>
                                <Box maxWidth="276px" textAlign="center">
                                    <Image height={250} src={OfficeIcon} alt="login-background-icon" />
                                    <Box component="p" fontSize={{ xs: 20, md: 28 }} color="success.main" mt={{ xs: 1, md: 5 }} mb={{ xs: 1, md: 3 }}>
                                        Record Expenses Effortlessly
                                    </Box>
                                    <Box component="p" fontSize={{ xs: 12, md: 14 }} m={0} color="text.secondary">
                                        Easily log your expenses with our user-friendly interface. Track every transaction in seconds
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

            </Box >
        </>
    );
}

export default Layout;