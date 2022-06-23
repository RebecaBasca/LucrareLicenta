import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../assets/images/logo.png';
import ButtonComponent from "../ButtonComponent";
import {useLayout} from "./hooks";
import {ROUTES} from "../../routes";
import {Route, Routes, Link, useNavigate} from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import {
    HomeScreen,
    LoginScreen,
    NotFoundScreen,
    RegisterScreen,
    ServiceScreen,
    TeamScreen,
    ScheduleScreen,
    ProfileScreen, PriceScreen
} from "../../screens";
import {Footer} from "../Footer";
import {APP_USER} from "../../api/client";
import {AdminScreen} from "../../screens/AdminScreen";

const Layout = () => {

    const navigate = useNavigate();

    const {
        handleOpenNavMenu,
        anchorElNav,
        handleCloseNavMenu,
        pages,
        handleOpenUserMenu,
        anchorElUser,
        settings,
        handleCloseUserMenu,
        footerItems,
        socialIcons,
        isLoggedIn,
        isMiddle,
        handleGotoProfile
    } = useLayout();


    const USER_TOKEN = localStorage.getItem(APP_USER) || null;

    const handleLogout = () => {
        localStorage.removeItem(APP_USER); // Removing the content
        localStorage.removeItem('currentUser');

        navigate(ROUTES.login);
    }

    return (
        <div>
            <AppBar
                position="sticky"
                style={{
                    backgroundColor: '#F3DFC1',
                    paddingTop: 5,
                    paddingBottom: 5
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to={ROUTES.home}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                                style={{
                                    cursor: 'pointer'
                                }}
                            >
                                <img src={logo} width={97} height={75} alt=""/>
                            </Typography>
                        </Link>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={() => handleCloseNavMenu()}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, key) => (
                                    <MenuItem key={`${key}-page-web`} onClick={() => handleCloseNavMenu(page.linkTo)}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <img src={logo} width={97} height={75} alt=""/>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                            {pages.map((page, key) => (
                                <Button
                                    key={`${key}-page-mobile`}
                                    onClick={() => handleCloseNavMenu(page.linkTo)}
                                    sx={{ my: 2, color: '#160F29', display: 'block' }}
                                >
                                    {
                                        page.isBig ? (
                                            <h2 style={{ margin: 0, padding: 0 }}>{page.label}</h2>
                                        ) : <span style={{ textTransform: 'capitalize' }}>{page.label}</span>
                                    }
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {
                                isLoggedIn ?
                                    (
                                       <>
                                           <Tooltip title="Open settings">
                                               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                               </IconButton>
                                           </Tooltip>
                                           <Menu
                                               sx={{ mt: '45px' }}
                                               id="menu-appbar"
                                               anchorEl={anchorElUser}
                                               anchorOrigin={{
                                                   vertical: 'top',
                                                   horizontal: 'right',
                                               }}
                                               keepMounted
                                               transformOrigin={{
                                                   vertical: 'top',
                                                   horizontal: 'right',
                                               }}
                                               open={Boolean(anchorElUser)}
                                               onClose={handleCloseUserMenu}
                                           >
                                               {settings.map((setting, key) => (
                                                   <MenuItem key={`${key}-${setting}-settings`} onClick={handleCloseUserMenu}>
                                                       <Typography textAlign="center">{setting}</Typography>
                                                   </MenuItem>
                                               ))}
                                           </Menu>
                                       </>
                                    )
                                :
                                    USER_TOKEN !== null ?
                                        <Box>
                                            <Button
                                                style={{
                                                    backgroundColor: `transparent`,
                                                    borderColor: '#2F2E41',
                                                    color: '#2F2E41',
                                                    borderRadius: 11,
                                                    paddingLeft: 23,
                                                    paddingRight: 23,
                                                    paddingTop: 7,
                                                    paddingBottom: 7,
                                                    textTransform: 'capitalize',
                                                    fontSize: 16
                                                }}
                                                onClick={() => handleGotoProfile()}
                                            >
                                                <AccountCircleOutlinedIcon />
                                            </Button>
                                            <Button
                                                style={{
                                                    backgroundColor: `transparent`,
                                                    borderColor: '#2F2E41',
                                                    color: '#2F2E41',
                                                    borderRadius: 11,
                                                    paddingLeft: 23,
                                                    paddingRight: 23,
                                                    paddingTop: 7,
                                                    paddingBottom: 7,
                                                    textTransform: 'capitalize',
                                                    fontSize: 16
                                                }}
                                                onClick={handleLogout}
                                            >
                                                <LogoutIcon />
                                            </Button>
                                        </Box>
                                        :
                                    <Box sx={{ flexGrow: 0 }}>
                                        <ButtonComponent
                                            label="Login"
                                            variant='text'
                                            linkTo={ROUTES.login}
                                        />
                                        <ButtonComponent
                                            label="Sign Up"
                                            linkTo={ROUTES.register}
                                        />
                                    </Box>
                            }

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    minHeight: '100vh',
                    display: isMiddle ? 'flex' : 'block',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Routes>
                    <Route path={ROUTES.home} element={<HomeScreen />}/>
                    <Route path={ROUTES.login} element={<LoginScreen />}/>
                    <Route path={ROUTES.register} element={<RegisterScreen />}/>
                    <Route path={ROUTES.services} element={<ServiceScreen />}/>
                    <Route path={ROUTES.team} element={<TeamScreen />}/>
                    <Route path={ROUTES.profile} element={<ProfileScreen />}/>
                    <Route path={ROUTES.admin} element={<AdminScreen />} />
                    <Route path={ROUTES.prices} element={<PriceScreen />}/>
                    <Route path={ROUTES.schedule} element={<ScheduleScreen />} />

                    {/* 404 route */}
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </Box>
            <Footer />
        </div>
    )
}

export default Layout;