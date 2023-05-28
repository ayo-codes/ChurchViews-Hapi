export const seedData = {
  users: {
    _model: "User", // _model specifies the mongoose schema 
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$GK.qeeaw3gz1x0QXnUmo9ein3wTac5HyA/dIRy2A.x7NDjocpcYRe"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$.2Ftjbl6V4dI.zHKkFnhH.I0Bsr7YKg95U5RK8nbtk6Kh6Reo6cmC"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$Zy.U9xFYjVmpHGrm3BStZOR1UV9/JVGeRuQOQ3.RNmnA1FmKi/3iK"
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
      province: "Leinster",
      denominationid: "->denominations.anglican"
    },
  }
};

