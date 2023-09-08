'use client'

import { usePathname } from 'next/navigation'
import { UserForm } from './components/user-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthenticated } from '@/hooks/useAuthentication'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { UserCombobox } from '../components/switcher'

export default function UserPage() {
   const { authenticated } = useAuthenticated()
   const [user, setUser] = useState(null)
   const pathname = usePathname()

   useEffect(() => {
      async function getUser() {
         try {
            const response = await fetch(`/api/profile`, {
               cache: 'no-store',
            })

            const json = await response.json()

            setUser(json)
         } catch (error) {
            console.error({ error })
         }
      }

      if (authenticated) getUser()
   }, [authenticated])

   function UserCard() {
      return (
         <Card className="bg-muted-foreground/5">
            <CardContent className="py-6">
               <UserForm initialData={user} />
            </CardContent>
         </Card>
      )
   }

   return (
      <div className="flex-col">
         <div className="flex-1 ">
            <div className="flex items-center justify-between">
               <UserCombobox initialValue={pathname} />
            </div>
            {user && <UserCard />}
         </div>
      </div>
   )
}
