import Layout from "../components/Layout"
import Link from 'next/link'
import SigninComponent from '../components/auth/SigninComponent'
const Signin = () => {
      return(
            <Layout>
                  <h1 className="text-center pt-4 pb-4">Signin</h1>
                  <div className="row">
                        <div className="col-md-6 offset-md-3">
                        <SigninComponent/>
                        </div>
                  </div>
                  
            </Layout>
      )
}

export default Signin