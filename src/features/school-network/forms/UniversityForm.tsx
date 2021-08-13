import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { ISchoolModel, ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

interface IProps {
  currentJoinedGroup: ISubscribedSchoolGroupStats | undefined;
  schools: ISchoolModel[];
}

export default function UniversityForm({ currentJoinedGroup, schools }: IProps) {
  const initialValues = {
    schoolId: currentJoinedGroup ? currentJoinedGroup.school.id : '',
  };

  const validationSchema = Yup.object().shape({
    schoolId: Yup.string().required(i18n.t('validation-error-text-required')),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ schoolId }, FormikProps) => {
        try {
          const selectedSchool = schools.find((school) => school.id === schoolId)!;
          await schoolNetworkCoordinator.setSelectedSchool(selectedSchool);
          NavigatorService.goBack();
        } catch (error) {
          FormikProps.setFieldError('schoolId', 'Update error');
        }
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <RadioInput
            error={formikProps.touched.schoolId ? formikProps.errors.schoolId : ''}
            items={schools.map((item) => ({ label: item.name, value: item.id }))}
            label={i18n.t('school-networks.join-school.dropdown.label-higher-education')}
            onValueChange={formikProps.handleChange('schoolId')}
            selectedValue={formikProps.values.schoolId}
          />
          <View style={styling.flex} />
          <BrandedButton onPress={formikProps.handleSubmit}>{i18n.t('school-networks.join-school.cta')}</BrandedButton>
        </Form>
      )}
    </Formik>
  );
}
