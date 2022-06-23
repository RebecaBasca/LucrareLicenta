import React from 'react';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    MenuItem,
    Select
} from "@mui/material";
import {useScheduleScreen} from "./hooks";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputComponent from "../../components/InputComponent";
import {EmailOutlined} from "@mui/icons-material";
import calendarIcon from '../../assets/images/calendarIcon.png';
import ButtonComponent from "../../components/ButtonComponent";
import Button from "@mui/material/Button";

const ScheduleScreen = () => {

    const {
        service,
        therapist,
        content,
        services,
        therapists,
        availableHours,
        selectCurrentHour,
        selectedHour,
        selectedDate,
        setSelectedDate,
        showChildInput,
        setShowChildInput,
        values,
        onChange,
        showSummary,
        setCurrentSelect,
        handleSubmit
    } = useScheduleScreen();

    return (
        <Grid
            container
            spacing={2}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            pt={5}
        >
            <Grid item xs={10}>
                <Box>
                    <Box
                        border={'1px solid #F3DFC1'}
                        borderRadius={4}
                        display={'flex'}
                        minHeight={500}
                    >
                        <Box
                            flex={1}
                            bgcolor={'#DDBEA8'}
                            padding={2}
                            borderRadius={4}
                            textAlign={'center'}
                        >
                            <Box>
                                <h2 style={{ color: '#fff' }}>{content.leftFirstHeading}</h2>
                                <FormControl fullWidth>
                                    <Select
                                        value={service}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: 17
                                        }}
                                        onChange={(event) => setCurrentSelect(event.target.value, 'service')}
                                    >
                                        {services.map((serviceItem:any, idx:any) => <MenuItem key={idx} value={serviceItem.id}>{serviceItem.text}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <h2 style={{ color: '#fff' }}>{content.leftSecondHeading}</h2>
                                <FormControl fullWidth>
                                    <Select
                                        value={therapist}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: 17
                                        }}
                                        onChange={(event) => setCurrentSelect(event.target.value, 'therapist')}
                                    >
                                        {therapists.map((therapistItem:any, idx:any) => <MenuItem key={idx} value={therapistItem.id}>{therapistItem.text}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <h2 style={{ color: '#fff'}}>{content.leftThirdHeading}</h2>
                                <Box>
                                    {
                                        availableHours.map((hourItem, idx) => {
                                            return (
                                                <Box
                                                    key={idx}
                                                    marginBottom={1}
                                                    padding={1}
                                                    borderRadius={8}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: selectedHour === idx ? 'rgba(110,218,255,0.55)' : '#fff'
                                                    }}
                                                    onClick={() => selectCurrentHour(idx)}
                                                >
                                                    {hourItem}
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            flex={2}
                            padding={2}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    disablePast
                                    displayStaticWrapperAs="desktop"
                                    value={selectedDate}
                                    onChange={(newValue) => {
                                        setSelectedDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </Box>
                <Box
                    mt={4}
                    maxWidth={669}
                >
                    <Box
                        style={{
                            borderBottom: '1px solid #DDBEA8'
                        }}
                    >
                        <p style={{ marginBottom: 10 }}>Informatii generale</p>
                    </Box>
                    <Box
                        display={'flex'}
                        gap={4}
                    >
                        <InputComponent
                            placeholder="Nume*"
                            icon={<AccountCircleOutlinedIcon />}
                            style={{
                                minWidth: 320,
                                marginTop: 20
                            }}
                            value={values.firstName}
                            name='firstName'
                            onChange={onChange}
                        />
                        <InputComponent
                            placeholder="Prenume*"
                            icon={<AccountCircleOutlinedIcon />}
                            style={{
                                minWidth: 320,
                                marginTop: 20
                            }}
                            value={values.lastName}
                            name='lastName'
                            onChange={onChange}
                        />
                    </Box>

                    <InputComponent
                        placeholder="Email*"
                        icon={<EmailOutlined />}
                        style={{
                            minWidth: 320,
                            width: '100%',
                            marginTop: 20
                        }}
                        value={values.email}
                        name='email'
                        onChange={onChange}
                    />

                    <Box
                        maxWidth={669}
                    >
                        <FormControl sx={{ mt: 3, mb: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Optional:</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={showChildInput} onChange={(event) => setShowChildInput(event.target.checked)} name="gilad" />
                                    }
                                    label="Programarea este pentru copilul meu"
                                />
                            </FormGroup>
                        </FormControl>
                        {
                            showChildInput && (
                                <InputComponent
                                    placeholder="Nume complet copil"
                                    icon={<AccountCircleOutlinedIcon />}
                                    style={{
                                        marginBottom: 40,
                                        width: '100%',
                                    }}
                                    value={values.childName}
                                    name='childName'
                                    onChange={onChange}
                                />
                            )
                        }
                    </Box>
                </Box>
                {
                    showSummary && (
                    <>
                        <h3>Sumar programare</h3>
                        <Box
                            bgcolor="#DDBEA8"
                            borderRadius={8}
                            width={'100%'}
                            padding={3}
                            marginBottom={10}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box>
                                    <Box
                                        minHeight={300}
                                    >
                                        <Box
                                            color="#fff"
                                        >
                                            <h3>Serviciu:  {values.selectedService}</h3>
                                            <h3>Terapeut:  {values.selectedTherapist}</h3>
                                            <h3>Data programarii:  {selectedDate?.toDateString()}</h3>
                                            <h3>Ora programarii:  {values.selectedHour}</h3>
                                            {
                                                showChildInput && !!values.childName && (
                                                    <h3>Nume complet copil: {values.childName}</h3>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    {/*<img*/}
                                    {/*    src={calendarIcon}*/}
                                    {/*    alt=""*/}
                                    {/*    width={300}*/}
                                    {/*/>*/}
                                </Box>
                            </Box>

                            <Box style={{ textAlign: 'center', paddingTop: 20 , marginTop: '-50px'}}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        backgroundColor: `#fff`,
                                        borderColor: 'transparent',
                                        color: '#2F2E41',
                                        borderRadius: 11,
                                        paddingLeft: 23,
                                        paddingRight: 23,
                                        paddingTop: 7,
                                        paddingBottom: 7,
                                        textTransform: 'capitalize',
                                        fontSize: 16
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Confirma programare
                                </Button>
                            </Box>
                        </Box>
                    </>
                    )
                }
            </Grid>
        </Grid>
    )
}

export {
    ScheduleScreen
}