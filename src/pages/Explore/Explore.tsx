import React, { useContext } from 'react';
import { Carousel } from '../../components/Carousel';
import { AppContext } from '../../App';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { storage } from '../../constants/firebase';
import { getDownloadURL, ref } from '@firebase/storage';
import { CoachProps } from '../../constants/coach';
import { TrainerPreviewProps } from '../../components/TrainerPreview';
import { Loading } from '../../components/Loading/Loading';

export const Explore = () => {
  const { isMobile, showSnackbar } = useContext(AppContext);

  /**
   * Query to get data about coaches
   * Also downloads coach avatar from firebase storage
   */
  const { isLoading, isFetched, isError, data, error } = useQuery(['coaches'], async () => {
    const { data } = await axios.get<CoachProps[]>('http://localhost:8081/api/user/coaches');
    //Resolve coach avatar and update data with avatar link
    const coachesWithAvatars = await Promise.all(
      data.map(async coach => {
        if (coach.hasPhoto) {
          const storageRef = ref(storage, `${coach.id}`);
          try {
            const avatarURL = await getDownloadURL(storageRef);
            return { ...coach, avatar: avatarURL };
          } catch (error) {
            if (error instanceof Error) {
              return { ...coach, avatar: '' };
            } else {
              showSnackbar('Something unexpected happened!', 'error');
            }
          }
        } else {
          return { ...coach, avatar: '' };
        }
      })
    );
    return coachesWithAvatars;
  });

  if (isLoading) {
    return <Loading message="Loading coaches" />;
  }

  if (isError && error instanceof Error) {
    showSnackbar(error.message, 'error');
  }

  return (
    <>
      {isFetched && data && (
        <Carousel trainers={data as TrainerPreviewProps[]} slidesPerView={isMobile ? 1 : 3} />
      )}
    </>
  );
};
