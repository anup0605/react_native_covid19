export type PingdemicRequest = {
  patient: string; //	Patient id
  id?: string; // PingdemicRequest entry id
  asked_to_isolate?: string;
  app_installed?: string;
  app_bluetooth?: string;
  isolate_date_specific?: string;
  isolate_date_between_start?: string;
  isolate_date_between_end?: string;
};
