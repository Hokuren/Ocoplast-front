import Vue from 'vue'
import VueResource from 'vue-resource'
//import Router from './../router/index'

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000/';
//Vue.http.options.root = 'http://ec2-52-38-207-215.us-west-2.compute.amazonaws.com/';
Vue.http.headers.common['Access-Control-Allow-Origin'] = true;
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'; 
Vue.http.headers.common['Accept-Language'] = 'es' ;
Vue.http.headers.common["DYNAMIC-LANGUAGE"] = 'es';
Vue.http.headers.common["Content-Type"]= "application/json";
Vue.http.headers.common.Accept= "application/json";
Vue.http.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Authentication, Accept-Language';
Vue.http.headers['Access-Control-Max-Age'] = '1728000';

Vue.http.interceptors.push((request, next)=>{   
    console.log('sale');
    console.log(request);
  next(response =>{ 
    console.log(response);
    console.log('entra');
    }
    
  )
});