import { blobs, closeIcon } from '@assets';
import { BrandedButton } from '@covid/components/buttons';
import { HeaderText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { TAssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import { patientService } from '@covid/core/patient/PatientService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type TProps = {
  assessmentData: TAssessmentData;
};

export const USStudyInvite: React.FC<TProps> = (props: TProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const currentPatient = props.assessmentData?.patientData?.patientState;

  React.useEffect(() => {
    if (isUSCountry() && currentPatient?.isReportedByAnother && currentPatient?.shouldShowUSStudyInvite) {
      setModalVisible(true);
    }
  }, [props.assessmentData]);

  const handleAgree = () => {
    setModalVisible(false);
    Analytics.track(events.ACCEPT_STUDY_CONTACT);
    patientService.setUSStudyInviteResponse(props.assessmentData?.patientData?.patientId, true);
    currentPatient.shouldShowUSStudyInvite = false;
  };

  const handleClose = () => {
    setModalVisible(false);
    Analytics.track(events.DECLINE_STUDY_CONTACT);
    patientService.setUSStudyInviteResponse(props.assessmentData?.patientData?.patientId, false);
    currentPatient.shouldShowUSStudyInvite = false;
  };

  return modalVisible ? (
    <Modal transparent animationType="fade">
      <View style={styles.outsideView}>
        <View style={styles.modalView}>
          <ImageBackground imageStyle={[styles.backgroundImage, { borderRadius: sizes.m }]} source={blobs} style={{}}>
            <View style={styles.contentContainer}>
              <TouchableOpacity onPress={handleClose} style={{ alignSelf: 'flex-end' }}>
                <Image source={closeIcon} style={{ height: 24, width: 24 }} />
              </TouchableOpacity>
              <ScrollView>
                <HeaderText style={styles.title}>{i18n.t('us-study-invite.title')}</HeaderText>
                <RegularText style={styles.body}>{i18n.t('us-study-invite.body')}</RegularText>
              </ScrollView>

              <BrandedButton onPress={handleAgree} style={styles.modalButton}>
                {i18n.t('us-study-invite.button')}
              </BrandedButton>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  ) : null;
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '30%',
    resizeMode: 'stretch',
  },
  body: {
    fontSize: 14,
    marginHorizontal: sizes.xl,
    paddingBottom: sizes.xl,
    paddingTop: sizes.s,
    textAlign: 'center',
  },
  contentContainer: {
    padding: sizes.l,
  },
  modalButton: {
    alignSelf: 'center',
    backgroundColor: colors.purple,
    height: 40,
    marginBottom: sizes.m,
    width: '60%',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.m,
    margin: sizes.l,
    maxHeight: '60%',
  },
  outsideView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    paddingHorizontal: sizes.xl,
    paddingVertical: 0,
    textAlign: 'center',
  },
});
