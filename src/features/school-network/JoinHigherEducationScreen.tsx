import Screen from '@covid/components/Screen';
import { ISchoolModel } from '@covid/core/schools/Schools.dto';
import { selectPatientsJoinedGroups } from '@covid/core/schools/Schools.slice';
import { schoolService } from '@covid/core/schools/SchoolService';
import { TRootState } from '@covid/core/state/root';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { UniversityForm } from './forms';
import { JoinHeader, SelectedSchool } from './partials';

interface IProps {
  route: RouteProp<TScreenParamList, 'ConfirmSchool'>;
}

export default function JoinHigherEducationScreen({ route }: IProps) {
  const [schools, setSchools] = React.useState<ISchoolModel[]>([]);
  const currentJoinedGroup = useSelector((state: TRootState) =>
    selectPatientsJoinedGroups(state, route.params?.patientData?.patientId, true),
  );

  React.useEffect(() => {
    (async () => {
      const schools = await schoolService.getSchools();
      setSchools(schools.filter((s) => s.higher_education === true));
    })();
  }, []);

  return (
    <Screen profile={route.params?.patientData?.patientState?.profile} testID="join-higher-education-screen">
      {currentJoinedGroup ? (
        <SelectedSchool
          currentJoinedGroup={currentJoinedGroup}
          currentPatient={route.params?.patientData?.patientState}
          removeText="school-networks.join-school.removeHigherEducation"
          title="school-networks.join-school.university-network-header"
        />
      ) : (
        <>
          <JoinHeader
            bodyText="school-networks.join-school.description-higher-education"
            currentStep={1}
            headerText="school-networks.join-school.title-higher-education"
            maxSteps={1}
          />
          <UniversityForm currentJoinedGroup={currentJoinedGroup} schools={schools} />
        </>
      )}
    </Screen>
  );
}
