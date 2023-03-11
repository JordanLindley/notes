export type Note = {
  id: string;
  body: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  email: string;
};

export function getAllNotes(): Note[] {
  return [
    {
      id: 'note1',
      body: 'my note',
      owner: {
        id: 'user1',
        email: 'jordan@gabagoo.com',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'note2',
      body: 'my note 2',
      owner: {
        id: 'user1',
        email: 'jordan@gabagoo.com',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}
