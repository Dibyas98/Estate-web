export default function(){
     const acco= JSON.parse(localStorage.getItem('persist:root')).user
     return JSON.parse(acco).currentUser.token
     
}