import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiResponse, apiService } from '../request/apiservice';
import { currentUser } from '@clerk/nextjs';

interface UserContextType {
    userData: IUserModel;
    setUserData: (userData: IUserModel) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

let initialUserData: IUserModel = {
    name: '',
    title: '',
    email: '',
    intro: '',
    company: {
        name: '',
        description: '',
    },
    socialMedia: [],
    image_url: ''
};


export const UserContext = createContext<UserContextType>({
    userData: initialUserData,
    setUserData: () => { },
    loading: false,
    setLoading: () => { },
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<any> = ({ children }) => {
    const [userData, setUserData] = useState<IUserModel>(initialUserData);
    const [loading, setLoading] = useState<boolean>(false);


    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await apiService.get<IUserModel>('/user/fetch');
            setUserData(response as any);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};


interface ISocialMedia {
    platform: string;
    url: string;
}

export interface IUserModel {
    name: string;
    title: string;
    email: string;
    intro: string;
    company: {
        name: string;
        description: string;
    };
    socialMedia: ISocialMedia[]
    image_url: string | null;
}
