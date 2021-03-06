import { Coordinator, IUpdatePatient, TScreenFlow } from '@covid/core/Coordinator';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';
import { TPatientData } from '@covid/core/patient/PatientData';
import { patientService } from '@covid/core/patient/PatientService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IUserService } from '@covid/core/user/UserService';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';

class PatientCoordinator extends Coordinator implements IUpdatePatient {
  appCoordinator: AppCoordinator;

  navigation: NavigationType;

  userService: IUserService;

  patientData: TPatientData;

  screenFlow: Partial<TScreenFlow> = {
    AboutYou: () => {
      if (this.patientData.patientState.isMinor && this.patientData.patientState.isReportedByAnother) {
        NavigatorService.navigate('YourHealth', { patientData: this.patientData });
      } else {
        NavigatorService.navigate('YourWork', { patientData: this.patientData });
      }
    },
    PreviousExposure: () => {
      this.appCoordinator.startAssessmentFlow(this.patientData);
    },
    YourHealth: () => {
      NavigatorService.navigate('PreviousExposure', { patientData: this.patientData });
    },
    YourStudy: () => {
      NavigatorService.navigate('AboutYou', { editing: false, patientData: this.patientData });
    },
    YourWork: () => {
      NavigatorService.navigate('YourHealth', { patientData: this.patientData });
    },
  };

  init = (appCoordinator: AppCoordinator, patientData: TPatientData, userService: IUserService) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
    this.userService = userService;
  };

  startPatient = () => {
    const currentPatient = this.patientData?.patientState;
    const shouldAskStudy = isUSCountry() && currentPatient.shouldAskStudy;

    if (shouldAskStudy) {
      NavigatorService.navigate('YourStudy', { editing: false, patientData: this.patientData });
    } else {
      NavigatorService.navigate('AboutYou', { editing: false, patientData: this.patientData });
    }
  };

  updatePatientInfo = (patientInfo: Partial<TPatientInfosRequest>) => {
    return patientService.updatePatientInfo(this.patientData.patientId, patientInfo).then((info) => {
      this.patientData.patientInfo = info;
      return info;
    });
  };
}

export const patientCoordinator = new PatientCoordinator();
