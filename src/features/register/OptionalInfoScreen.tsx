import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { LoadingModal } from '@covid/components/Loading';
import { Screen } from '@covid/components/Screen';
import { ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { initialErrorState, TApiErrorState } from '@covid/core/api/ApiServiceErrors';
import { TPiiRequest } from '@covid/core/user/dto/UserAPIContracts';
import { userService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features';
import { appCoordinator } from '@covid/features/AppCoordinator';
import i18n from '@covid/locale/i18n';
import { offlineService, pushNotificationService } from '@covid/services';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<ScreenParamList, 'OptionalInfo'>;
};

type TState = {
  errorMessage: string;
} & TApiErrorState;

const initialState: TState = {
  ...initialErrorState,
  errorMessage: '',
};

interface IOptionalInfoData {
  name: string;
  phone: string;
}

export class OptionalInfoScreen extends React.Component<TProps, TState> {
  private phoneComponent: any;

  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  private async subscribeForPushNotifications() {
    if (Constants.appOwnership !== 'expo') {
      await pushNotificationService.subscribeForPushNotifications();
    }
  }

  private async savePiiData(formData: IOptionalInfoData) {
    const hasFormData = formData.phone?.trim() || formData.name?.trim();

    if (hasFormData) {
      const piiDoc = {
        ...(formData.name && { name: formData.name }),
        ...(formData.phone && { phone_number: formData.phone }),
      } as Partial<TPiiRequest>;
      await userService.updatePii(piiDoc);
    }
  }

  private async handleSaveOptionalInfos(formData: IOptionalInfoData) {
    try {
      await this.subscribeForPushNotifications();
      await this.savePiiData(formData);
      this.setState({ isApiError: false });
      appCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({
        error,
        isApiError: true,
        onRetry: () => {
          this.setState({
            error: null,
            status: i18n.t('errors.status-retrying'),
          });
          setTimeout(() => {
            this.setState({ status: i18n.t('errors.status-loading') });
            this.handleSaveOptionalInfos(formData);
          }, offlineService.getRetryDelay());
        },
      });
    }
  }

  // see http://regexlib.com/(X(1)A(TahywDmnNCw0iyuu7jNEB2AWTPaTyZQd-r8XZECVzmio5oP08fV7JoAWrNnIoyH3vysaiCJYtQO_FfuRAXJRSwB8zqAr_L9ddGD5V0eCJcVBJ65SiOnOt1tLVw4pd_Q3Q0FoUOPG5fXsbR6DHK6jqtBaIxnP0NL5oevVH6y0uSXhYgbCrrRx1DeE-59F0s5i0))/UserPatterns.aspx?authorid=d95177b0-6014-4e73-a959-73f1663ae814&AspxAutoDetectCookieSupport=1
  registerSchema = Yup.object().shape({
    name: Yup.string(),
    phone: Yup.string(),
  });

  render() {
    return (
      <>
        {this.state.isApiError && (
          <LoadingModal
            error={this.state.error}
            onPress={() => this.setState({ isApiError: false })}
            onRetry={this.state.onRetry}
            status={this.state.status}
          />
        )}
        <Screen testID="optional-info-screen">
          <Formik
            initialValues={{ name: '', phone: '' }}
            onSubmit={(values: IOptionalInfoData) => this.handleSaveOptionalInfos(values)}
            validationSchema={this.registerSchema}
          >
            {(props) => {
              return (
                <Form>
                  <HeaderText style={{ marginBottom: 24 }}>{i18n.t('optional-info.title')}</HeaderText>

                  <RegularText>{i18n.t('optional-info.description')}</RegularText>
                  <ValidatedTextInput
                    error={props.touched.name && props.errors.name}
                    onBlur={props.handleBlur('name')}
                    onChangeText={props.handleChange('name')}
                    onSubmitEditing={() => {
                      this.phoneComponent.focus();
                    }}
                    placeholder={i18n.t('optional-info.name-placeholder')}
                    returnKeyType="next"
                    testID="input-name"
                    value={props.values.name}
                    viewStyle={styling.marginVertical}
                  />

                  <ValidatedTextInput
                    error={props.touched.phone && props.errors.phone}
                    onBlur={props.handleBlur('phone')}
                    onChangeText={props.handleChange('phone')}
                    placeholder={i18n.t('optional-info.phone-placeholder')}
                    ref={(input) => (this.phoneComponent = input)}
                    testID="input-phone"
                    value={props.values.phone}
                    viewStyle={styling.marginBottom}
                  />
                  {props.errors.phone ? <ErrorText>{props.errors.phone}</ErrorText> : null}

                  <View style={styling.flex} />
                  {this.state.errorMessage ? <ErrorText>{this.state.errorMessage}</ErrorText> : null}

                  <BrandedButton onPress={props.handleSubmit} testID="button-submit">
                    {i18n.t('optional-info.button')}
                  </BrandedButton>
                </Form>
              );
            }}
          </Formik>
        </Screen>
      </>
    );
  }
}
