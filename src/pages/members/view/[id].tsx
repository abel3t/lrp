// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewPage from './UserViewPage'

const UserView = ({ invoiceData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <UserViewPage tab={'overview'} invoiceData={invoiceData} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { id: 'clbjzqq1u0000oi2td5brt445' }}
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  // const res = await axios.get('/apps/invoice/invoices')
  // const invoiceData: InvoiceType[] = res.data.allData

  return {
    props: {
      invoiceData: [],
      id: params?.id
    }
  }
}

export default UserView
