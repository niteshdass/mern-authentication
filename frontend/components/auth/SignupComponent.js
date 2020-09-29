import {useState,useEffect} from 'react'
import { signup,isAuth } from '../../actions/auth'
import Router from 'next/router'
const SignupComponent= ()=>{
  
      const [values,setValues] = useState({
            name:'',
            email:'',
            password:'',
            error:'',
            loading:false,
            message:'',
            showForm:true
      })

      useEffect(() => {
          isAuth() && Router.push(`/`)
      },[])

      const {name,email,password,error,loading,message,showForm} = values


      const handleSubmit = e =>{
            e.preventDefault();
            console.table({name,email,password,error,loading,message,showForm})
            setValues({...values,loading:true,error:false})

            const user = {name,email,password}
            signup(user).then(data =>{
                  if(data.error){
                        setValues({...values,error:data.error,loading:false})
                  }else{
                        setValues({...values,name:'',email:'',password:'',error:'',loading:false,message:data.message,showForm:false})
                  }
            })
            
      }
      const handleChange= name => e=>{
            setValues({...values,error:false,[name]:e.target.value})
      }

      const showError = () =>(error?<div className="alert alert-info">{error}</div>:'')

      const showLoading = () =>(loading?<div className="alert alert-info">Loading...</div>:'')

      const showmess = () =>(message?<div className="alert alert-success">{message}</div>:'')


      const FormData = () =>{
            

            return(
                  
                  <form onSubmit={handleSubmit}>
                      
                        <div className="form-group">
                              <input type="text"
                             
                               onChange={handleChange('name')} 
                               value={name}
                               placeholder="Enter name" 
                               className="form-control"/>
                        </div>
                        <div className="form-group">
                              <input type="email"
                              value={email}
                               onChange={handleChange('email')} 
                               placeholder="Enter Email"
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                              <input type="password"
                              value={password} 
                              onChange={handleChange('password')}
                               placeholder="Enter Password"
                                className="form-control"/>
                        </div>
                        <div>
                              <button  className="btn btn-primary">Submit</button>
                        </div>
                  </form>
            )
      } 

      return<>
           {showError()}
           {showLoading()}
           {showmess()}
            {showForm && FormData()}

      </>
            
      
}
export default SignupComponent