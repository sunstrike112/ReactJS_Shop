import React from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment-timezone'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'

const DynamicLiquidChart = dynamic(() => import('../../../../atoms/charts/liquid-chart.atom'), { ssr: false })

export default function MyCalendar(props) {
  const events = [
    {
      title  : 'event2',
      start  : moment().toISOString(),
      end    : moment().add('1 hour').toISOString()
    },
  ]

  return (
    <div>
      <FullCalendar
        plugins={[ momentTimezonePlugin, dayGridPlugin, timeGridPlugin ]}
        // timeZone="Europe/Moscow"
        initialView="timeGridDay"
        headerToolbar={{
          right: 'timeGridDay,timeGridWeek,dayGridMonth',
        }}
        events={events}
        eventColor='#378006'
        eventClassNames="event-liquid"
        eventContent={(arg) => (
          <DynamicLiquidChart {...props} />
        )}
      />

      <style jsx global>{`
        .event-liquid {
          display: block;
        }
      `}
      </style>
    </div>
  )
}

