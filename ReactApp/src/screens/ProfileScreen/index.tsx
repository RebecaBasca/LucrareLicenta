import profilePicture from '../../assets/images/profile2.png';
import './table.css';
import {CommonHeaderProps, CommonTableProps} from "./types";
import {useProfileScreen} from "./hooks";
import Button from "@mui/material/Button";
import React from "react";
import {Edit} from "@mui/icons-material";
import InputComponent from "../../components/InputComponent";
import {ROUTES} from "../../routes";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";

const ProfileScreen = () => {

    const {
        spaceBetween,
        previousSchedulesHeaders,
        therapists,
        nextScheduleHeaders,
        futures,
        editableFields,
        handleToggleEditField,
        values,
        onChange,
        currentUser
    } = useProfileScreen();

    const navigate = useNavigate();

    const redirectToProgram = () => {
        navigate(ROUTES.schedule);
    }
    return (
        <>
            <div
                style={{
                    backgroundColor: '#DDBEA8',
                    height: 120,
                    display: 'flex',
                    alignItems: 'flex-end',
                    paddingLeft: 100,
                    paddingRight: 100
                }}
            >
                <div
                    style={{
                        marginBottom: -spaceBetween
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: 35
                        }}
                    >
                        <div>
                            <img
                                src={profilePicture}
                                width={150}
                                height={150}
                                alt=""
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, paddingTop: 20 }}>
                                {
                                    editableFields.name ? (
                                        <div>
                                            <InputComponent
                                                placeholder="Nume și prenume"
                                                style={{
                                                    minWidth: 320
                                                }}
                                                value={values.name}
                                                name='name'
                                                onChange={onChange}
                                            />
                                        </div>
                                    ) : (
                                        <h1
                                            style={{
                                                color: '#fff',
                                                margin: 0,
                                            }}
                                        >
                                            {values ? values.name : '-' }
                                        </h1>
                                    )
                                }
                                <Button
                                    variant="outlined"
                                    style={{
                                        backgroundColor: `transparent`,
                                        borderColor: 'transparent',
                                        color: '#2F2E41',
                                        borderRadius: 11,
                                        textTransform: 'capitalize',
                                        fontSize: 16
                                    }}
                                    onClick={() => handleToggleEditField('name')}
                                >
                                    <Edit />
                                </Button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {
                                    editableFields.email ? (
                                        <div>
                                            <InputComponent
                                                placeholder="Email"
                                                style={{
                                                    minWidth: 320
                                                }}
                                                value={values.email}
                                                name='email'
                                                onChange={onChange}
                                            />
                                        </div>
                                    ) : (
                                        <h3
                                            style={{
                                                margin: 0,
                                                padding: 0
                                            }}
                                        >
                                            Email: {values ? values.email : '-' }
                                        </h3>
                                    )
                                }
                                <Button
                                    variant="outlined"
                                    style={{
                                        backgroundColor: `transparent`,
                                        borderColor: 'transparent',
                                        color: '#2F2E41',
                                        borderRadius: 11,
                                        textTransform: 'capitalize',
                                        fontSize: 16
                                    }}
                                    onClick={() => handleToggleEditField('email')}
                                >
                                    <Edit />
                                </Button>
                            </div>

                            <h3>Password: ******</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    marginTop: spaceBetween + 15,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 150,
                    paddingTop: 70,
                    paddingBottom: 70
                }}
            >
                <div>
                    <CommonHeader
                        title="Programări anterioare"
                    />

                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CommonTable
                            headers={previousSchedulesHeaders}
                            rows={therapists}
                        />
                    </div>
                </div>

                <div>
                    <CommonHeader
                        title="Programări viitoare"
                    />

                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CommonTable
                            headers={nextScheduleHeaders}
                            rows={futures}
                        />
                    </div>
                </div>



                <Box style = {{ display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant="outlined"
                        style={{
                            backgroundColor: `#3C938F`,
                            borderColor: "transparent",
                            color: 'white',
                            borderRadius: "20px",
                            width: '326px',
                            height: '80px',
                            textTransform: 'capitalize',
                            //fontSize: 20
                        }}
                        onClick={() => navigate(ROUTES.schedule)}
                    >
                        ADAUGĂ O PROGRAMARE NOUĂ
                    </Button>
                </Box>
            </div>
        </>
    )
}

const CommonHeader = ({ title }: CommonHeaderProps) => {
    return (
        <div
            style={{
                background: 'rgba(54, 143, 139, 0.36)',
                height: 100,
                width: 650,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                fontSize: '20px',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,

            }}
        >
            <h3 style={{ paddingRight: 20 }}>{ title }</h3>
        </div>
    )
}

const CommonTable = ({ headers, rows }: CommonTableProps) => {
    return (
        <table className="commonTable" style={{ maxWidth: 900 }}>
            <thead>
            <tr>
                {
                    headers.map((headerItem, idx) => <th key={idx}>{headerItem.name}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                rows.map((rowItem, jdx) => (
                    <tr>
                        {
                            headers.map((headerItem, idx) => (
                                <td key={`${jdx}-${idx}`}>{rowItem[headerItem.type]}</td>
                            ))
                        }
                    </tr>
                ))
            }
            </tbody>

        </table>
    )
}

export {
    ProfileScreen
}