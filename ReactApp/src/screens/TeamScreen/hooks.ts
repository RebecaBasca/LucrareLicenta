import {TeamContentType} from "./types";
import {useEffect, useState} from "react";
import {getTherapists} from "../../api/therapist";

export const useTeamScreen = () => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTherapists()
            .then((response: any) => {
                const { data } = response;


                if(data?.content && Array.isArray(data?.content)) {
                    setTeams(data?.content.map((teamItem: any, idx: any) => ({
                        name: teamItem.name,
                        image: teamItem.picture,
                        specialities: teamItem.specialty.split(',')
                    })));
                }
            });
    }, []);

    const teamContent: TeamContentType = {
        title: 'Fă cunoștință cu echipa de specialiști'
    }

    return {
        teamContent,
        teams
    }
}
