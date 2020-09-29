import Layout from "../../components/Layout"
import Link from 'next/link'
import Private from "../../components/auth/Private"

const UserIndex = () => {
      return(
            <Layout> 
                  <Private>
                  <h1 className="container">User DAsh</h1>
                  </Private>
                  
                  
            </Layout>
      )
}

export default UserIndex