import { BrandedButton, TextareaWithCharCount } from '@covid/components';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import Screen, { FieldWrapper } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form, Item, Label } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

const initialFormValues = {
  description: '',
};

interface ITreatmentData {
  description: string;
}

type TreatmentOtherProps = {
  navigation: StackNavigationProp<ScreenParamList, 'TreatmentOther'>;
  route: RouteProp<ScreenParamList, 'TreatmentOther'>;
};

export default class TreatmentOtherScreen extends React.Component<TreatmentOtherProps> {
  registerSchema = Yup.object().shape({
    description: Yup.string(),
  });

  handleUpdateTreatment = async (formData: ITreatmentData) => {
    let assessment: Partial<AssessmentInfosRequest> = {};

    if (formData.description) {
      assessment = {
        treatment: formData.description,
      };
    }

    await assessmentService.completeAssessment(
      assessment,
      assessmentCoordinator.assessmentData?.patientData?.patientInfo!,
    );
    assessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    const title =
      this.props.route.params?.location === 'back_from_hospital'
        ? i18n.t('treatment-other-title-after')
        : i18n.t('treatment-other-title-during');
    const question =
      this.props.route.params?.location === 'back_from_hospital'
        ? i18n.t('treatment-other-question-treatment-after')
        : i18n.t('treatment-other-question-treatment-during');

    return (
      <Screen
        navigation={this.props.navigation}
        profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
        testID="treatment-other-screen"
      >
        <ProgressHeader maxSteps={5} step={5} title={title} />

        <Formik
          initialValues={initialFormValues}
          onSubmit={(values: ITreatmentData) => {
            return this.handleUpdateTreatment(values);
          }}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            return (
              <Form>
                <FieldWrapper style={{ marginVertical: 64 }}>
                  <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                    <Label style={{ marginBottom: 16 }}>{question}</Label>
                    <TextareaWithCharCount
                      bordered
                      onChangeText={props.handleChange('description')}
                      placeholder={i18n.t('placeholder-optional-question')}
                      textAreaStyle={styles.textarea}
                      value={props.values.description}
                    />
                  </Item>
                </FieldWrapper>

                <BrandedButton onPress={props.handleSubmit}>{i18n.t('completed')}</BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  textarea: {
    width: '100%',
  },
});
