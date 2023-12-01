export type TDate = {
  createdAt: string;
  updatedAt: string;
};

export type TLogin = {
  id: string;
  userBackground: string;
  token: string;
};

export enum Status {
  isOpen = 'isopen',
  inProgress = 'inprogress',
  isClosed = 'isclosed',
}

export type TUser = TDate & {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userBackground: string;
  tasks: TTask[];
};

export type TProject = TDate & {
  _id: string;
  authorOfСreation: TUser;
  title: string;
  description: string;
  tasks: TTask[];
  file: TFile;
};

export type TFile = TDate & {
  _id: string;
  file_path: string;
  file_originalName: string;
  file_contentType: string;
};

export type TTask = TDate & {
  _id: string;
  perfomingBy: TUser;
  projectId: TProject;
  title: string;
  description: string;
  status: Status;
  file: TFile;
};

export type TMessage = {
  message: string;
};

export type TToken = {
  token: string;
};
