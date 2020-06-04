import Vue from 'vue'
import Vuex from 'vuex'
import  Api  from './api'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prods: [],
    Tecnoloy:[],
    House:[],
    Book:[],
   
    userData:{
      username:null,
      email:null,
      password:null,
      confirmPassword:null,
      role:null,
     
    
    },
    isLoggedIn:false

  },
  mutations: {
SETP_RODUCTS_DATA<T>(state:T,payload:{type:string;data:any}){
const type = payload.type;
const data = payload.data;
state[type as keyof T] = data;

},
    
SIGNUP(state,payload){
state.userData = payload;
state.isLoggedIn = true;
},

LOGIN(state,payload){
state.userData = payload;
state.isLoggedIn = true;
},

LOGOUT(state){
state.isLoggedIn = false;
},

DELETE_ACCOUNT(state){
state.isLoggedIn = false;
},
CREATE_NEW_PRODUCTS(state,payload){
state.prods = payload;
},
CHANGE_ACCOUNT_DETAILS(state,payload){
  state.isLoggedIn = true;
  state.userData = payload;

}
  

    },
  
  actions: {
    async signup({ commit },payload){
      const result = await Api.fetchData(`users/signup`,true,'PUT',payload);
      if(!result.ok){
        return
      }
      const data = result.data;
      commit('SIGNUP',data)

    },
    async Login({commit},payload){
      const result = await Api.fetchData(`user/login`,true,'POST',payload)
      if(!result.ok){
        return
      }
      const data = result.data;
      commit('LOGIN',data)

    },
    async logOut({commit}){
      const result = await Api.fetchData(`user/logout`,true,'POST')
      if(!result.ok){
        return;
      }
      commit('LOGOUT')

    },
    
    async Delete({commit}){
      const result = await Api.fetchData(`user/logout`,true,'POST')
if(!result.ok){
  return
}
commit('DELETE_ACCOUNT')
    },
    async DeleteProducts({dispatch},payload){
      const id = payload;
      const result = await Api.fetchData(`products/${id}`,true,'DELETE');
      if(!result.ok){
        return;
      }
      dispatch('load');

    },
    async upadteProduct({dispatch},payload){
      const currentRoute = router.currentRoute;
      const id = currentRoute.params.id;
      const result = await Api.fetchData(`products/${id}`,true,'PATCH');
      if(!result.ok){
        return;
      }
      const data = result.data;
      dispatch('load')
      return data;

    },
    async changeAccountDetails({ commit }, payload) {
      const result = await Api.fetchData(`users/account`, true, 'PATCH', payload);
      if (!result.ok) {
          return;
      }
      const data = result.data;
      commit('CHANGE_ACCOUNT_DETAILS', data);
      return data;
  },
    async CreteNewProducts({commit},{userInputsData}){
const result = await Api.fetchData(`products`,true,'POST',userInputsData)
if(!result.ok){
  return;
}
const data = result.data;
commit('CREATE_NEW_PRODUCTS',data)

    },
    async load({commit,dispatch}){
      const result = await Api.fetchData('products')
      if(!result.ok){
        return;
      }
      const allData = result.data;
      const Tecnology = allData.filter((el:any) => el.category === 'Tecnology');
      const House = allData.filter((el:any) => el.category === 'House')
      const Book = allData.filter((el:any) => el.category === 'Book')

commit('SETP_RODUCTS_DATA',{data:Tecnology,type:'Tecnology'});
commit('SETP_RODUCTS_DATA',{data:House,type:'House'});
commit('SETP_RODUCTS_DATA',{data:Book,type:'Book'});
dispatch('restoreSession')
    },
    async SearchProducts({commit},{searchQuery,categoryLowerCase,categoryCamelCase}){
      const result = await Api.fetchData(
        `products?category=${categoryLowerCase}&${categoryCamelCase}&${searchQuery  ?  `search=${searchQuery}` : ''}`
      )
      if(!result.ok){
        return;
      }
      const data = result.data;
      commit('SETP_RODUCTS_DATA',{data,type:categoryCamelCase})

    },
   
},
})
