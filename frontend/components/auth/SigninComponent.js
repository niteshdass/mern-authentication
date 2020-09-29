
import {useState,useEffect} from 'react'
import { signin,authenticate,isAuth} from '../../actions/auth'
import Router from 'next/router'
const SigninComponent= ()=>{
  
      const [values,setValues] = useState({
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

      const {email,password,error,loading,message,showForm} = values


      const handleSubmit = e =>{
            e.preventDefault();
            console.table({email,password,error,loading,message,showForm})
            setValues({...values,loading:true,error:false})

            const user = {email,password}
            signin(user).then(data =>{
                  if(data.error){
                        setValues({...values,error:data.error,loading:false})
                  }else{
                        authenticate(data, ()=>{
                              if(isAuth() && isAuth().role === 1){
                                    Router.push(`/admin`)
                              }else{
                                    Router.push(`/user`)  
                              }
                              
                        }) 
                       
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
                              <input type="email"
                              name="email"
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
export default SigninComponent