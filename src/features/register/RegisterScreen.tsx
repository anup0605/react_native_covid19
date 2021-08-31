import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Screen } from '@covid/components/Screen';
import { ClickableText, ErrorText, HeaderLightText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import Analytics, { events } from '@covid/core/Analytics';
import { setUsername } from '@covid/core/state/user';
import { userService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

type TProps = {
  navigation: StackNavigationProp<ScreenParamList, 'Register'>;
  route: RouteProp<ScreenParamList, 'Register'>;
  setUsername: (username: string) => void;
};

type TState = {
  errorMessage: string;
  enableSubmit: boolean;
  accountExists: boolean;
};

const initialState: TState = {
  accountExists: false,
  enableSubmit: false,
  errorMessage: '',
};

interface IRegistrationData {
  email: string;
  password: string;
}

const initialRegistrationValues = {
  email: '',
  password: '',
};

class RegisterScreen extends React.Component<TProps, TState> {
  private passwordComponent: any;

  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  private handleCreateAccount(formData: IRegistrationData) {
    if (this.state.enableSubmit) {
      this.setState({ enableSubmit: false });
      userService
        .register(formData.email, formData.password)
        .then(async (response) => {
          const isTester = response.user.is_tester;
          Analytics.identify({ isTester });
          Analytics.track(events.SIGNUP);
          this.props.setUsername(response.user.username);
          const patientId = response.user.patients[0];
          await appCoordinator.setPatientById(patientId).then(() => appCoordinator.fetchInitialData());
          appCoordinator.gotoNextScreen(this.props.route.name);
        })
        .catch((err: AxiosError) => {
          // TODO - These error messages are misleading and we could display what the server sends back
          //
          // (In version 2 of the register endpoint we receive 403 FORBIDDEN if account has already
          // been registered.  In version 1 it was a 500, which is not an error we should ever return
          // deliberately!)
          if (err.response?.status === 403) {
            this.setState({
              accountExists: true,
              errorMessage: i18n.t('create-account.already-registered'),
            });
          } else if (err.response?.status === 400) {
            this.setState({
              accountExists: false,
              errorMessage: i18n.t('create-account.password-too-simple'),
            });
          } else {
            this.setState({
              accountExists: false,
              errorMessage: i18n.t('create-account.something-went-wrong', { msg: err.response?.status }),
            });
          }
        })
        .catch((err: Error) => {
          this.setState({ errorMessage: i18n.t('create-account.error', { msg: err.message }) });
        });
    }
  }

  gotoLogin = () => {
    this.props.navigation.replace('Login', { terms: '' });
  };

  registerSchema = Yup.object().shape({
    email: Yup.string().required(i18n.t('create-account.email-required')).email(i18n.t('create-account.email-error')),
    password: Yup.string()
      .required(i18n.t('create-account.password-required'))
      .min(8, i18n.t('create-account.password-too-simple')),
  });

  setIsEnabled(user: string, pass: string) {
    const enableSubmit = user.length > 0 && pass.length > 7;
    this.setState({ enableSubmit });
  }

  render() {
    return (
      <Screen backgroundColor={colors.backgroundPrimary} testID="register-screen">
        <Formik
          initialValues={initialRegistrationValues}
          onSubmit={(values: IRegistrationData) => this.handleCreateAccount(values)}
          validationSchema={this.registerSchema}
        >
          {(props) => {
            return (
              <Form>
                <HeaderLightText>{i18n.t('create-account.title')}</HeaderLightText>

                <RegularText style={styling.marginVerticalBig}>
                  {i18n.t('create-account.if-you-have-an-account')}{' '}
                  <ClickableText onPress={() => this.props.navigation.navigate('Login')}>
                    {i18n.t('log-in')}
                  </ClickableText>
                </RegularText>

                <ValidatedTextInput
                  autoCapitalize="none"
                  autoCompleteType="email"
                  error={(props.touched.email && !!props.errors.email) || this.state.accountExists}
                  keyboardType="email-address"
                  onBlur={props.handleBlur('email')}
                  onChangeText={(text) => {
                    props.handleChange('email')(text);
                    this.setIsEnabled(text, props.values.password);
                  }}
                  onSubmitEditing={() => {
                    this.passwordComponent.focus();
                  }}
                  placeholder={i18n.t('create-account.email')}
                  returnKeyType="next"
                  testID="input-email-address"
                  value={props.values.email}
                />

                {!!props.touched.email && !!props.errors.email ? <ErrorText>{props.errors.email}</ErrorText> : null}

                {this.state.accountExists ? <ErrorText>{i18n.t('create-account.already-registered')}</ErrorText> : null}

                <View style={styling.marginTop} />

                <ValidatedTextInput
                  secureTextEntry
                  autoCapitalize="none"
                  error={props.touched.password && props.errors.password}
                  onBlur={props.handleBlur('password')}
                  onChangeText={(text) => {
                    props.handleChange('password')(text);
                    this.setIsEnabled(props.values.email, text);
                  }}
                  onSubmitEditing={() => props.handleSubmit()}
                  placeholder={i18n.t('create-account.password')}
                  ref={(input) => (this.passwordComponent = input)}
                  returnKeyType="go"
                  testID="input-password"
                  value={props.values.password}
                />

                {!!props.touched.password && !!props.errors.password ? (
                  <ErrorText>{props.errors.password}</ErrorText>
                ) : null}

                {this.state.accountExists ? (
                  <RegularText style={styling.marginVerticalHuge}>
                    <ClickableText onPress={this.gotoLogin}>{i18n.t('log-in')}</ClickableText>{' '}
                    {i18n.t('create-account.existing-account')}
                  </RegularText>
                ) : null}

                <View style={styling.flex} />

                {!!this.state.errorMessage && !this.state.accountExists ? (
                  <ErrorText>{this.state.errorMessage}</ErrorText>
                ) : null}

                <BrandedButton
                  enabled={this.state.enableSubmit}
                  loading={props.isSubmitting}
                  onPress={props.handleSubmit}
                  testID="button-submit"
                >
                  {i18n.t('create-account.btn')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const mapDispatchToProps = {
  setUsername,
};

export default connect(null, mapDispatchToProps)(RegisterScreen);
