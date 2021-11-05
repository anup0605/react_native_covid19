import { closeIcon } from '@assets';
import { BrandedButton, Modal, Text, TextareaWithCharCount } from '@covid/components';
import { events, track } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

// TODO: Replace with non-padded version when Sol sends across
const thumbsDown = require('@covid/features/studies-hub/assets/thumbsdown.png');
const thumbsUp = require('@covid/features/studies-hub/assets/thumbsup.png');

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

enum EFeedback {
  Positive = 'positive',
  Negative = 'negative',
}

export const StudyHubFeedbackModal: React.FC<IProps> = (props) => {
  const [comments, setComments] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [selectedFeedback, setSelectedFeedback] = React.useState<EFeedback | null>(null);

  async function onPress() {
    if (!loading) {
      setLoading(true);
      // TODO: const result = await mentalHealthApiClient.feedback(selectedRating, comments);
      const result = true;
      if (result) {
        props.onRequestClose();
        track(events.STUDIES_HUB_FEEDBACK, { feedback: selectedFeedback });
      }
      setLoading(false);
    }
  }

  const footerChildren = React.useMemo(
    () => (
      <BrandedButton
        enabled={!loading && !!selectedFeedback}
        loading={loading}
        onPress={props.onRequestClose}
        style={styles.button}
        testID="button-send-feedback"
      >
        {i18n.t('studies-hub.feedback.button')}
      </BrandedButton>
    ),
    [props.onRequestClose, i18n.t('studies-hub.feedback.title')],
  );

  const headerChildren = React.useMemo(
    () => (
      <TouchableOpacity hitSlop={HIT_SLOP} onPress={onPress} style={styles.closeTouchable} testID="button-close-modal">
        <Image source={closeIcon} style={styles.closeCross} />
      </TouchableOpacity>
    ),
    [props.onRequestClose],
  );

  return (
    <Modal
      showsVerticalScrollIndicator
      footerChildren={footerChildren}
      headerChildren={headerChildren}
      modalName="StudyHubFeedback"
      onRequestClose={props.onRequestClose}
      testID="study-hub-feedback-modal"
      visible={props.visible}
    >
      <Text textAlign="center" textClass="h3Light">
        {i18n.t('studies-hub.feedback.title')}
      </Text>
      <View style={styles.feedbackIcons}>
        <TouchableOpacity onPress={() => setSelectedFeedback(EFeedback.Negative)}>
          <Image source={thumbsDown} style={styles.thumbsDown} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedFeedback(EFeedback.Positive)}>
          <Image source={thumbsUp} />
        </TouchableOpacity>
      </View>
      <TextareaWithCharCount
        onChangeText={setComments}
        placeholder={i18n.t('studies-hub.feedback.placeholder')}
        placeholderTextColor={colors.tertiary}
        style={styles.textArea}
        textAreaStyle={{ backgroundColor: colors.backgroundTertiary, borderRadius: sizes.m }}
        value={comments}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginBottom: sizes.m,
  },
  closeCross: {
    end: 12,
    height: 14,
    tintColor: colors.primary,
    top: 12,
    width: 14,
  },
  closeTouchable: {
    alignSelf: 'flex-end',
  },
  feedbackIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lowerOpacity: {
    opacity: 0.4,
  },
  textArea: {
    marginBottom: sizes.xs,
  },
  thumbsDown: {
    marginRight: sizes.l,
  },
});
