import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { SyntheticEvent, useState } from 'react'

import BillingDetails from '~/features/user/view/BillingDetailsView'
import ProfileDetails from '~/features/user/view/ProfileDetailsView'

function ProfileView() {
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const contentTabs = [
    {
      label: 'Profile',
      content: <ProfileDetails />
    },
    {
      label: 'Billing',
      content: <BillingDetails />
    }
  ]

  return (
    <Card>
      <CardContent>
        <Tabs value={value} onChange={handleChange}>
          {contentTabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
        <Box p={1}>{contentTabs[value].content}</Box>
      </CardContent>
    </Card>
  )
}

export default ProfileView
