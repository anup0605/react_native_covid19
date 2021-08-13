import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/GenericTextField';
import { Screen } from '@covid/components/Screen';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

const initialFormValues = {
  name: '',
};

interface IFormData {
  name: string;
}

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CreateProfile'>;
  route: RouteProp<ScreenParamList, 'CreateProfile'>;
};

export default class CreateProfileScreen extends React.Component<TProps> {
  registerSchema = Yup.object().shape({
    name: Yup.string().required().max(32, i18n.t('profile-name-too-long')),
  });

  handleClick = (formData: IFormData) => {
    this.props.navigation.navigate('AdultOrChild', {
      avatarName: this.props.route.params?.avatarName,
      profileName: formData.name,
    });
  };

  render() {
    return (
      <Screen testID="create-profile-screen">
        <HeaderText style={styling.marginBottom}>{i18n.t('create-profile-title')}</HeaderText>

        <SecondaryText style={styling.marginBottomHuge}>{i18n.t('create-profile-text')}</SecondaryText>

        <Formik
          validateOnBlur
          validateOnChange
          validateOnMount
          initialValues={initialFormValues}
          onSubmit={(values: IFormData) => {
            return this.handleClick(values);
          }}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            return (
              <Form>
                <GenericTextField
                  required
                  formikProps={props}
                  label={i18n.t('create-profile-label')}
                  name="name"
                  placeholder={i18n.t('create-profile-placeholder')}
                  style={styling.marginBottomHuge}
                  testID="input-profile-name"
                />
                <BrandedButton
                  enabled={props.isValid}
                  onPress={props.handleSubmit}
                  style={styling.marginTopAuto}
                  testID="button-submit"
                >
                  {i18n.t('create-profile-button')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
