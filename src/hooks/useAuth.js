export const useAuth = () => {
  //get item from localstorage

  const _user = localStorage.getItem("_user");
  let user = null;
  if (_user) {
    user = JSON.parse(_user);
  }

  if (user && user.access_token != "") {
    return {
      auth: true,
    };
  } else {
    return {
      auth: false,
    };
  }
};

// export const useAuth = () => {
//   //get item from localstorage

//   const location = useLocation();

//   const [auth, setAuth] = useState(false);
//   useEffect(() => {
//     const _user = localStorage.getItem("_user");
//     let user = null;
//     if (_user) {
//       user = JSON.parse(_user);
//     }

//     if (user && user.access_token != "") {
//       const decodedJwt = user.access_token;
//       decodedJwt.exp * 1000 < Date.now() ? setAuth(false) : setAuth(true);
//     } else {
//       setAuth(false);
//     }
//   }, [location]);

//   return {
//     auth: auth,
//   };
// };
