import { Header } from '@/components/header'

const UserLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default UserLayout
