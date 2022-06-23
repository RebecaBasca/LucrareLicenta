import React from "react";
import profilePicture from "../../assets/images/profile2.png";
import {CommonHeaderProps, CommonTableProps} from "../ProfileScreen/types";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, MenuItem, Select} from "@mui/material";
import Modal from "react-modal";
import InputComponent from "../../components/InputComponent";
import {useAdminScreen} from "./hooks";

const AdminScreen = () => {
   const {
       serviceAddModal,
       afterOpenModal,
       setServiceAddModal,
       customStyles,
       serviceValues,
       onChangeService,
       setServicePicture,
       handleAddService,
       therapistAddModal,
       therapistValues,
       onChangeTherapist,
       setTherapistPicture,
       handleAddTherapist,
       spaceBetween,
       therapistsHeaders,
       therapistsRows,
       handleDelete,
       setTherapistAddModal,
       serviceHeaders,
       serviceRows,
       handleDeleteService
   } = useAdminScreen();

    return (
        <>
            <Modal
                isOpen={serviceAddModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => setServiceAddModal(false)}
                style={customStyles}
                contentLabel="Service Modal"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >
                    <InputComponent
                        placeholder="Nume"
                        style={{
                            minWidth: 320
                        }}
                        value={serviceValues.name}
                        name='name'
                        onChange={onChangeService}
                    />
                    <InputComponent
                        placeholder="Pret"
                        style={{
                            minWidth: 320
                        }}
                        value={serviceValues.price}
                        name='price'
                        onChange={onChangeService}
                    />
                    <InputComponent
                        placeholder="Durata"
                        style={{
                            minWidth: 320
                        }}
                        value={serviceValues.time_span}
                        name='time_span'
                        onChange={onChangeService}
                    />
                    <Select
                        value={serviceValues.category}
                        style={{
                            backgroundColor: 'rgba(243, 223, 193, 0.63)',
                            borderRadius: 17
                        }}
                        onChange={onChangeService}
                        name="category"
                    >
                        <MenuItem value="adult">Adult</MenuItem>
                        <MenuItem value="children">Children</MenuItem>
                    </Select>
                    <InputComponent
                        placeholder="Imagine"
                        style={{
                            minWidth: 320
                        }}
                        value={''}
                        name='picture'
                        type="file"
                        onChange={(event: any) => setServicePicture(event?.target?.files[0])}
                    />
                    <InputComponent
                        placeholder="Descrierea"
                        style={{
                            minWidth: 320
                        }}
                        value={serviceValues.description}
                        name='description'
                        onChange={onChangeService}
                    />

                    <Button
                        variant="contained"
                        onClick={handleAddService}
                    >
                        Salveaza
                    </Button>
                </div>
            </Modal>
            <Modal
                isOpen={therapistAddModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => setServiceAddModal(false)}
                style={customStyles}
                contentLabel="Therapist Modal"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >
                    <InputComponent
                        placeholder="Nume"
                        style={{
                            minWidth: 320
                        }}
                        value={therapistValues.name}
                        name='name'
                        onChange={onChangeTherapist}
                    />
                    <InputComponent
                        placeholder="Specializare"
                        style={{
                            minWidth: 320
                        }}
                        value={therapistValues.specialty}
                        name='specialty'
                        onChange={onChangeTherapist}
                    />
                    <InputComponent
                        placeholder="Picture"
                        style={{
                            minWidth: 320
                        }}
                        value={''}
                        name='picture'
                        type="file"
                        onChange={(event: any) => setTherapistPicture(event?.target?.files[0])}
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddTherapist}
                    >
                        Salveaza
                    </Button>
                </div>
            </Modal>
            <div
                style={{
                    backgroundColor: '#DDBEA8',
                    height: 200,
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
                                <h1
                                    style={{
                                        color: '#fff',
                                        margin: 0,
                                    }}
                                >
                                    Administrator
                                </h1>
                            </div>
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
                    paddingBottom: 70,
                }}
            >
                <div>
                    <CommonHeader
                        title="Terapeuti"
                    />

                    <div style={{ marginTop: 20, paddingLeft: 200, display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center' }}>
                        <CommonTable
                            headers={therapistsHeaders}
                            rows={therapistsRows}
                            handleDelete={handleDelete}
                        />
                        <div
                            style={{
                                alignSelf: 'flex-start',
                                paddingTop: 20
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: '#3C938F',
                                    borderRadius: '26px',
                                    color: '#fff',
                                    width: '316px',
                                    height: '58px'
                                }}
                                onClick={() => setTherapistAddModal(true)}
                            >
                                Adauga terapeut
                            </Button>
                        </div>
                    </div>
                </div>

                <div>
                    <CommonHeader
                        title="Servicii"
                    />

                    <div style={{ marginTop: 20, paddingLeft: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <CommonTable
                            headers={serviceHeaders}
                            rows={serviceRows}
                            handleDelete={handleDeleteService}
                        />
                        <div
                            style={{
                                alignSelf: 'flex-start',
                                paddingTop: 20
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: '#3C938F',
                                    borderRadius: '26px',
                                    color: '#fff',
                                    width: '316px',
                                    height: '58px'
                                }}
                                onClick={() => setServiceAddModal(true)}
                            >
                                Adauga serviciu
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const CommonHeader = ({ title }: CommonHeaderProps) => {
    return (
        <div
            style={{
                background: 'rgba(54, 143, 139, 0.36)',
                height: 90,
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

const CommonTable = ({ headers, rows, handleDelete }: CommonTableProps) => {

    const shortDescription = (description: string) => description.slice(0, 100).concat('...');

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
                            headers.map((headerItem, idx) => headerItem.type !== 'actions' && (
                                <td
                                    key={`${jdx}-${idx}`}
                                    style={{
                                        textAlign: ['picture'].includes(headerItem.type) ? 'center' : 'left'
                                    }}
                                >
                                    {
                                        headerItem.type === 'picture' ? (
                                            <img
                                                src={rowItem[headerItem.type]}
                                                width={100}
                                                height={100}
                                                alt=""
                                            />
                                        ) :
                                        headerItem.type === 'description' ? shortDescription(rowItem[headerItem.type]) : rowItem[headerItem.type]
                                    }
                                </td>
                            ))
                        }
                        <td
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#F0576A'
                                }}
                                onClick={() => handleDelete(rowItem?.id)}
                            >
                                <DeleteIcon />
                            </Button>
                        </td>
                    </tr>
                ))
            }
            </tbody>

        </table>
    )
}

export {
    AdminScreen
}
