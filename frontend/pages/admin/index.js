import Layout from "../../components/Layout"
import Link from 'next/link'
import Admin from "../../components/auth/Admin"

const AdminIndex = () => {
      return(
            <Layout> 
                  <Admin>
                  <h1 className="container">Admin DAshboard</h1>
                  </Admin>
                  
                  
            </Layout>
      )
}

export default AdminIndex