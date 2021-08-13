import { Loading, LoadingModal } from '@covid/components/Loading';
import { TApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { TProfile } from '@covid/core/profile/ProfileService';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { NewProfileCard } from './NewProfileCard';

interface IProps extends TApiErrorState {
  profiles: TProfile[];
  isLoaded: boolean;
  addProfile?: VoidFunction;
  onProfileSelected: (profile: TProfile, index: number) => void;
  renderItem: (profile: TProfile, index: number) => React.ReactNode;
}

export function ProfileList({
  isApiError,
  status,
  error,
  isLoaded,
  profiles,
  addProfile,
  onProfileSelected,
  onRetry,
  renderItem,
}: IProps) {
  if (!isLoaded) {
    return <Loading error={error} onRetry={onRetry} status={status} />;
  }

  return (
    <>
      {isApiError && <LoadingModal error={error} onRetry={onRetry} status={status} />}
      <View style={styles.profileList}>
        {profiles.map((profile, i) => {
          return (
            <View key={profile.id} style={i % 2 === 0 ? styles.wrapperEven : styles.wrapperOdd}>
              <TouchableOpacity onPress={() => onProfileSelected(profile, i)}>
                {renderItem(profile, i)}
              </TouchableOpacity>
            </View>
          );
        })}

        {addProfile ? (
          <View style={profiles.length % 2 === 0 ? styles.wrapperEven : styles.wrapperOdd}>
            <TouchableOpacity onPress={addProfile}>
              <NewProfileCard />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapperEven: {
    paddingRight: 8,
    paddingTop: 16,
    width: '50%',
  },
  wrapperOdd: {
    paddingLeft: 8,
    paddingTop: 16,
    width: '50%',
  },
});
