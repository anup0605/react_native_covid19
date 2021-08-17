import { TFeedbackId } from '@covid/core/state/reconsent';

type TItem = {
  id: TFeedbackId;
  label: string;
};

export const feedback: TItem[] = [
  {
    id: 'the_disease_or_disorder_i_care_about_isnt_listed',
    label: 'The disease or disorder I care about isn’t listed',
  },
  {
    id: 'im_only_interested_in_fighting_covid_19_right_now',
    label: 'I only want to log my symptoms in relation to COVID-19 right now',
  },
  {
    id: 'its_too_much_effort',
    label: 'It’s too much effort',
  },
  {
    id: 'commercial_purposes',
    label: 'I don’t want ZOE to build commercial health products using this research',
  },
  {
    id: 'i_dont_feel_informed_enough',
    label: 'I don’t feel informed enough',
  },
  {
    id: 'i_dont_think_i_can_make_a_real_impact',
    label: 'I don’t think I can make a real impact on these diseases',
  },
  {
    id: 'other',
    label: 'Other',
  },
];
