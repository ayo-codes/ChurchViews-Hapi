export const seedData = {
  users: {
    _model: "User", // _model specifies the mongoose schema 
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  denominations: {
    _model: "Denomination",
    anglican: {
      title: "Anglican Churches",
      userid: "->users.bart"
    }
  },
  churches: {
    _model : "Church",
    church_1 : {
      name: "St Stephen's Church",
      description: "Anglican church on Mount Street in Dublin",
      latitude: 53.3344043,
      longitude:-6.2748843 ,
      denominationid: "->denominations.anglican"
    },
  }
};

