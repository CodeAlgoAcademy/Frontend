import { IParentChild } from 'types/interfaces';
import { getAccessToken } from 'utils/getTokens';
import http from '../axios.config';

const addChild = async (data: IParentChild) => {
    const response = await http.post('/parent/child', data, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });

    return response.data;
}

const parentService = {
    addChild
};

export default parentService;