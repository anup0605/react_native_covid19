import { Icon, Text } from '@covid/components';
import { TTimelineEvent } from '@covid/features/anniversary/types';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { AccessibilityRole, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
  timelineEvent: TTimelineEvent;
}

export default function FindingCard({ timelineEvent }: IProps) {
  const { navigate } = useNavigation();
  type TLink = {
    linkText: string;
    onPress: () => void;
    role: AccessibilityRole;
  };

  const getLink = (): TLink => {
    let link: TLink = {
      linkText: '',
      onPress: () => null,
      role: 'none',
    };

    if (timelineEvent.external_link_text && timelineEvent.external_link) {
      link = {
        linkText: timelineEvent.external_link_text,
        onPress: () => openWebLink(timelineEvent.external_link!),
        role: 'button',
      };
      return link;
    }

    if (timelineEvent.route_name && timelineEvent.route_text) {
      if (timelineEvent.route_name === 'DietStudy') {
        link = {
          linkText: timelineEvent.route_text,
          onPress: () => appCoordinator.goToDietStudy(),
          role: 'button',
        };
        return link;
      }
      link = {
        linkText: timelineEvent.route_text,
        onPress: () => navigate(timelineEvent.route_name!),
        role: 'button',
      };
      return link;
    }
    return link;
  };

  const link = getLink();

  return (
    <TouchableWithoutFeedback accessible accessibilityRole={link.role} onPress={link.onPress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon iconName="Lightbulb" iconSize={18} />
          <Text style={{ marginHorizontal: sizes.s }} textClass="pLight">
            {timelineEvent.title}
          </Text>
        </View>
        <Text style={styles.body} textClass="h5Medium">
          {timelineEvent.sub_title}
        </Text>
        {link.role !== 'none' ? (
          <View style={{ marginBottom: sizes.xs }}>
            <Text style={{ color: 'purple' }}>{link.linkText}</Text>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  body: {
    marginBottom: sizes.l,
    marginTop: sizes.s,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: sizes.m,
    marginBottom: sizes.xxl,
    padding: sizes.m,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
