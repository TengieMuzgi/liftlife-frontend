import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Loading } from '../../components/Loading/Loading';
import axios from 'axios';
import { CoachProps } from '../../constants/coach';
import { storage } from '../../constants/firebase';
import { getDownloadURL, ref } from '@firebase/storage';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { TrainerPreview } from '../../components/TrainerPreview';
import { getCookie } from 'typescript-cookie';
import { AppContext } from '../../App';

export const MyCoach = () => {
  const { showSnackbar } = useContext(AppContext);

  const { isLoading, isFetched, isError, data, error } = useQuery(['my-coach'], async () => {
    const { data } = await axios.get<CoachProps>('http://localhost:8081/api/user/client/getCoach', {
      headers: { Authorization: `Bearer ${getCookie('userToken')}` },
    });
    const userCoach: CoachProps = data;
    if (userCoach.hasPhoto) {
      try {
        const storageRef = ref(storage, `${userCoach.id}`);
        const avatarURL = await getDownloadURL(storageRef);
        return { ...userCoach, avatar: avatarURL };
      } catch (error) {
        if (error instanceof Error) showSnackbar(error.message, 'error');
      }
    } else {
      return { ...userCoach, avatar: '' };
    }
  });

  if (isError && error instanceof Error) {
    return <ErrorPage message={error.message} />;
  }

  if (isLoading) {
    return <Loading message="Loading coach" />;
  }

  return <>{isFetched && data && <TrainerPreview {...data} />}</>;
};
