const redirectIfNotLoggedIn = (router: any) => {

    if(!localStorage.jwt || localStorage.jwt === ''){
        if(router.pathname !== "/login" || router.pathname !== "/signup"){
            router.replace('/login')
        }
    }

}

export default redirectIfNotLoggedIn;