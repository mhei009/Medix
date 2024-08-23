
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import StatCard from '@/components/ui/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import { DataTable } from '@/components/table/DataTable'
import { columns, Payment } from '@/components/table/columns'


const Admin = async () => {
    


    const appointments = await getRecentAppointmentList();

  return ( 
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href='/' className='cursor-pointer'>
                <Image
                    src='/assets/icons/logo-full.svg'
                    alt='Logo'
                    width={132}
                    height={162}
                    className='h-8 w-fit'
                    />
            </Link>
            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome, Admin</h1>
                <p className='text-dark-700'>Manage new appointments.</p>
            </section>

            <section className='admin-stat'>
            
            <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
                
                <StatCard 
                    type="pending"
                    count={appointments.pendingCount}
                    label="Pending appointments"
                    icon="/assets/icons/pending.svg"
                />
                
                <StatCard 
                    type="cancelled"
                    count={appointments.cancelledCounts}
                    label="Cancelled appointments"
                    icon="/assets/icons/cancelled.svg"
            />
            </section>

            <DataTable columns={columns} data={appointments.documents} />
            
        </main>
    </div>
  )
}

export default Admin