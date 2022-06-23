import React, {useCallback, useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import firstImage from '../../assets/images/image 3.png';
import secondImage from '../../assets/images/3918491 1.png';
import thirdImage from '../../assets/images/image 2.png';
import {useHomeScreen} from "./hooks";
import aboutCabinetImg from '../../assets/images/about_cabinet.png';
import serviceHome from '../../assets/images/services_home.png';
import Modal from 'react-modal';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../routes";
import leftSchedule from '../../assets/images/homescreen/leftSchedule.png';
import rightSchedule from '../../assets/images/homescreen/rightSchedule.png';
import bottomSchedule from '../../assets/images/homescreen/bottomHomepage.png';
import TeamItem from "../../components/TeamItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InputComponent from "../../components/InputComponent";
import {getFormData} from "../../api/flask-formdata";
import axios from 'axios';

const HomeScreen = () => {

    const {
        classes,
        homeContent,
        services,
        teams
    } = useHomeScreen();

    const [age, setAge] = useState('');

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            height: 500,
            width: 900,
            marginRight: '-50%',
            marginTop: '20px',
            minWidth: 500,
            minHeight: 400,
            background: 'rgba(243,223,193,0.94)',
            opacity: 1,
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [questionStep, setQuestionStep] = useState(0);

    const questions = [
        {
            question: 'Ce varsta aveti?',
            variants: [],
            isAge: true
        },
        {
            question: "Aveti nevoie de ajutor pentru rezolvarea unor tulburari ale limbajului?",
            variants: [
                {
                    name: "Da",
                    value: 1
                },
                {
                    name: "Nu",
                    value: 0
                }
            ]
        },
        {
            question: "Apelati la servicii pentru rezolvarea unor probleme individuale sau pentru dificultati in relatia de cuplu?",
            variants: [
                {
                    name: "Cu scop personal",
                    value: 0
                },
                {
                    name: "Pentru relatia de cuplu",
                    value: 1
                }
            ]
        },
        {
            question: "Simtiti ca aveti nevoie de ajutor pentru a depasi o perioada mai grea/pentru a gestiona mai bine anumite sentimente?",
            variants: [
                {
                    name: "Da",
                    value: 1
                },
                {
                    name: "Nu",
                    value: 0
                }
            ]
        },
        {
            question: "Aveti nevoie de indrumare parentala sau ajutor in relatia cu copilul?",
            variants: [
                {
                    name: "Da",
                    value: 1
                },
                {
                    name: "Nu",
                    value: 0
                }
            ]
        },
        {
            question: "Cu ce gen va identificati?",
            variants: [
                {
                    name: "Feminin",
                    value: 0
                },
                {
                    name: "Masculin",
                    value: 1
                },
                {
                    name: "Altul",
                    value: 2
                }
            ]
        },
        {
            question: "Aveti in istoricul familie cazuri de boli psihice?",
            variants: [
                {
                    name: "Da",
                    value: 1
                },
                {
                    name: "Nu",
                    value: 0
                }
            ]
        },
        {
            question: "Ati mai apelat la servicii de specialitate?",
            variants: [
                {
                    name: "Da",
                    value: 2
                },
                {
                    name: "Nu",
                    value: 1
                }
            ]
        },
        {
            question: "In ce categorie de varsta va incadrati?",
            variants: [
                {
                    name: "18-30",
                    value: 1
                },
                {
                    name: "30-65",
                    value: 2
                },
                {
                    name: "66+",
                    value: 3
                }
            ]
        },
        {
            question: "Urmati in momentul de fata vreun tratament pentru tratarea unei boli psihice?",
            variants: [
                {
                    name: "Da",
                    value: 1
                },
                {
                    name: "Nu",
                    value: 0
                }
            ]
        },
         {
             isAnswer: true,
             variants: []
        }
    ];

    const [q10, setQ10] = useState("");

    const [selectedAnswers, setSelectedAnswers] = useState<any>([]);

    const [currentAnswer, setCurrentAnswer] = useState('');
    const navigate = useNavigate();

    const handleSelectAnswer = (step: any, answer: any) => {
        const newAnswer = {
            questionStep: step,
            answer: answer
        }

        setSelectedAnswers([...selectedAnswers, newAnswer]);

        setQuestionStep(prevState => prevState + 1);
    }


    const [response, setresponse] = useState({
        res: 2
    });


    useEffect(() => {
        let ans = "Psihoterapie individuala";

        selectedAnswers.map((item: any, idx: any) => {
            if(item.questionStep === 4 && item.answer) {
                ans = "Consiliere parentala";
                return ;
            } else if(item.questionStep === 1 && item.answer) {
                ans = "Logopedie";
                return ;
            } else if(item.questionStep === 2 && item.answer)  {
                ans = "Psihoterapie de cuplu";
                return;
            } else {
                ans = "Psihoterapie individuala";
                return;
            }
        });
        setCurrentAnswer(ans);
    }, [selectedAnswers]);




    useEffect(() => {
        let data: any = {};

        selectedAnswers.map((item: any, idx: any) => {
            if(item.questionStep === 0 || item.questionStep === 5 || item.questionStep === 6 || item.questionStep === 7 || item.questionStep === 8 ){
                data[item.questionStep] = item.answer;
            }
        });

        data["Age"] = data[0];
        delete data[0];
        data["Gender"] = data[5];
        delete data[5];
        data["family_history"] = data[6];
        delete data[6];
        data["seek_help"] = data[7];
        delete data[7];
        data["age_range"] = data[8];
        delete data[8];

        if(questionStep === 9){
            getFormData(JSON.stringify(data))
                .then((response: any) => {
                    const { data: dataResponse } = response;
                    setresponse((prevState) => ({
                        ...prevState,
                        res: dataResponse
                    }));

                    if(dataResponse === 1){
                        setQ10( "Ar fi de folos să apelați la servicii de specialitate sau să începeți o terapie. Pentru cele mai bune rezultate, vă sugerăm ca primul pas sa fie o programare pentru o:");
                    }
                    else{
                        setQ10( "Nu este necesară începerea unei terapii, dar pentru o discuție cu un specialist, puteți realiza o programare pentru o:");
                    }

                })

        }
        questions[10].question = q10;

    }, [selectedAnswers]);





    const redirectToProgram = () => {
        navigate(ROUTES.schedule);
    }


    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
              <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    height: '90%',
                    textAlign: 'center'
                }}
              >
                  <h2 style={{ color: questions[questionStep]?.isAnswer ? '#000' : '#fff', marginTop: 60, fontSize: '40px' }}>{ questions[questionStep]?.isAnswer ? q10 : questions[questionStep].question }</h2>
                  {
                      questions[questionStep]?.isAnswer ?
                          <div style={{ textAlign: "center", height: '100%', display: 'flex', flexDirection: 'column' }}>
                              <div>
                                  <h1 style={{ color: '#fff' }}>{currentAnswer}</h1>
                              </div>
                              <div
                                style={{
                                    marginTop: 'auto'
                                }}
                              >
                                  <Button
                                      variant="outlined"
                                      style={{
                                          backgroundColor: `#3C938F`,
                                          borderColor: 'transparent',
                                          color: '#fff',
                                          width: '248px',
                                          height: '74px',
                                          borderRadius: '23px',
                                          textTransform: 'capitalize',
                                          fontSize: 19
                                      }}
                                      onClick={redirectToProgram}
                                  >
                                      Programeaza-te aici
                                  </Button>
                              </div>
                          </div>
                          : (
                              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                  {
                                      questions[questionStep].isAge ? (
                                          <div>
                                              <InputComponent
                                                  placeholder="Introduceti varsta"
                                                  style={{
                                                      minWidth: 320,
                                                      backgroundColor: '#fff'
                                                  }}
                                                  value={age}
                                                  onChange={(event: any) => setAge(event.target.value)}
                                              />
                                              <Button
                                                  variant="outlined"
                                                  style={{
                                                      backgroundColor: `#fff`,
                                                      borderColor: 'transparent',
                                                      color: '#2F2E41',
                                                      borderRadius: 11,
                                                      paddingLeft: 23,
                                                      paddingRight: 23,
                                                      width: '50%',
                                                      marginBottom: 10,
                                                      paddingTop: 7,
                                                      marginTop: 10,
                                                      paddingBottom: 7,
                                                      textTransform: 'capitalize',
                                                      fontSize: 16
                                                  }}
                                                  onClick={() => handleSelectAnswer(questionStep, age)}
                                              >
                                                  Next
                                              </Button>
                                          </div>
                                      ) : (
                                          questions[questionStep].variants.map((variantItem, idx) => (
                                              <Button
                                                  variant="outlined"
                                                  style={{
                                                      backgroundColor: `#fff`,
                                                      borderColor: 'transparent',
                                                      color: '#2F2E41',
                                                      borderRadius: 11,
                                                      paddingLeft: 23,
                                                      paddingRight: 23,
                                                      width: '50%',
                                                      marginBottom: idx === questions[questionStep].variants.length - 1 ? 80 : 10,
                                                      paddingTop: 7,
                                                      paddingBottom: 7,
                                                      textTransform: 'capitalize',
                                                      fontSize: 16
                                                  }}
                                                  onClick={() => handleSelectAnswer(questionStep, variantItem?.value)}
                                              >
                                                  { variantItem?.name }
                                              </Button>
                                          ))
                                      )
                                  }
                              </div>
                          )
                  }
              </div>
            </Modal>
            <div
                className={classes.headerContent}
            >
                <h1 className={classes.headerTitle}>{homeContent.headerText}</h1>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 20
                        }}
                    >
                        <img
                            src={firstImage}
                            width={240}
                            alt=""
                        />
                        <img
                            src={thirdImage}
                            width={300}
                            alt=""
                            style={{
                                paddingTop: 20,
                                paddingRight: 40
                            }}
                        />
                    </Box>
                    <Box>
                        <img
                            src={secondImage}
                            width={300}
                            style={{
                                paddingLeft: 20
                            }}
                            alt=""
                        />
                    </Box>
                </Box>
            </div>
            <Box
                style={{
                    paddingLeft: 50,
                    paddingRight: 50
                }}
            >
                <Box
                    style={{
                        paddingBottom: 50, // on each section,
                        display: "flex",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        style={{
                            backgroundColor: '#368F8B',
                            paddingLeft: 50,
                            paddingTop: 40,
                            paddingRight: 50,
                            paddingBottom: 40,
                            color: '#fff',
                            width: 460,
                            height: 360,
                            borderRadius: 7
                        }}
                    >
                        <h1 style={{ fontWeight: 400 }}>Despre cabinet</h1>
                        <p style={{ maxWidth: 270 }}>
                            Cabinetul de PsihologicAnca Nicoli oferă servicii de psihologie pentru copii și adulți: evaluare psihologică, dezvoltare personală, logopedie, terapie de familie, de cuplu, consiliere, psihoterapia persoanelor aflate în dificultate. Ședințele de terapiile se pot desfășura atât la nivel individual, cât și la nivel familial, de cuplu sau de grup.
                        </p>
                    </Box>
                    <Box
                        style={{
                            marginLeft: -100
                        }}
                    >
                        <img
                            src={aboutCabinetImg}
                            width={540}
                            height={340}
                            alt=""
                        />
                    </Box>
                </Box>
                <div
                    style={{
                        paddingBottom: 50, // on each section,
                        display: "flex",
                        flexDirection: 'column',
                        paddingLeft: 150,
                        paddingRight: 150
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingRight: 100,
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Box>
                            <h1 style={{ fontWeight: 400 , fontSize: "3rem"}}>Servicii</h1>
                            <img src={serviceHome} alt=""/>
                        </Box>
                        <Box style={{ display: 'flex' }}>
                            {services.map((serviceItem: any, idx: any) => (
                                <div key={idx} style={{ paddingLeft: 20 }}>
                                    <h3
                                        style={{
                                            textAlign: serviceItem.direction === 'left' ? 'left' : 'right',
                                            paddingLeft: 25,
                                            paddingRight: 25,
                                        }}
                                    >
                                        {serviceItem.title}
                                    </h3>
                                    {serviceItem.services.map((serviceI: any, jdx: any) => (
                                        <p
                                            key={jdx}
                                            style={{
                                                backgroundColor: '#F3DFC1',
                                                borderRadius: 19,
                                                paddingLeft: 25,
                                                paddingRight: 25,
                                                width: '330px',
                                                paddingTop: 10,
                                                paddingBottom: 10,
                                                textAlign: serviceItem.direction === 'left' ? 'left' : 'right'
                                            }}
                                        >
                                            {serviceI}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </Box>
                    </Box>
                    <Box style={{ textAlign: 'center', paddingTop: 20 }}>
                        <Button
                            variant="outlined"
                            style={{
                                backgroundColor: `#368F8B`,
                                borderColor: '#368F8B',
                                borderWidth: 3,
                                color: 'white',
                                borderRadius: 20,
                                paddingLeft: 23,
                                paddingRight: 23,
                                marginBottom: 20,
                                marginTop: 20,
                                paddingTop: 7,
                                paddingBottom: 7,
                                textTransform: 'capitalize',
                                fontSize: 20
                            }}
                            onClick={() => navigate(ROUTES.services)}
                        >
                            Descoperă toate serviciile
                        </Button>
                    </Box>

                    <Box style={{ textAlign: 'center', paddingTop: 20 }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <h1>Specialiști</h1>
                            <Box
                                bgcolor="#F3DFC1"
                                height="47px"
                                borderRadius="18px"
                                width="438px"
                                marginTop="-40px"
                                zIndex={-1}
                            />
                        </Box>
                        <Box
                            marginTop={10}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-around",
                                    gap: '20px'
                                }}
                            >
                                {
                                    teams.map((teamItem: any, idx) => (
                                            <TeamItem
                                                key={idx}
                                                name={teamItem.name}
                                                image={teamItem.image}
                                                specialities={teamItem.specialities}
                                                borderColor='transparent'
                                            />
                                        )
                                    )
                                }
                            </div>

                            <Box marginTop={5}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        backgroundColor: `#368F8B`,
                                        borderColor: '#368F8B',
                                        color: 'white',
                                        borderRadius: 20,
                                        paddingLeft: 23,
                                        paddingRight: 23,
                                        marginBottom: 20,
                                        marginTop: 20,
                                        paddingTop: 7,
                                        paddingBottom: 7,
                                        textTransform: 'capitalize',
                                        fontSize: 20,
                                        borderWidth: 3
                                    }}
                                    onClick={() => navigate(ROUTES.team)}
                                >
                                    Către echipa de terapeuți
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop={"100px"}
                    >
                        <Box>
                            <img src={leftSchedule} alt=""/>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                style={{
                                    backgroundColor: `#DDBEA8`,
                                    borderColor: "transparent",
                                    color: '#2F2E41',
                                    borderRadius: "10px",
                                    width: '326px',
                                    height: '80px',
                                    textTransform: 'capitalize',
                                    fontSize: 20
                                }}
                                onClick={() => navigate(ROUTES.schedule)}
                            >
                                PROGRAMEAZĂ-TE AICI
                            </Button>
                        </Box>
                        <Box>
                            <img src={rightSchedule} alt=""/>
                        </Box>
                    </Box>
                    <Box
                        paddingTop={20}
                    >
                        <h2>Te ajutăm să ințelegi ce servicii ți-ar fi utile</h2>
                        <Box
                            bgcolor="rgba(54, 143, 139, 0.38)"
                            width="80%"
                            height="370px"
                            borderRadius="16px"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <div
                                style={{
                                    paddingLeft: 120
                                }}
                            >
                                <p>Pentru oricine are nevoie de ajutor în alegerea drumului spre vindecare în cadrul cabinetului, chestionarul de mai jos este o unealtă eficientă</p>
                                <Button
                                    variant="outlined"
                                    style={{
                                        marginTop: 30,
                                        backgroundColor: `rgb(255,255,255,0.2)`,
                                        borderColor: '#246A73',
                                        color: '#2F2E41',
                                        borderRadius: 11,
                                        paddingLeft: '49px',
                                        paddingRight: '49px',
                                        paddingTop: '11px',
                                        paddingBottom: '11px',
                                        marginBottom: 10,
                                        textTransform: 'capitalize',
                                        fontSize: 16
                                    }}
                                    onClick={() => setIsOpen(true)}
                                >
                                    Completează <br/> chestionarul
                                </Button>
                            </div>
                            <div
                                style={{
                                    marginTop: '-399px',
                                    marginRight: '-105px',
                                    zIndex: -1
                                }}
                            >
                                <img src={bottomSchedule} alt=""/>
                            </div>
                        </Box>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export {
    HomeScreen
};