let db = {
  users: [
    {
      userId: 'e02LCerWRuWDQqcSdWhTmNir7oA3',
      email: 'user@email.com',
      handle: 'user',
      createdat: '2020-07-01T13:45:04.934Z',
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/socialape-4a360.appspot.com/o/93306955083.jpeg?alt=media',
      bio: 'Hello, my name is user, nice to meet you',
      website: 'https://user.com',
      location: 'London, UK',
    },
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'this is a scream body',
      createdAt: '2020-06-30T08:53:50.545Z',
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'dwadawdawdwadaw',
      body: 'nice one mate!',
      createdAt: '2020-06-30T08:53:50.545Z',
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: 'DWANODWAJ3213213JNJKK',
    email: 'user@email.com',
    handle: 'user',
    createdat: '2020-07-01T13:45:04.934Z',
    imageUrl: 'image/ddawdawdawdaw/dawdawdaw',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'London, UK',
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'e02LCerWRuWDQqcSdWhTmNir7oA3',
    },
    {
      userHandle: 'user',
      screamId: 'dwa9dwa8d8wa989d8aw89d89aw8a',
    },
  ],
};
