<template>
<div>


    <div>
<NavBar/>
    </div>
    <div>

    
<div class="image-container">
    <v-img  class="image" max-width="10000"></v-img>
</div>
<div>
    <span class="span-1 orange--text">Tecnology</span>
</div>
  
   </div>

   <div class="cerca">
       <v-form>
           <v-container>
               <v-row>

              

           
       <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="search"
              prepend-inner-icon="fa fa-search"
            ></v-text-field>
            </v-col>
             </v-row>
             </v-container>
            </v-form>
            <div class="chip">

           

            <v-chip
        class="ma-2 cip"
        color="indigo"
        outlined
      >
        <v-icon class="fa fa-gamepad" left></v-icon>
       Videogames
      </v-chip>
          <v-chip
        class="ma-2 cip"
        color="primary"
        outlined
      >
        <v-icon class="fa fa-laptop" left></v-icon>
      Computers
      </v-chip>
          <v-chip
        class="ma-2 cip"
        color="success"
        outlined
      >
        <v-icon class="fa fa-mobile" left></v-icon>
       Phones
      </v-chip>
       </div>
           
   </div>

 <div>
     <v-container class="pinoto">
            <v-row >
                <v-col  v-for="product in products" :key="product.id"  :products="products">
                    <v-card class="pa-5 mx-auto" max-width="400" tile>
                        <div class="padre">
                            <v-row>
                                <v-card-text class="beta">
                                    <v-card-title class="titolo">Product Of The Mounth</v-card-title>
                                    <v-card-subtitle >{{ product.title }}</v-card-subtitle>
                                    <span>{{product.description}}</span>
                                </v-card-text>

                                <v-img :src="product.imageUrl"  class="pongo align-end" height="190px" max-width="230px"></v-img>
                                  <span class="pu">ONLY</span>
                                  <span>{{product.description}}</span>
                                    <span class="sna">{{ product.price }}$</span>
                                    <span>{{product.ratings}}</span>
                                    <span>{{product.MaxQuantity}}</span>
                                    <span>{{product.scadenza}}</span>

                                <v-card-actions>
                                  <v-btn class="success putin" router-view to="/ShoppingCart" v-if="isLoggedIn">Add To Cart</v-btn>
                                      <v-btn class="success putin" disabled v-if="!isLoggedIn">Add To Cart</v-btn>


                                 
                                   
                                </v-card-actions>
                            </v-row>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>


 </div>
   
    </div>
</template>
<script>
import {mapState} from 'vuex'
import NavBar from './NavBar'
export default {
    components:{
        NavBar
    },
    created() {
        this.$store.dispatch('LoadTecnologyProducts')

    },
    computed:{
        products(){
            return this.$store.state.TecnologyProducts
        },
         ...mapState(["isLoggedIn"])
    
    }
}
</script>
<style scoped>
.image-container{
 
    height:100px;

}
.cip{
    margin-top:3px;
    cursor:pointer;
}
.image{
height:350px;


background-size:100%;

background-image: linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)),url('pas4.jpg')

}
.span-1{
    position: relative;
    margin-left:560px;
    text-transform: uppercase;
    font-size:50px;
    color:white;
    font-weight: 800;
}
.cerca{
    margin-top:200px;
}
.chip{
    margin-left:850px;
    transform:translateY(-30px)
}
</style>